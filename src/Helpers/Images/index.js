function createSingleImage(img) {
	let image = new Image();
	image.src = img;

	return image;
}

function mapTile(x,y,width,height) {
	return ({
		x:x,
		y:y,
		width : width,
		height: height,
	})
}

function loadImage(image, src) {
    return ({
        img : createSingleImage(image),
        src : src,
      } )
 }

export {
	createSingleImage,
	mapTile,
	loadImage,
}