var Vector2 = function(x = 0, y = 0) {
	this.x = x
	this.y = y
}

Vector2.prototype.add = function(vec2)
{
	this.x += vec2.x
	this.y += vec2.y
}

Vector2.prototype.sub = function(vec2)
{
	this.x -= vec2.x
	this.y -= vec2.y
}

Vector2.prototype.normalize = function()
{
	var distance = Math.sqrt(this.x*this.x + this.y*this.y)
	this.x /= distance
	this.y /= distance
}

Vector2.prototype.zero = function()
{
	this.x = 0
	this.y = 0
}

Vector2.prototype.mulSchalar = function(mul)
{
	this.x *= mul
	this.y *= mul
}

Vector2.prototype.clone = function(newVec2)
{
	this.x = newVec2.x
	this.y = newVec2.y
}

module.exports = Vector2