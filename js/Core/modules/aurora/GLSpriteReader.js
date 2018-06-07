import { Rect } from './Rect';
import { BReader } from './BReader';

const BSPRITE_v005					= 0x05DF; // supported version
const SUPPORTED_VERSION				= BSPRITE_v005;
const BS_MODULES					= (1 << 0);
const BS_MODULES_XY					= (1 << 1);
const BS_MODULES_IMG				= (1 << 2);
const BS_MODULE_IMAGES_TC_BMP		= (1 << 3);
const BS_MODULES_WH_SHORT			= (1 << 4);     // export w, h for each module as short
const BS_MODULES_XY_SHORT 			= (1 << 5);     // export x, y for each module as short
const BS_MODULES_USAGE 				= (1 << 6);     // export for each module which transformations are used in the sprite
const BS_IMAGE_SIZE_INT 			= (1 << 7);     // module size will be stored on int, for larger module
const BS_FRAMES 					= (1 << 8);
const BS_FM_OFF_SHORT 				= (1 << 10);    // export fm offsets as shorts
const BS_NFM_SHORT 					= (1 << 11);    // export fmodule count per frame as short
const BS_SKIP_FRAME_RC 				= (1 << 12);    // do not export frame rect
const BS_FRAME_COLL_RC 				= (1 << 13);    // export collision rect
const BS_FM_PALETTE 				= (1 << 14);    // export palette used by the module
const BS_FRAME_RECTS 				= (1 << 15);    // export frame rects
const BS_ANIMS 						= (1 << 16);
const BS_NO_AF_START 				= (1 << 17);    // do not export start of AFrames
const BS_AF_OFF_SHORT 				= (1 << 18);    // export af offsets as shorts
const BS_NAF_SHORT 					= (1 << 19);    // export naf as short
const BS_FM_INDEX_SHORT 			= (1 << 20);    // export frame module ID's as shorts
const BS_AF_INDEX_SHORT 			= (1 << 21);    // export animation frame ID's as shorts
const BS_EXTRA_FLAGS 				= (1 << 22);	// if enabled means that there are extra flags exported.
const BS_MODULE_IMAGES_FX 			= (1 << 23);	// export encoded images for each module (flipped horizontally)
const BS_MODULE_IMAGES 				= (1 << 24);
const BS_PNG_CRC 					= (1 << 25);
const BS_KEEP_PAL 					= (1 << 26);
const BS_TRANSP_FIRST 				= (1 << 27);
const BS_TRANSP_LAST 				= (1 << 28);
const BS_SINGLE_IMAGE 				= (1 << 29);
const BS_MULTIPLE_IMAGES 			= (1 << 30);
const BS_GIF_HEADER 				= (1 << 31);	// export gif header instead of palet
const BS_DEFAULT_MIDP2 				= (BS_MODULES | BS_FRAMES | BS_ANIMS | BS_MODULE_IMAGES);
const BS_DEFAULT_NOKIA 				= (BS_DEFAULT_MIDP2);
const BS_DEFAULT_MIDP1 				= (BS_MODULES | BS_MODULES_XY | BS_FRAMES | BS_ANIMS);
const BS_DEFAULT_MIDP1b 			= (BS_MODULES | BS_FRAMES | BS_ANIMS | BS_MODULE_IMAGES | BS_PNG_CRC);
const BS_DEFAULT_MIDP1c 			= (BS_MODULES | BS_MODULES_XY | BS_FRAMES | BS_ANIMS | BS_SINGLE_IMAGE);


//BSprite extra flags0
const BS_EX0_FM_FREE_ROTATE_SCALE 	= (1 << 0);
const BS_EX0_AF_FREE_ROTATE_SCALE 	= (1 << 1);
const BS_EX0_MULTIPAL_IMAGE 		= (1 << 2);
const BS_EX0_MULTI_IMAGE 			= (1 << 3);
const BS_EX0_FM_BLEND_MODE 			= (1 << 4);		// export blend mode for each frame module. You need to enable GLLibConfig.sprite_useFMBlendMode
const BS_EX0_MODULE_IMAGES_USED 	= (1 << 5);

const BS_EX0_ANIMEX 				= (1 << 12);	// export tween
const BS_EX0_PIVOT_FRAME_ANIM 		= (1 << 13);
const BS_EX0_MMAPPINGS 				= (1 << 17);	// export module mappings to *.bsprite
const BS_EX0_MM_OFFSET 				= (1 << 18);	// export module offset for mapping
const BS_EX0_MM_OFFSET_SHORT 		= (1 << 19);	// export module offset as short
const BS_EX0_SINGLE_IMAGE_INDEX 	= (1 << 20);	// export image data contain alpha values and RGB palette indices

const BS_EX0_PRIMITIVES_PAL 		= (1 << 22);	// export color (from palette) & image index for primitive modules
const BS_EX0_MODULE_MERGED_ATLAS 	= (1 << 23); 	// export module merged atlas
const BS_PALETTE_TYPE 				= (1 << 24)		// export palette type to use blend palette or others in future
const BS_FRAME_POLYGONS 			= (1 << 26)		// export frame polygons collision

const MD_IMAGE 						= 0;
const MD_RECT 						= 0xFF;
const MD_FILL_RECT 					= 0xFE;
const MD_MARKER 					= 0xFD;
const MD_ARC 						= 0xFC;
const MD_FILL_ARC 					= 0xFB;
const MD_TRIANGLE 					= 0xFA;
const MD_FILL_TRIANGLE 				= 0xF9;
const MD_LINE 						= 0xF8;
const MD_FILL_RECT_GRAD 			= 0xF7;
const MD_MESH 						= 0xF4;

// Frames/Anims flags...
const FLAG_FLIP_X 					= 0x01;
const FLAG_FLIP_Y 					= 0x02;
const FLAG_ROT_90 					= 0x04;
const FLAG_HYPER_FM 				= 0x10; // Hyper FModule, used by FModules

export class Module
{
	constructor()
	{
		this.type;
		this.x;
		this.y;
		this.w;
		this.h;
		this.color;
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FModule
{
	constructor()
	{
		this.fmodulesID;
		this.fmodulesOX;
		this.fmodulesOY;
		this.fmodulesFlags;
		this.fmodulesPal;
		this.fmodulesRotation;
		this.fmodulesScaleX;
		this.fmodulesScaleY;
		this.fmodulesBlendMode;
		this.fmodulesBlendOpacity;
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class Frame
{
	constructor()
	{
		this.fmCount;
		this.fmstartIndex;
		this.rect = [];
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class AFrame
{
	constructor()
	{
		this.frameIndex;
		this.time;
		this.ox;
		this.oy;
		this.flags;
		this.rotation = 0;
		this.scaleX	= 1;
		this.scaleY	= 1;
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class Animation
{
	constructor()
	{
		this.aFramesCount;
		this.aFramesStartIndex;
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class GLSpriteReader
{
	constructor()
	{
		this.bsFlags				= 0;
		this.bsExtraFlags			= 0;
		this.modules 				= [];
		this.fmodule				= [];
		this.frames					= [];
		this.frameRect				= [];
		this.framePolygon			= [];
		this.framePolygonLength		= [];
		this.aframe					= [];
		this.anims					= [];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CheckFlag(flag1, flag2)
	{
		return (flag1 & flag2) != 0;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CheckSpriteFlag(flag)
	{
		return (this.bsFlags & flag) != 0;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CheckSpriteExtraFlag(flag)
	{
		return (this.bsExtraFlags & flag) != 0;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ConvertFMFlagsToFreeRotateScale(fmodule)
	{
		let fm_flags	= fmodule.fmodulesFlags;
		let ox 			= fmodule.fmodulesOX;
		let oy			= fmodule.fmodulesOY;
		let module		= this.modules[fmodule.fmodulesID];
		let w			= module.w;
		let h			= module.h;

		fmodule.fmodulesRotation	= 0;
		fmodule.fmodulesScaleX	= 1;
		fmodule.fmodulesScaleY	= 1;

		if (this.CheckFlag(fm_flags, FLAG_ROT_90))
		{
			fmodule.fmodulesRotation = 90;
			if (this.CheckFlag(fm_flags, FLAG_FLIP_X))
			{
				fmodule.fmodulesScaleX = -1;
				if (this.CheckFlag(fm_flags, FLAG_FLIP_Y))
				{
					fmodule.fmodulesScaleY = -1;
					oy += w;
				}
				else
				{
					oy += w;
					ox += h;
				}
			}
			else if (this.CheckFlag(fm_flags, FLAG_FLIP_Y))
			{
				fmodule.fmodulesScaleY = -1;
			}
			else
			{
				ox += h;
			}
			fmodule.fmodulesOY = oy;
			fmodule.fmodulesOX = ox;
		}
		else
		{
			if (this.CheckFlag(fm_flags, FLAG_FLIP_X))
			{
				fmodule.fmodulesScaleX = -1;
				ox += w;
				fmodule.fmodulesOX = ox;
			}

			if (this.CheckFlag(fm_flags, FLAG_FLIP_Y))
			{
				fmodule.fmodulesScaleY = -1;
				oy += h;
				fmodule.fmodulesOY = oy;
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadModule(data, index)
	{
		let nModules = BReader.ReadUShort(data, index); index += 2;
		if (nModules > 0)
		{
			let module;
			for (let i = 0; i < nModules; ++i)
			{
				let moduleType					= BReader.ReadUByte(data, index); index++;
				let bLoadAModulePosition		= false;
				let bLoadAModuleSize			= false;
				let bLoadPrimitivePaletteIndex	= false;
				let bLoadAModuleColor			= false;

				module 		= new Module();
				module.type = moduleType;

				if (moduleType == MD_IMAGE)
				{
					bLoadAModulePosition = true;
					bLoadAModuleSize = true;
					if (this.CheckSpriteFlag(BS_MODULES_IMG))
					{
						module.imgIndex = BReader.ReadByte(data, index);
						index++;
					}
				}
				else if (moduleType == MD_MESH)
				{
				}
				else if (moduleType == MD_RECT)
				{
				}
				else if (moduleType == MD_FILL_RECT)
				{
					bLoadPrimitivePaletteIndex = true;
					bLoadAModuleColor = true;
					bLoadAModuleSize = true;
				}
				else if (moduleType == MD_MARKER)
				{
				}
				else if (moduleType == MD_ARC)
				{
				}
				else if (moduleType == MD_FILL_ARC)
				{
				}
				else if (moduleType == MD_TRIANGLE)
				{
				}
				else if (moduleType == MD_FILL_TRIANGLE)
				{
				}
				else if (moduleType == MD_LINE)
				{
				}
				else if (moduleType == MD_FILL_RECT_GRAD)
				{
				}
				else
				{
					Utils.Log("Invalid module type : " + moduleType + "	module #" + i);
				}

				if (bLoadPrimitivePaletteIndex)
				{
					if (this.CheckSpriteExtraFlag(BS_EX0_PRIMITIVES_PAL))
					{
						//.........
					}
				}

				if (bLoadAModuleColor)
				{
					module.color = Graphic.ToColor(BReader.ReadInit32(data, index)); index += 4;
				}

				if (bLoadAModulePosition)
				{
					if (this.CheckSpriteFlag(BS_MODULES_XY_SHORT))
					{
						module.x = BReader.ReadShort(data, index); index += 2;
						module.y = BReader.ReadShort(data, index); index += 2;
					}
					else if (this.CheckSpriteFlag(BS_MODULES_XY))
					{
						module.x = BReader.ReadByte(data, index); index++;
						module.y = BReader.ReadByte(data, index); index++;
					}
				}

				if (bLoadAModuleSize)
				{
					if (this.CheckSpriteFlag(BS_MODULES_WH_SHORT))
					{
						module.w = BReader.ReadShort(data, index); index += 2;
						module.h = BReader.ReadShort(data, index); index += 2;
					}
					else
					{
						module.w = BReader.ReadByte(data, index); index++;
						module.h = BReader.ReadByte(data, index); index++;
					}
				}
				this.modules.push(module);
			}
		}

		return index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadFModule(data, index)
	{
		let nFModules = BReader.ReadUShort(data, index); index += 2;
		if (nFModules > 0)
		{
			for (let i = 0; i < nFModules; i++)
			{
				let fmodule = new FModule();
				if (this.CheckSpriteFlag(BS_FM_INDEX_SHORT))
				{
					fmodule.fmodulesID = BReader.ReadShort(data, index); index += 2;
				}
				else
				{
					fmodule.fmodulesID = BReader.ReadByte(data, index); index++;
				}

				if (this.CheckSpriteFlag(BS_FM_OFF_SHORT))
				{
					fmodule.fmodulesOX = BReader.ReadShort(data, index); index += 2;
					fmodule.fmodulesOY = BReader.ReadShort(data, index); index += 2;
				}
				else
				{
					fmodule.fmodulesOX = BReader.ReadByte(data, index); index++;
					fmodule.fmodulesOY = BReader.ReadByte(data, index); index++;
				}

				// Frame Module Palette (BYTE/0)
				if (this.CheckSpriteFlag(BS_FM_PALETTE))
				{
					fmodule.fmodulesPal = BReader.ReadByte(data, index); index++;
				}

				// Frame Module flags (BYTE)
				fmodule.fmodulesFlags = BReader.ReadByte(data, index); index++;
				if (this.CheckSpriteExtraFlag(BS_EX0_FM_FREE_ROTATE_SCALE))
				{
					fmodule.fmodulesRotation = BReader.ReadShort(data, index); index += 2;
					fmodule.fmodulesScaleX = BReader.ReadShort(data, index) / 100; index += 2;
					fmodule.fmodulesScaleY = BReader.ReadShort(data, index) / 100; index += 2;
				}
				else
				{
					this.ConvertFMFlagsToFreeRotateScale(fmodule);
				}

				// Frame Module Blend Mode (1 BYTE mode + 1 BYTE opacity)
				if (this.CheckSpriteExtraFlag(BS_EX0_FM_BLEND_MODE))
				{
					fmodule.fmodulesBlendMode = BReader.ReadByte(data, index); index++;
					fmodule.fmodulesBlendOpacity = BReader.ReadByte(data, index); index++;
				}

				this.fmodule.push(fmodule);
			}
		}

		return index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadFrame(data, index)
	{
		if (this.CheckSpriteFlag(BS_FRAME_RECTS))
		{
			let nRects			= BReader.ReadUShort(data, index); index += 2;
			let size 			= nRects << 2;
			let frameRectIndex	= 0;

			if (this.CheckSpriteFlag(BS_FM_OFF_SHORT))
			{
				BReader.ReadShortArray(this.frameRect, frameRectIndex, data, index, size); index += (size * 2);
				frameRectIndex += size;
			}
			else
			{
				BReader.ArrayCopy(this.frameRect, frameRectIndex, data, index, size); index += size;
				frameRectIndex += size;
			}
		}

		if (this.CheckSpriteExtraFlag(BS_FRAME_POLYGONS))
		{
			let nConner = BReader.ReadUShort(data, index); index += 2;
			let size 	= nConner << 1;

			if (this.CheckSpriteFlag(BS_FM_OFF_SHORT))
			{
				BReader.ReadShortArray(this.framePolygon, 0, data, index, size); index += (size * 2);
			}
			else
			{
				BReader.ReadShortArray(this.framePolygon, 0, data, index, size); index += (size);
			}

			let nPolygon = BReader.ReadUShort(data, index); index += 2;
			BReader.ReadShortArray(this.framePolygonLength, 0, data, index, nPolygon); index += (nPolygon * 2);
		}

		// Frames...
		let nFrames = BReader.ReadUShort(data, index); index += 2;
		if (nFrames > 0)
		{
			let frameRectOffset		= 0;
			let framePolygonOffset	= 0;
			for (let i = 0; i < nFrames; i++)
			{
				let frame 				= new Frame();
				let frameRectCount		= 0;
				let framePolygonCount	= 0;
				if (this.CheckSpriteFlag(BS_NFM_SHORT))
				{
					frame.fmCount = BReader.ReadShort(data, index); index += 2;
				}
				else
				{
					frame.fmCount = BReader.ReadByte(data, index); index++;
				}

				frame.fmstartIndex = BReader.ReadShort(data, index); index += 2;
				if (this.CheckSpriteFlag(BS_FRAME_RECTS))
				{
					let frameRectStart = frameRectOffset;
					frameRectOffset	+= BReader.ReadByte(data, index); index++;
					frameRectCount	= frameRectOffset - frameRectStart;

					for (let j = 0; j < frameRectCount; j++)
					{
						let rect = new Rect();
						let idx	 = (frameRectStart + j) * 4

						rect.x		= this.frameRect[idx + 0];
						rect.y		= this.frameRect[idx + 1];
						rect.width	= this.frameRect[idx + 2];
						rect.height	= this.frameRect[idx + 3];

						frame.rect.push(rect);
					}
				}

				if (this.CheckSpriteExtraFlag(BS_FRAME_POLYGONS))
				{
					let framePolygonStart = framePolygonOffset;
					framePolygonOffset += BReader.ReadByte(data, index); index++;
					framePolygonCount = framePolygonOffset - framePolygonStart;

					let idx = 0;
					for (let j = 0; j < framePolygonCount; j++)
					{
						let polygon = [];
						let idx		= 0;
						for (var k = 0; k < framePolygonStart + j; k++)
						{
							idx += this.framePolygonLength[k];
						}

						for (var k = 0; k < this.framePolygonLength[framePolygonStart + j]; k++)
						{
							var offset = (idx + k) * 2;
							polygon.push(this.framePolygon[offset + 0]);
							polygon.push(this.framePolygon[offset + 1]);
						}
						frame.rect.push(polygon);
					}
				}

				if (frameRectCount <= 0 && framePolygonCount <=0)
				{
					let rect		= new Rect();
					let fm_start	= frame.fmstartIndex;
					let fm_end		= frame.fmstartIndex + frame.fmCount;
					let fm 			= this.fmodule[fm_start];
					let right		= 0;
					let bottom		= 0;

					if (fm)
					{
						rect.x		= fm.fmodulesOX;
						rect.y		= fm.fmodulesOY;
						right		= fm.fmodulesOX + this.modules[fm.fmodulesID].w;
						bottom		= fm.fmodulesOY + this.modules[fm.fmodulesID].h;
					}

					for (let j = fm_start; j < fm_end; j++)
					{
						let md 	= this.modules[this.fmodule[j].fmodulesID];
						fm 		= this.fmodule[j];

						if (rect.x > fm.fmodulesOX)
						{
							rect.x = fm.fmodulesOX;
						}
						if (rect.y > fm.fmodulesOY)
						{
							rect.y = fm.fmodulesOY;
						}
						if (right < fm.fmodulesOX + md.w)
						{
							right = fm.fmodulesOX + md.w;
						}
						if (bottom < fm.fmodulesOY + md.h)
						{
							bottom = fm.fmodulesOY + md.h;
						}
					}

					rect.width	= right - rect.x;
					rect.height = bottom - rect.y;

					frame.rect.push(rect);
				}

				this.frames.push(frame);
			}

			if (!this.CheckSpriteFlag(BS_SKIP_FRAME_RC))
			{
				// Bound rect for each frame...
				let nFrames4 = nFrames << 2;
				for (let i = 0; i < nFrames4; i++)
				{
					let value;
					if (this.CheckSpriteFlag(BS_FM_OFF_SHORT))
					{
						value = BReader.ReadShort(data, index); index += 2;
					}
					else
					{
						value = BReader.ReadByte(data, index); index++;
					}
				}
			}

			if (this.CheckSpriteFlag(BS_FRAME_COLL_RC))
			{
				if (this.CheckSpriteFlag(BS_FM_OFF_SHORT))
				{
					index += (nFrames << 3);//skip
				}
				else
				{
					index += (nFrames << 2);//skip
				}
			}
		}
		return index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadAFrame(data, index)
	{
		// AFrames...
		let nAFrames = BReader.ReadUShort(data, index); index += 2;
		if (nAFrames > 0)
		{
			for (let i = 0; i < nAFrames; i++)
			{
				let aframe = new AFrame();
				if (this.CheckSpriteFlag(BS_AF_INDEX_SHORT))
				{
					aframe.frameIndex = BReader.ReadShort(data, index); index += 2;
				}
				else
				{
					aframe.frameIndex = BReader.ReadByte(data, index); index++;
				}

				aframe.time = BReader.ReadUByte(data, index); index++;
				if (this.CheckSpriteFlag(BS_AF_OFF_SHORT))
				{
					aframe.ox = BReader.ReadShort(data, index); index += 2;
					aframe.oy = BReader.ReadShort(data, index); index += 2;
				}
				else
				{
					aframe.ox = BReader.ReadByte(data, index); index++;
					aframe.oy = BReader.ReadByte(data, index); index++;
				}

				aframe.flags = BReader.ReadByte(data, index); index++;
				if (this.CheckSpriteExtraFlag(BS_EX0_AF_FREE_ROTATE_SCALE))
				{
					aframe.rotation = BReader.ReadShort(data, index); index += 2;
					aframe.scaleX = BReader.ReadShort(data, index) / 100; index += 2;
					aframe.scaleY = BReader.ReadShort(data, index) / 100; index += 2;
				}

				this.aframe.push(aframe);
			}
		}
		return index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadAnims(data, index)
	{
		// Anims...
		let nAnims = BReader.ReadUShort(data, index); index += 2;
		if (nAnims > 0)
		{
			for (let i = 0; i < nAnims; i++)
			{
				let anim = new Animation();
				if (this.CheckSpriteFlag(BS_NAF_SHORT))
				{
					anim.aFramesCount = BReader.ReadShort(data, index); index += 2;
				}
				else
				{
					anim.aFramesCount = BReader.ReadByte(data, index); index++;
				}

				anim.aFramesStartIndex = BReader.ReadShort(data, index); index += 2;
				this.anims.push(anim);
			}
		}
		return index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadTween(data, index)
	{
		if (this.CheckSpriteExtraFlag(BS_EX0_ANIMEX))
		{
			try
			{
				let keyFramesAmount = BReader.ReadUShort(data, index); index += 2;
				for (let i = 0; i < keyFramesAmount; i++)
				{
					index += 2;
					index++;
					index += 2;
					index += 2;
					index += 2;
					index += 2;
					index += 2;
					index += 2;
					index++;
					index += 2;
					index += 2;
					index += 2;
					index += 2;
					index += 2;
					index++;
					index += 2;

				}

				let interpolationSegmentsAmount = BReader.ReadUShort(data, index); index += 2;
				for (let i = 0; i < interpolationSegmentsAmount; i++)
				{
					index += 2;
					index += 2;
					index += 2;
				}

				let layersAmount = BReader.ReadUShort(data, index); index += 2;
				for (let i = 0; i < layersAmount; i++)
				{
					index += 2;
					index += 2;
					index += 2;
					index += 2;
					index += 2;
				}

				let animExAmount = BReader.ReadUShort(data, index); index += 2;
				for (let i = 0; i < animExAmount; i++)
				{
					//Read layers id animation consist of
					index += 2;
					index += 2;
					index += 2;
				}
			}
			catch (e)
			{
				Utils.Log("Guisprite: " + e);
			}
		}
		return index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(data)
	{
		this.bsFlags				= 0;
		this.bsExtraFlags			= 0;
		this.modules 				= [];
		this.fmodule				= [];
		this.frames					= [];
		this.frameRect				= [];
		this.framePolygon			= [];
		this.framePolygonLength		= [];
		this.aframe					= [];
		this.anims					= [];

		if (data && data != null && data.length > 0)
		{
			let index = 0;
			let bs_version = BReader.ReadShort(data, index); index += 2;

			if (bs_version != SUPPORTED_VERSION)
			{
				Utils.Log("ASprite.Load.Invalid BSprite version!");
				return;
			}

			this.bsFlags = BReader.ReadInit32(data, index); index += 4;
			if (this.CheckSpriteFlag(BS_EXTRA_FLAGS))
			{
				this.bsExtraFlags = BReader.ReadInit32(data, index); index += 4;
			}

			index = this.LoadModule(data, index);
			index = this.LoadFModule(data, index);
			index = this.LoadFrame(data, index);
			index = this.LoadAFrame(data, index);
			index = this.LoadAnims(data, index);
			index = this.LoadTween(data, index);

			if (this.modules.length <= 0)
			{
				Utils.Log("WARNING: sprite with num modules = " + this.modules.length);
				return;
			}

			let dataInfoIn	= [this.modules, this.fmodule, this.frames, this.aframe, this.anims];
			let dataInfoOut	= [];
			for (let i = 0; i < dataInfoIn.length; i++)
			{
				let dataOut	= [];
				BReader.ArrayCopy(dataOut, 0, dataInfoIn[i], 0, dataInfoIn[i].length);
				dataInfoOut.push(dataOut);
			}

			return {
					modules: dataInfoOut[0],
					fmodule: dataInfoOut[1],
					frames: dataInfoOut[2],
					aframe: dataInfoOut[3],
					anims: dataInfoOut[4]
				}
		}
	};
}