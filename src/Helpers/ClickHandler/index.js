import RidgidBody from "../Rigidbody"

const ClickHandler  = {
	clickCollision: function(mouse, obj, canvas) {
		var transformedClickX = mouse.pageX - canvas.offsetLeft;
   		var transformedClickY = mouse.pageY - canvas.offsetTop;
		let point = new RidgidBody(transformedClickX, transformedClickY, 1,1)
		if (point.collide(obj.body)) {
			return true
		}
		return false
	},

	clickCoordinates : function(mouse, canvas) {
		var transformedClickX = mouse.pageX - canvas.offsetLeft;
   		var transformedClickY = mouse.pageY - canvas.offsetTop;
		let point = new RidgidBody(transformedClickX, transformedClickY, 1,1)
		return point
	}, 

	transformedCoordinate : function (mouse, canvas) {
		var transformedClickX = mouse.pageX - canvas.offsetLeft;
   		var transformedClickY = mouse.pageY - canvas.offsetTop;
		return ({x : transformedClickX, y : transformedClickY})
	},

}

export default ClickHandler 