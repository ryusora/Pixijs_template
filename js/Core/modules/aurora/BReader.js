export class BReader
{
	static ReadUInit32(bytearray, index)
	{
		return ((bytearray[index + 3] << 24) | (bytearray[index + 2] << 16) | (bytearray[index + 1] << 8) | bytearray[index + 0]);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ReadInit32(bytearray, index)
	{
		let imax = Math.pow(2, 32);
		var value = ((bytearray[index + 3] << 24) | (bytearray[index + 2] << 16) | (bytearray[index + 1] << 8) | bytearray[index + 0]);
		if (value >= imax / 2)
		{
			value = value - imax;
		}
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ReadUShort(bytearray, index)
	{
		return ((bytearray[index + 1] << 8) | bytearray[index + 0]);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ReadShort(bytearray, index)
	{
		let smax = Math.pow(2, 16);
		var value = ((bytearray[index + 1] << 8) | bytearray[index + 0]);
		if (value >= smax / 2)
		{
			value = value - smax;
		}
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ReadShortArray(dest_data, dest_index, src_data, src_index, length)
	{
		for (var i = 0; i < length; i++)
		{
			dest_data[i + dest_index] = BReader.ReadShort(src_data, src_index); src_index += 2;
		}
		return src_index;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ReadUByte(bytearray, index)
	{
		var value = bytearray[index] & 0xff;
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ReadByte(bytearray, index)
	{
		let bmax = Math.pow(2, 8);
		var value = bytearray[index] & 0xff;
		if (value >= bmax/2)
		{
			value = value - bmax;
		}
		return value;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	static ArrayCopy(des_data, des_index, src_data, src_index, length)
	{
		for (var i = 0; i < length; i++)
		{
			des_data[des_index++] = src_data[src_index++];
		}
	}
}