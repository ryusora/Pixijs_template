import { BReader } from './BReader';
import { GLText } from './GLText';
import { GLSprite } from './GLSprite';
import { GLAnimation } from './GLAnimation';
import { GuiDefine } from './GuiDefine';

window.GLText = window.GLText || new GLText();

export class Gui extends PIXI.Container
{
	constructor()
	{
		super();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(data)
	{
		let offset = 0;
		while (offset < data.length)
		{
			const template	= BReader.ReadUByte(data, offset); offset++;
			const posx		= BReader.ReadShort(data, offset); offset += 2;
			const posy		= BReader.ReadShort(data, offset); offset += 2;
			const anchor	= BReader.ReadUByte(data, offset); offset++;

			if (template == GuiDefine.TEMPLATE_GUI_GFXITEM)
			{
				const sprite	= (BReader.ReadByte(data, offset)); offset++;
				const frame		= (BReader.ReadShort(data, offset)); offset += 2;
				const anim		= (BReader.ReadByte(data, offset)); offset++;
				const visible	= (BReader.ReadByte(data, offset)); offset++;

				if (anim == -1)
				{
					let glSprite = new GLSprite(sprite);

					glSprite.posX = posx;
					glSprite.posY = posy;
					glSprite.SetFrame(frame);
					glSprite.position.set(posx, posy);
					glSprite.visible = visible;

					this.UpdateAnchor(glSprite, anchor);
					this.addChild(glSprite);
				}
				else
				{
					let glAnimation	= new GLAnimation(sprite);

					glAnimation.posX = posx;
					glAnimation.posY = posy;
					glAnimation.SetAnim(anim, true);
					glAnimation.position.set(posx, posy);
					glAnimation.visible = visible;

					this.UpdateAnchor(glAnimation, anchor);
					this.addChild(glAnimation);
				}
			}
			else if (template == GuiDefine.TEMPLATE_GUI_TEXTITEM)
			{
				const textId	= BReader.ReadShort(data, offset); offset += 2;
				const size		= BReader.ReadShort(data, offset); offset += 2;
				const width		= BReader.ReadShort(data, offset); offset += 2;
				const height	= BReader.ReadShort(data, offset); offset += 2;
				const fontIndex	= BReader.ReadByte(data, offset); offset++;
				const red		= BReader.ReadUByte(data, offset); offset++;
				const green		= BReader.ReadUByte(data, offset); offset++;
				const blue		= BReader.ReadUByte(data, offset); offset++;
				const align		= BReader.ReadByte(data, offset); offset++;
				const shadow	= BReader.ReadByte(data, offset); offset++;
				const sred		= BReader.ReadUByte(data, offset); offset++;
				const sgreen	= BReader.ReadUByte(data, offset); offset++;
				const sblue		= BReader.ReadUByte(data, offset); offset++;

				const textInfo	= GLText.GetText(textId);
				const textAlign	= align == 0 ? "left" : (align == 1 ? "right" : "center");
				const font		= GameConfig.fontInfo[fontIndex];
				const color		= "rgba(" + red + ", " + green + ", " + blue + ", " + 1 + ")";
				const scolor	= "rgba(" + sred + ", " + sgreen + ", " + sblue + ", " + 1 + ")";

				
				let style = new PIXI.TextStyle({
					align: textAlign,
					fontFamily: font,
					fontSize: size,
					fill: color,
					dropShadow: shadow,
					dropShadowColor: scolor,
					wordWrap: true,
					wordWrapWidth: width
				});

				let text = new PIXI.Text(textInfo, style);
				switch (textAlign)
				{
					case "left":
					{
						text.anchor.set(0, 0.5);
						text.position.set(posx, posy + height / 2);
						break;
					}
					case "right":
					{
						text.anchor.set(1, 0.5);
						text.position.set(posx + width, posy + height / 2);
						break;
					}
					case "center":
					{
						text.anchor.set(0.5, 0.5);
						text.position.set(posx + width / 2, posy + height / 2);
						break;
					}
				}

				text.posX = text.position.x;
				text.posY = text.position.y;
				this.UpdateAnchor(text, anchor);

				text.rect = new PIXI.Rectangle(text.position.x, text.position.y - height / 2, width, height);
				this.addChild(text);
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	UpdateAnchor(object, anchor)
	{
		switch (anchor)
		{
			case GuiDefine.ANCHOR_LEFT:
			{
				break;
			}
			case GuiDefine.ANCHOR_LEFT_TOP:
			case GuiDefine.ANCHOR_LEFT_CENTER:
			case GuiDefine.ANCHOR_LEFT_BOTTOM:
			{
				break;
			}
			case GuiDefine.ANCHOR_RIGHT:
			{
				object.position.x = object.posX + APP.offsetX * 2;
				break;
			}
			case GuiDefine.ANCHOR_RIGHT_TOP:
			case GuiDefine.ANCHOR_RIGHT_CENTER:
			case GuiDefine.ANCHOR_RIGHT_BOTTOM:
			{
				break;
			}
			case GuiDefine.ANCHOR_TOP:
			{
				break;
			}
			case GuiDefine.ANCHOR_TOP_CENTER:
			{
				break;
			}
			case GuiDefine.ANCHOR_BOTTOM:
			{
				object.position.y = object.posY + APP.offsetY * 2;
				break;
			}
			case GuiDefine.ANCHOR_BOTTOM_CENTER:
			{
				object.position.y = object.posY + APP.offsetY * 2;
				object.position.x = object.posX + APP.offsetX;
				break;
			}
			case GuiDefine.ANCHOR_HCENTER_VCENTER:
			{
				object.position.x = object.posX + APP.offsetX;
				object.position.y = object.posY + APP.offsetY;
				break;
			}
		}

		object.auroraAnchor = anchor;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	UpdateAnchors()
	{
		for (let object of this.children)
		{
			this.UpdateAnchor(object, object.auroraAnchor);
			if (object instanceof PIXI.Text)
			{
				object.rect.x = object.position.x;
				object.rect.y = object.position.y - object.rect.height / 2;
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	UpdateAnchorRotate()
	{
		for (let object of this.children)
		{
			switch (object.auroraAnchor)
			{
				case GuiDefine.ANCHOR_LEFT:
				{
					break;
				}
				case GuiDefine.ANCHOR_LEFT_TOP:
				case GuiDefine.ANCHOR_LEFT_CENTER:
				case GuiDefine.ANCHOR_LEFT_BOTTOM:
				{
					break;
				}
				case GuiDefine.ANCHOR_RIGHT:
				{
					object.position.x = object.posX + APP.offsetY * 2;
					break;
				}
				case GuiDefine.ANCHOR_RIGHT_TOP:
				case GuiDefine.ANCHOR_RIGHT_CENTER:
				case GuiDefine.ANCHOR_RIGHT_BOTTOM:
				{
					break;
				}
				case GuiDefine.ANCHOR_TOP:
				{
					break;
				}
				case GuiDefine.ANCHOR_TOP_CENTER:
				{
					break;
				}
				case GuiDefine.ANCHOR_BOTTOM:
				{
					object.position.y = object.posY + APP.offsetX * 2;
					break;
				}
				case GuiDefine.ANCHOR_BOTTOM_CENTER:
				{
					object.position.y = object.posY + APP.offsetX * 2;
					object.position.x = object.posX + APP.offsetY;
					break;
				}
				case GuiDefine.ANCHOR_HCENTER_VCENTER:
				{
					object.position.x = object.posX + APP.offsetY;
					object.position.y = object.posY + APP.offsetX;
					break;
				}
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetObject(index)
	{
		return this.getChildAt(index);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		for (let object of this.children)
		{
			if (object.Update)
			{
				object.Update(deltaTime);
			}
		}
	}
}