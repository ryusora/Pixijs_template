import { GLSprite } from './GLSprite';
import { GLSpriteManager } from './GLSpriteManager';

window.GLSpriteManager = window.GLSpriteManager || new GLSpriteManager();

export class GLAnimation extends PIXI.Container
{
	constructor(index)
	{
		super();

		this.spriteIndex	= index;
		this.texture		= GLSpriteManager.spriteInfo[this.spriteIndex].texture;
		this.data			= GLSpriteManager.spriteInfo[this.spriteIndex].data;
		this.animId			= -1;
		this.currentAFrame	= 0;
		this.currentTime	= 0;
		this.isLoop			= true;
		this.isFinish		= false;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PrepareAnim(animId)
	{
		const animInfo	= this.data.anims[this.animId];
		if (!animInfo) {
			animInfo;
		}
		const afCount	= animInfo.aFramesCount;
		const afPool	= afCount - this.children.length;

		for (let i = 0; i < afPool; i++)
		{
			const glSprite = new GLSprite(this.spriteIndex);
			this.addChild(glSprite);
		}

		for (let i = 0; i < this.children.length; i++)
		{
			const glSprite	= this.getChildAt(i);
			const aframe	= this.data.aframe[animInfo.aFramesStartIndex + i];
			if (i < afCount)
			{
				glSprite.SetFrame(aframe.frameIndex);
				glSprite.position.set(aframe.ox, aframe.oy);
				glSprite.scale.set(aframe.scaleX, aframe.scaleY);
				glSprite.rotation	= aframe.rotation * Math.PI / 180;
				glSprite.visible	= true;
			}
			else
			{
				glSprite.visible = false;
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetTouchable(value)
	{
		this.interactive = value;
		if (value)
		{
			let animInfo = this.data.anims[this.animId];
			let aframe = this.data.aframe[animInfo.aFramesStartIndex];
			let rect = this.data.frames[aframe.frameIndex].rect[0].Clone();

			rect.Scale(aframe.scaleX, aframe.scaleY);
			this.hitArea = new PIXI.Rectangle(rect.x, rect.y, rect.width, rect.height);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetAnim(animId, loop)
	{
		this.currentAFrame	= 0;
		this.currentTime	= 0;
		this.isLoop			= loop;
		this.isFinish		= false;

		if (this.animId != animId)
		{
			this.animId	= animId;
			this.PrepareAnim(this.animId);
		}
		this.SetCurrentAFrame(this.currentAFrame);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetCurrentAFrame(index)
	{
		for (let i = 0; i < this.children.length; i++)
		{
			const glSprite = this.getChildAt(i);
			if (i == index)
			{
				glSprite.visible = true;
			}
			else
			{
				glSprite.visible = false;
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		const animInfo = this.data.anims[this.animId];
		if (animInfo)
		{
			const aframe	= this.data.aframe[animInfo.aFramesStartIndex + this.currentAFrame];
			const duration	= aframe.time / 60;
			const afCount	= animInfo.aFramesCount;

			if (this.currentTime >= duration)
			{
				this.currentTime -= duration;
				if (this.currentAFrame < afCount)
				{
					this.currentAFrame++;
				}

				if (this.currentAFrame >= afCount)
				{
					this.isFinish = true;
					if (this.isLoop)
					{
						this.currentAFrame = 0;
					}
					else
					{
						this.currentAFrame = afCount - 1;
					}
				}

				this.SetCurrentAFrame(this.currentAFrame);
			}
			this.currentTime += deltaTime;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetRect(index = 0)
	{
		const animInfo	= this.data.anims[this.animId];
		const aframe	= this.data.aframe[animInfo.aFramesStartIndex + this.currentAFrame];

		return this.data.frames[aframe.frameIndex].rect[index];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetTransformRect(index = 0)
	{
		let rect = this.GetRect(index).Clone();

		rect.Scale(this.scale.x, this.scale.y);
		rect.Translate(this.position.x, this.position.y);

		return rect;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Clone()
	{
		let glAnimation = new GLAnimation(this.spriteIndex);
		glAnimation.SetAnim(this.animId, true);

		return glAnimation;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Tint(color)
	{
		for (let glSprite of this.children)
		{
			glSprite.Tint(color);
		}
	}
}