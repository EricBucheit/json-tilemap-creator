export default class Collision {

	box(obj1, obj2) {
		if (obj1.pos.x < obj2.pos.x + obj2.size.x &&
		   obj1.pos.x + obj1.size.x > obj2.pos.x &&
		   obj1.pos.y < obj2.pos.y + obj2.size.y &&
		   obj1.pos.y + obj1.size.y > obj2.pos.y) {
		    return (true);
		}
		return (false);
	}

	findSide(obj1, obj2) {
		let side = {
			left: false,
			right: false,
			top: false,
			bottom: false,
		}
		
		let obj1_bottom = obj1.pos.y + obj1.size.y;
		let obj1_right = obj1.pos.x + obj1.size.x;

		let obj2_bottom = obj2.pos.y + obj2.size.y;
		let obj2_right = obj2.pos.x + obj2.size.x;
		
		var dx = (obj1_right / 2) - (obj2_right / 2);
	    var dy = (obj1_bottom / 2) - (obj2_bottom / 2);
	    var width = (obj1.size.x + obj2.size.x) /2 ;
	    var height = (obj1.size.y + obj2.size.y)/2;
	    
	    var crossWidth = width * dy;
	    var crossHeight = height * dx;
	    
	    if(Math.abs(dx) <= width && Math.abs(dy) <= height){
	        if(crossWidth > crossHeight){
	        	if (crossWidth > (-crossHeight)) {
	        		side.top = true;
	        	} else {
	        		side.right = true;
	        	}
	        }else{
	        	if (crossWidth > -(crossHeight)) {
	        		side.left = true
	        	} else {
	        		side.down = true
	        	}
	        }
	    }
		return(side);

	}

}