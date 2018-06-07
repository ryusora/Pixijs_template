import {TweenDefine} from './TweenDefine';

export class Tween
{
	constructor()
	{
		this.object		= null;
		this.type		= -1;
		this.start		= null;
		this.end		= null;
		this.percent	= 0;
		this.timer		= new Timer();
		this.timerDelay	= new Timer();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init(obj)
	{
		this.object = obj;
		this.timerDelay.SetDuration(0);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Create(type, pStart, pEnd, duration, delay)
	{
		this.type	= type;
		this.start	= pStart;
		this.end	= pEnd;

		this.timer.SetDuration(duration);
		this.timerDelay.SetDuration(delay)
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsDone()
	{
		return this.timer.IsDone();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	JustFinished()
	{
		return this.timer.JustFinished();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Reset()
	{
		this.timer.Reset();
		this.timerDelay.Reset();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetFinishOverhead()
	{
		return this.timer.GetOverhead();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Goto(percent)
	{
		var offsetX = (this.end.x - this.start.x) * percent;
		var offsetY = (this.end.y - this.start.y) * percent;
		var alpha   = 1;
		var scale   = 1;
		var rotate	= 0;

		if (typeof this.start.alpha != "undefined")
		{
			alpha = (this.end.alpha - this.start.alpha) * percent;
			this.object.alpha = (this.start.alpha + alpha);
		}

		if (typeof this.start.scale != "undefined")
		{
			scale = (this.end.scale - this.start.scale) * percent;
			this.object.scale.set(this.start.scale + scale, this.start.scale + scale);
		}

		if (typeof this.start.rotate != "undefined")
		{
			rotate = (this.end.rotate - this.start.rotate) * percent;
			this.object.rotation = (this.start.rotate + rotate);
		}

		if (typeof this.start.x != "undefined")
		{
			this.object.position.x = this.start.x + offsetX;
		}

		if (typeof this.start.y != "undefined")
		{
			this.object.position.y = this.start.y + offsetY;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LinearEase(k)
	{
		return k;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ElasticEaseIn(k)
	{
		var s;
		var a = 0.1;
		var p = 0.4;

		if (k === 0)
		{
			return 0;
		}

		if (k === 1)
		{
			return 1;
		}

		if (!a || a < 1)
		{
			a = 1;
			s = p / 4;
		}
		else
		{
			s = p * Math.asin(1 / a) / (2 * Math.PI);
		}

		return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ElasticEaseOut(k)
	{
		var s;
		var a = 0.1;
		var p = 0.4;

		if (k === 0)
		{
			return 0;
		}

		if (k === 1)
		{
			return 1;
		}

		if (!a || a < 1)
		{
			a = 1;
			s = p / 4;
		}
		else
		{
			s = p * Math.asin(1 / a) / (2 * Math.PI);
		}

		return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ElasticEaseInOut(k)
	{
		var s;
		var a = 0.1;
		var p = 0.4;

		if (k === 0)
		{
			return 0;
		}

		if (k === 1)
		{
			return 1;
		}

		if (!a || a < 1)
		{
			a = 1;
			s = p / 4;
		}
		else
		{
			s = p * Math.asin(1 / a) / (2 * Math.PI);
		}

		if ((k *= 2) < 1)
		{
			return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		}

		return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	BackEaseIn(k)
	{
		var s = 1.70158;
		return k * k * ((s + 1) * k - s);

	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	BackEaseOut(k)
	{
		var s = 1.70158;
		return --k * k * ((s + 1) * k + s) + 1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	BackEaseInOut(k)
	{
		var s = 1.70158 * 1.525;
		if ((k *= 2) < 1)
		{
			return 0.5 * (k * k * ((s + 1) * k - s));
		}
		return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	BounceEaseIn (k)
	{
		return 1 - this.BounceEaseOut(1 - k);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	BounceEaseOut(k)
	{
		if (k < (1 / 2.75))
		{
			return 7.5625 * k * k;
		}
		else if (k < (2 / 2.75))
		{
			return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
		}
		else if (k < (2.5 / 2.75))
		{
			return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
		}
		else
		{
			return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	BounceEaseInOut(k)
	{
		if (k < 0.5)
		{
			return this.BounceEaseIn(k * 2) * 0.5;
		}
		return this.BounceEaseOut(k * 2 - 1) * 0.5 + 0.5;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	QuadEaseOut(k)
	{
		return k * (2 - k);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SinusodialEaseIn(k)
	{
		return - Math.cos(k * (Math.PI/2)) + 1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SinusodialEaseOut(k)
	{
		return Math.sin(k * (Math.PI/2));
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SinusodialEaseInOut(k)
	{
		return -1/2 * (Math.cos(Math.PI*k) - 1);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ExponentialIn(k)
	{
		return k === 0 ? 0 : Math.pow(1024, k - 1);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ExponentialOut(k)
	{
		return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ExponentialInOut(k)
	{
		if (k === 0)
		{
			return 0;
		}

		if (k === 1)
		{
			return 1;
		}

		if ((k *= 2) < 1)
		{
			return 0.5 * Math.pow(1024, k - 1);
		}

		return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		this.timerDelay.Update(deltaTime);
		if (!this.timerDelay.IsDone())
		{
			return;
		}

		this.timer.Update(deltaTime);
		switch (this.type)
		{
			case TweenDefine.LINEAR_EASE:
			{
				this.percent = this.LinearEase(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.ELASTIC_EASE_IN:
			{
				this.percent = this.ElasticEaseIn(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.ELASTIC_EASE_OUT:
			{
				this.percent = this.ElasticEaseOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.ELASTIC_EASE_INOUT:
			{
				this.percent = this.ElasticEaseInOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.BACK_EASE_IN:
			{
				this.percent = this.BackEaseIn(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.BACK_EASE_OUT:
			{
				this.percent = this.BackEaseOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.BACK_EASE_INOUT:
			{
				this.percent = this.BackEaseInOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.BOUNCE_EASE_IN:
			{
				this.percent = this.BounceEaseIn(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.BOUNCE_EASE_OUT:
			{
				this.percent = this.BounceEaseOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.BOUNCE_EASE_INOUT:
			{
				this.percent = this.BackEaseInOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.QUAD_EASE_OUT:
			{
				this.percent = this.QuadEaseOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.SINUSODIAL_EASE_IN:
			{
				this.percent = this.SinusodialEaseIn(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.SINUSODIAL_EASE_OUT:
			{
				this.percent = this.SinusodialEaseOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.SINUSODIAL_EASE_INOUT:
			{
				this.percent = this.SinusodialEaseInOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.EXPONENTIAL_IN:
			{
				this.percent = this.ExponentialIn(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.EXPONENTIAL_OUT:
			{
				this.percent = this.ExponentialOut(1 - this.timer.GetTimePercent());
				break;
			}
			case TweenDefine.EXPONENTIAL_INOUT:
			{
				this.percent = this.ExponentialInOut(1 - this.timer.GetTimePercent());
				break;
			}
			default:
			{
				this.percent = 1 - this.timer.GetTimePercent();
				break;
			}
		}

		this.Goto(this.percent);
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class TweenInfo
{
	constructor()
	{
		this.tweens		= [];
		this.index		= 0;
		this.loop		= 0;
		this.loopIndex	= 0;
		this.callback	= null;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PreInit()
	{
		this.tweens[0].Goto(0);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsDone()
	{
		for (var i = 0; i < this.tweens.length; i++)
		{
			if (this.loop > 0 || !this.tweens[i].IsDone())
			{
				return false;
			}
		}

		return true;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Reset(index = 0)
	{
		for (var i = index; i < this.tweens.length; i++)
		{
			this.tweens[i].Reset();
		}
		this.index = index;
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class TweenMgr
{
	constructor()
	{
		this.tweens		= [];
		this.objList	= [];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PreInit()
	{
		for (var i = 0; i < this.tweens.length; i++)
		{
			this.tweens[i].PreInit();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Create(obj, type, pStart, pEnd, duration, delay)
	{
		var tween = new Tween();
		tween.Init(obj);
		tween.Create(type, pStart, pEnd, duration, delay);

		var index = this.GetObjectIndex(obj);
		if (index == -1)
		{
			var tweenInfo = new TweenInfo();
			tweenInfo.tweens.push(tween);
			tweenInfo.index = 0;

			this.tweens.push(tweenInfo);
			this.objList.push(obj);
		}
		else
		{
			this.tweens[index].tweens.push(tween);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetObjectIndex(obj)
	{
		for (var i = 0; i < this.objList.length; i++)
		{
			if (this.objList[i] === obj)
			{
				return i;
			}
		}

		return -1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetLoop(obj, loop, loopIndex = 0)
	{
		var index = this.GetObjectIndex(obj);
		if (index == -1)
		{
			return;
		}

		this.tweens[index].loop			= loop;
		this.tweens[index].loopIndex	= loopIndex;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetCallback(obj, callback)
	{
		var index = this.GetObjectIndex(obj);
		if (index == -1)
		{
			return;
		}

		this.tweens[index].callback = callback;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Reset(obj)
	{
		var index = this.GetObjectIndex(obj);
		if (index == -1)
		{
			return;
		}

		this.tweens[index].Reset();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ResetAll()
	{
		for (var i = 0; i < this.tweens.length; i++)
		{
			this.tweens[i].Reset();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Remove(obj)
	{
		var index = this.GetObjectIndex(obj);
		if (index == -1)
		{
			return;
		}

		this.tweens.splice(index, 1);
		this.objList.splice(index, 1);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	RemoveAll()
	{
		this.tweens		= [];
		this.objList	= [];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsDone()
	{
		for (var i = 0; i < this.tweens.length; i++)
		{
			if (!this.tweens[i].IsDone())
			{
				return false;
			}
		}

		return true;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		for (var i = 0; i < this.tweens.length; i++)
		{
			var tweenInfo   = this.tweens[i];
			var tween       = tweenInfo.tweens[tweenInfo.index];

			tween.Update(deltaTime);

			if (tween.JustFinished())
			{
				if (tweenInfo.callback != null)
				{
					tweenInfo.callback();
				}
			}

			if (tween.IsDone())
			{
				var overhead = tween.GetFinishOverhead();

				if (tweenInfo.index < tweenInfo.tweens.length - 1)
				{
					tweenInfo.index++;
				}
				else
				{
					if (tweenInfo.loop == -1)
					{
						tweenInfo.Reset(tweenInfo.loopIndex);
					}
					else if (tweenInfo.loop > 1)
					{
						tweenInfo.loop--;
						tweenInfo.Reset(tweenInfo.loopIndex);
					}
				}

				tweenInfo.tweens[tweenInfo.index].Update(overhead);
			}
		}
	}
}