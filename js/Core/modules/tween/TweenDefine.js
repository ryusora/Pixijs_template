export class TweenDefine
{
	static NONE						= 0;
	static LINEAR_EASE				= this.NONE + 1;
	static ELASTIC_EASE_IN			= this.LINEAR_EASE + 1;
	static ELASTIC_EASE_OUT			= this.ELASTIC_EASE_IN + 1;
	static ELASTIC_EASE_INOUT		= this.ELASTIC_EASE_OUT + 1;
	static BACK_EASE_IN				= this.ELASTIC_EASE_INOUT + 1;
	static BACK_EASE_OUT			= this.BACK_EASE_IN + 1;
	static BACK_EASE_INOUT			= this.BACK_EASE_OUT + 1;
	static BOUNCE_EASE_IN			= this.BACK_EASE_INOUT + 1;
	static BOUNCE_EASE_OUT			= this.BOUNCE_EASE_IN + 1;
	static BOUNCE_EASE_INOUT		= this.BOUNCE_EASE_OUT + 1;
	static QUAD_EASE_OUT			= this.BOUNCE_EASE_INOUT + 1;
	static SINUSODIAL_EASE_IN		= this.QUAD_EASE_OUT + 1;
	static SINUSODIAL_EASE_OUT		= this.SINUSODIAL_EASE_IN + 1;
	static SINUSODIAL_EASE_INOUT	= this.SINUSODIAL_EASE_OUT + 1;
	static EXPONENTIAL_IN			= this.SINUSODIAL_EASE_INOUT + 1;
	static EXPONENTIAL_OUT			= this.EXPONENTIAL_IN + 1;
	static EXPONENTIAL_INOUT		= this.EXPONENTIAL_OUT + 1;
}