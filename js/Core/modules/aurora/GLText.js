import { BReader } from './BReader';

export class GLText
{
	constructor()
	{
		this.texts	= [];
		this.loaded	= false;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Utf8ArrayToStr(array, index, length)
	{
		var out, i, len, c, char2, char3;

		out = "";
		len = length;
		i 	= 0;

		while (i < len)
		{
			c = array[index + i];i++;
			switch(c >> 4)
			{
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					// 0xxxxxxx
					out += String.fromCharCode(c);
					break;
				case 12: case 13:
					// 110x xxxx   10xx xxxx
					char2 = array[index + i];i++;
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
					break;
				case 14:
					// 1110 xxxx  10xx xxxx  10xx xxxx
					char2 = array[index + i];i++;
					char3 = array[index + i];i++;
					out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
					break;
			};
		};

		return out;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(data)
	{
		var index = 0;

		//Get text pack tabID
		var tabID = BReader.ReadByte(data, index);
		index++;

		// get nb of string in text pack
		var string_count = BReader.ReadInit32(data, index);
		index += 4;

		// read text array offsets
		var textArrayOffset = [];

		for (var i = 0; i < string_count; i++)
		{
			textArrayOffset[i] = BReader.ReadInit32(data, index);
			index += 4;

		}

		// get text array
		var offset = 0;
		for (var i = 0; i < string_count; i++)
		{
			this.texts[i] = this.Utf8ArrayToStr(data, index, textArrayOffset[i] - offset);
			index += (textArrayOffset[i] - offset);
			offset = textArrayOffset[i];
		}

		this.loaded = true;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetText(id)
	{
		return this.texts[id];
	}
}