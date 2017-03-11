import * as core from '../../core';
import VertShader from '../fragments/default.vert'
import FragShader from './void.frag'

/**
 * Does nothing. Very handy.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
export default class VoidFilter extends core.Filter
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

        this.glShaderKey = 'void';
    }
}
