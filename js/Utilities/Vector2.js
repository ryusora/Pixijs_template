export class Vector2{ 
	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}
	Add(vec2) {
		this.x += vec2.x;
		this.y += vec2.y;
	}
	Sub(vec2) {
		this.x -= vec2.x;
		this.y -= vec2.y;
	}
	Normalize() {
		let distance = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		this.x /= distance;
		this.y /= distance;
	}
	multiplyScalar(scalar){
		this.x *= scalar;
		this.y *= scalar;
	}
	Clone(vec2){
		this.x = vec2.x;
		this.y = vec2.y;
	}
}