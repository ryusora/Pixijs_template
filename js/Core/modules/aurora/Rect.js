export class Rect
{
	constructor()
	{
		this.x		= 0;
		this.y		= 0;
		this.width	= 0;
		this.height	= 0;
	}

	Set(rect)
	{
		this.x		= rect.x;
		this.y		= rect.y;
		this.width	= rect.width;
		this.height	= rect.height;
	}

	Scale(scalex, scaley)
	{
		this.x		*= scalex;
		this.y		*= scaley;
		this.width	*= scalex;
		this.height	*= scaley;

		return this;
	}

	Translate(x, y)
	{
		this.x		+= x;
		this.y		+= y;

		return this;
	}

	Clone()
	{
		let rect = new Rect()

		rect.x		= this.x;
		rect.y		= this.y;
		rect.width	= this.width;
		rect.height	= this.height;

		return rect;
	}
}