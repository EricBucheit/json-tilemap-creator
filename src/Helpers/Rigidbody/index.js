import Vector2d from '../Vector2d' 
import Collision from '../Collision' 

export default class RigidBody {
	constructor(x, y, width, height) {
		this.pos = new Vector2d(x,y);
		this.size = new Vector2d(width, height);
		this.collision = new Collision();
		this.velocity = new Vector2d(5,5);
	
		this.keys = {
			w:false, 
			a:false,
			s:false,
			d:false,
			shift: false,
			space: false,
		}
	}


	keydown(key) {
		if (key === " ") {
			key = "space"
		}

		this.keys[key.toLowerCase()] = true
	}

	keyup(key) {
		if (key === " ") {
			key = "space"
		}
		this.keys[key.toLowerCase()] = false;
	}

	checkSprint(vx = 10, vy = 10) {
		if (this.keys.shift) {
			this.setVelocity(vx,vy);
		} else {
			this.setVelocity(5,5);
		}
	}

	moveControls() {
		if (this.keys.space) {
			return ;
		}
		if (this.keys.w) {
			this.move_up()
		}
		if (this.keys.a) {
			this.move_left();
		}
		if (this.keys.s) {
			this.move_down();
		}
		if (this.keys.d) {
			this.move_right();
		}
	}

	invertedMoveControls() {
		if (this.keys.space) {
			return ;
		}

		if (this.keys.w) {
			this.move_down()
		}
		if (this.keys.a) {
			this.move_right();
		}
		if (this.keys.s) {
			this.move_up();
		}
		if (this.keys.d) {
			this.move_left();
		}
	}

	setVelocity(x,y) {
		this.velocity = new Vector2d(x,y);
	}

	setPos(x,y) {
		this.pos.x = x;
		this.pos.y = y;
	}
	
	move_right() {
		this.pos.x += this.velocity.x;
	}

	move_left() {
		this.pos.x -= this.velocity.x;

	}

	move_down() {
		this.pos.y += this.velocity.y
	}

	move_up() {
		this.pos.y -= this.velocity.y
	}
	
	collide(obj) {
		return(this.collision.box(this, obj));
	}

	test() {
		this.log();
	}

	log()
	{
		this.pos.log();
		this.size.log();
	}

}