import { BReader } from './BReader';

export class GLPack
{
	constructor()
	{
		this.version;
		this.count;
		this.packName;
		this.packDataIndex;
		this.packdDataLength;
		this.packdData;
		this.subpackCount
		this.subpackStartIndex;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(arrayBuffer)
	{
		/// File/Package System
		///	handle data file access (read only)
		///
		///	Packages are composed of at least one data file (subpack).
		///
		///	The first data file (first subpack) contain extra information about
		///	all the data stored within the pack.
		///
		/// Extra information for 1st subpack, at the very beginning of the file:
		///
		///	- 2 byte : Pack this.version.
		///
		///	- 2 byte : Number of data within the pack.
		///			How many data are store within this pack (including all subpack)).
		///
		///	- 2 byte : Number of subpacks.
		///			How many subpacks compose this pack.
		///
		/// - 2 byte * number of subpack (fat table):
		///			List the starting data number of each subpack.<br>
		///			Example with 3 sub pack we could have : 0, 8, 15 :
		///				- Subpack0 contain data(0) to data(7).
		///				- Subpack1 contain data(8), data(14).
		///				- Subpack2 contain data(15) to data(nb of data).
		///
		///	Then each subpack (including the first one) contain:
		///		By number of the resources:
		///		- 1 byte : length of the resource id - as string.
		///		- (length of the resource id) bytes : string of the resource id.
		///		- 1 int : offset of the resource in the pack.
		///			This offset is the offset of each data from the begining of this file to the data.
		///		- 1 int : length of resource data
		///
		///	Finaly, for each data inside the subpack:
		///		- 1 byte : mime type of the data except if file is a dummy file (eg size = 0)
		///		- x byte : the data
		///
		///
		/// There is also one "special" pack, which contain the MIME type if some were defined:
		///	- 1 byte : Mime type this.count.
		///	- For each mime type:
		///		- 1 byte : length of mime type byte array.
		///		- length of mime type byte : byte array encoded as UTF-8 representing the mime type.

		let data = null;
		if (typeof Uint8Array != 'undefined')
		{
			data = new Uint8Array(arrayBuffer);
		}
		else
		{
			let dataview = new DataView(arrayBuffer);
			data = [];
			for (let i = 0; i < arrayBuffer.byteLength; i++)
			{
				data[i] = dataview.getUint8(i);
			}
		}

		let index 				= 0;
		this.version			= BReader.ReadShort(data, index); index += 2;
		this.count				= BReader.ReadShort(data, index); index += 2;
		this.subpackCount		= BReader.ReadShort(data, index); index += 2;
		this.subpackStartIndex	= [];

		for (let i = 0; i < this.subpackCount; i++)
		{
			let startIndex = BReader.ReadShort(data, index);
			index += 2;
			this.subpackStartIndex[i] = startIndex;
		}

		let last;
		let dataindex;
		this.packName			= [];
		this.packdData			= [];
		this.packDataIndex		= [];
		this.packdDataLength	= [];

		let dataCount = 0;
		for (let subPack = 0; subPack < this.subpackCount; subPack++)
		{
			while (dataCount < this.count)
			{
				let nameLength = BReader.ReadByte(data, index); index++;
				if (nameLength > 0)
				{
					let nameBytes = [];
					BReader.ArrayCopy(nameBytes, 0, data, index, nameLength);
					index += nameLength;
					this.packName[dataCount] = nameBytes;
				}

				let offset = BReader.ReadInit32(data, index); index += 4;
				this.packDataIndex[dataCount] = offset;

				let resLength = BReader.ReadInit32(data, index); index += 4;
				this.packdDataLength[dataCount] = resLength;

				dataCount++;
			}
		}

		for (let n = 0; n < this.count; n++)
		{
			let starindex	= this.packDataIndex[n];
			let size		= this.packdDataLength[n];
			let minetype	= BReader.ReadByte(data, starindex); starindex++;

			this.packdData[n] = [];
			BReader.ArrayCopy(this.packdData[n], 0, data, starindex, size - 1);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetData(index)
	{
		return this.packdData[index];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Close()
	{
		if (this.packdData != null)
		{
			for (let i = 0; i < this.packdData.length; i++)
			{
				this.DeleteArray(this.packdData[i]);
			}
			this.DeleteArray(this.packdData);
		}

		this.packName			= null;
		this.packdData			= null;
		this.packDataIndex		= null;
		this.packdDataLength	= null;

		this.isloaded = false;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DeleteArray(array)
	{
		for (let i = 0; i < array.length; i++)
		{
			delete array[i];
		}

		array.splice(0, array.length);
	}
}