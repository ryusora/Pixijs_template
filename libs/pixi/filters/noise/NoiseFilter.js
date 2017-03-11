import * as core from '../../core';
import VertShader from '../fragments/default.vert'
import FragShader from './noise.frag'

/**
 * @author Vico @vicocotea
 * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/noise.js
 */

/**
 * A Noise effect filter.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
export default class NoiseFilter extends core.Filter
{
    /**
     *
     */
    constructor()
    {
        super(
            // vertex shader
            VertShader,
            // fragment shader
            FragShader
        );

        this.noise = 0.5;
    }

    /**
     * The amount of noise to apply.
     *
     * @member {number}
     * @default 0.5
     */
    get noise()
    {
        return this.uniforms.noise;
    }

    set noise(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.noise = value;
    }
}
