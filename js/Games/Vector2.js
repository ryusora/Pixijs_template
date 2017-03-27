var Vector2 = function(){
	this.x = 0
	this.y = 0
}

Vector2.prototype.add = function(vec2)
{
	this.x += vec2.x
	this.y += vec2.y
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