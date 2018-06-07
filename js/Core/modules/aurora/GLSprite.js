import { GLSpriteManager } from './GLSpriteManager';

window.GLSpriteManager = window.GLSpriteManager || new GLSpriteManager();

export class GLSprite extends PIXI.Container
{
	constructor(index)
	{
		super();
		
		this.spriteIndex	= index;
		this.texture		= GLSpriteManager.spriteInfo[this.spriteIndex].texture;
		this.data			= GLSpriteManager.spriteInfo[this.spriteIndex].data;
		this.moduleTextures	= [];
		this.frameId		= -1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetFrame(frameId)
	{
		if (this.frameId != frameId)
		{
			this.frameId = frameId;
			this.PrepareFrame(this.frameId);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PrepareFrame(frameId)
	{
		const frame 	= this.data.frames[frameId];
		const fmStart	= frame.fmstartIndex;
		const fmEnd 	= frame.fmstartIndex + frame.fmCount;
		const fmCount	= fmEnd - fmStart;
		const fmPool	= fmCount - this.children.length;

		for (let i = 0; i < fmPool; i++)
		{
			const texture	= new PIXI.Texture(this.texture.baseTexture);
			const sprite	= new PIXI.Sprite(texture);

			this.moduleTextures.push(texture);
			this.addChild(sprite);
		}

		for (let i = 0; i < this.children.length; i++)
		{
			const sprite = this.getChildAt(i);
			if (i < fmCount)
			{
				const fm = this.data.fmodule[fmStart + i];
				const md = this.data.modules[fm.fmodulesID];

				sprite.position.set(fm.fmodulesOX, fm.fmodulesOY);
				sprite.scale.set(fm.fmodulesScaleX, fm.fmodulesScaleY);
				sprite.rotation	= fm.fmodulesRotation * Math.PI / 180;
				sprite.visible	= true;

				this.moduleTextures[i].frame = new PIXI.Rectangle(md.x, md.y, md.w, md.h);
			}
			else
			{
				sprite.visible = false;
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetTouchable(value)
	{
		this.interactive = value;
		if (value)
		{
			let rect = this.data.frames[this.frameId].rect[0];
			this.hitArea = new PIXI.Rectangle(rect.x, rect.y, rect.width, rect.height);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetRect(index = 0)
	{
		return this.data.frames[this.frameId].rect[index];
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
		let glSprite = new GLSprite(this.spriteIndex);
		glSprite.SetFrame(this.frameId);

		return glSprite;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Tint(color)
	{
		for (let sprite of this.children)
		{
			sprite.tint = color;
		}
	}
}