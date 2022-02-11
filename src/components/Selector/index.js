import Renderer from '../../Helpers/Renderer'
import RigidBody from '../../Helpers/Rigidbody'

class TileSelector {
		constructor(map) {
			this.render = new Renderer()
			this.map = map;
			this.scale = 3;
			this.pos = {
				x: 0,
				y: 0,
			}
			this.processed = false;
			this.tiles = [];
			this.selected = false;
		}

		setSelected = (tile) => {
			this.selected = tile 
		}

		constructTile(tile) {
			this.tiles.push({
				body: new RigidBody(tile.x , tile.y, tile.width, tile.height),
			})
		}
		
		processLoadedImage() {
			if (this.processed === true) return ;
			if (this.map.img.height && this.map.img.width) {
				for (let y = 0; y < this.map.img.width; y += 32) {
					for (let x = 0; x < this.map.img.height; x += 32) {
						this.constructTile({x: x, y:y, width: 32, height: 32})
					}
				}

				if (this.map.img.width < 800) {
					this.scale = 2;
				} else if (this.map.img.width < 500) {
					this.scale = 1;
				}
				this.pos.x = (window.innerWidth - this.map.img.width / this.scale) - 10
				this.processed = true;
			}
		}

		draw(ctx) {
			this.processLoadedImage();
			if (this.processed) {
				let _render = this.render;
				let _map = this.map;
				let _scale = this.scale
				let _mapPosition = this.pos;
				let _selected = this.selected;
				this.tiles.forEach(function(tile) {
					_render.image({
						img: _map.img, x:tile.body.pos.x, y: tile.body.pos.y, width: tile.body.size.x, height: tile.body.size.y}, 
						{x: tile.body.pos.x / _scale + _mapPosition.x, y: tile.body.pos.y / _scale + _mapPosition.y, width:tile.body.size.x / _scale, height: tile.body.size.y / _scale}, 
						ctx)
					if (_selected) {
						_render.outlineRect(_selected, ctx)	
					}
				})
			}
		}

		click(click) {
			let _setSelected = this.setSelected;
			let _scale = this.scale
			let _mapPosition = this.pos;
			for (let tile of this.tiles) {
				let _tile = { 
						body: 
							new RigidBody(
								tile.body.pos.x / _scale + _mapPosition.x,
							 	tile.body.pos.y / _scale + _mapPosition.y,
							 	tile.body.size.x / _scale,
							 	tile.body.size.y / _scale
							),
						pos: 
							new RigidBody(
								tile.body.pos.x,
								tile.body.pos.y,
								tile.body.size.x,
								tile.body.size.y,
							),
						img: this.map.img
					}

				if (_tile.body.collide(click)) {
					_setSelected(_tile)
					return true
				}
			}
			return false;
		}
}



export default TileSelector



