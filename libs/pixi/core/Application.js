import { autoDetectRenderer } from './autoDetectRenderer';
import Container from './display/Container';
import { shared, Ticker } from './ticker';

/**
 * Convenience class to create a new PIXI application.
 * This class automatically creates the renderer, ticker
 * and root container.
 *
 * @example
 * // Create the application
 * const app = new PIXI.Application();
 *
 * // Add the view to the DOM
 * document.body.appendChild(app.view);
 *
 * // ex, add display objects
 * app.stage.addChild(PIXI.Sprite.fromImage('something.png'));
 *
 * @class
 * @memberof PIXI
 */
export default class Application
{
    /**
     * @param {number} [width=800] - the width of the renderers view
     * @param {number} [height=600] - the height of the renderers view
     * @param {object} [options] - The optional renderer parameters
     * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
     * @param {boolean} [options.transparent=false] - If the render view is transparent, default false
     * @param {boolean} [options.antialias=false] - sets antialias (only applicable in chrome at the moment)
     * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
     *      need to call toDataUrl on the webgl context
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2
     * @param {boolean} [noWebGL=false] - prevents selection of WebGL renderer, even if such is present
     * @param {boolean} [options.legacy=false] - If true Pixi will aim to ensure compatibility
     * with older / less advanced devices. If you experience unexplained flickering try setting this to true.
     * @param {boolean} [useSharedTicker=false] - `true` to use PIXI.ticker.shared, `false` to create new ticker.
     */
    constructor(width, height, options, noWebGL, useSharedTicker = false)
    {
        /**
         * WebGL renderer if available, otherwise CanvasRenderer
         * @member {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
         */
        this.renderer = autoDetectRenderer(width, height, options, noWebGL);

        /**
         * The root display container that's rendered.
         * @member {PIXI.Container}
         */
        this.stage = new Container();

        /**
         * Internal reference to the ticker
         * @member {PIXI.ticker.Ticker}
         * @private
         */
        this._ticker = null;

        /**
         * Ticker for doing render updates.
         * @member {PIXI.ticker.Ticker}
         * @default PIXI.ticker.shared
         */
        this.ticker = useSharedTicker ? shared : new Ticker();

        // Start the rendering
        this.start();
    }

    set ticker(ticker) // eslint-disable-line require-jsdoc
    {
        if (this._ticker)
        {
            this._ticker.remove(this.render, this);
        }
        this._ticker = ticker;
        if (ticker)
        {
            ticker.add(this.render, this);
        }
    }
    get ticker() // eslint-disable-line require-jsdoc
    {
        return this._ticker;
    }

    /**
     * Render the current stage.
     */
    render()
    {
        this.renderer.render(this.stage);
    }

    /**
     * Convenience method for stopping the render.
     */
    stop()
    {
        this._ticker.stop();
    }

    /**
     * Convenience method for starting the render.
     */
    start()
    {
        this._ticker.start();
    }

    /**
     * Reference to the renderer's canvas element.
     * @member {HTMLCanvasElement}
     * @readonly
     */
    get view()
    {
        return this.renderer.view;
    }

    /**
     * Reference to the renderer's screen rectangle. Its safe to use as filterArea or hitArea for whole screen
     * @member {PIXI.Rectangle}
     * @readonly
     */
    get screen()
    {
        return this.renderer.screen;
    }

    /**
     * Destroy and don't use after this.
     * @param {Boolean} [removeView=false] Automatically remove canvas from DOM.
     */
    destroy(removeView)
    {
        this.stop();
        this.ticker = null;

        this.stage.destroy();
        this.stage = null;

        this.renderer.destroy(removeView);
        this.renderer = null;
    }
}
