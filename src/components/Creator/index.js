
import Renderer from '../../Helpers/Renderer'
import RigidBody from '../../Helpers/Rigidbody'

export default class MapCreator {
	constructor(height, width, map) {
		this.map = map;
		this.height = height * 32;
		this.width = width * 32;
		this.tile_width = 32;
		this.tile_height = 32;

		this.render = new Renderer();
		this.tiles = this.createTiles();
		this.hidden = false;
		
	}
	

	createTiles = () => {
		let tiles = new Array(this.height / 32)

		for (let y = 0; y < this.height / 32; y++) {
			tiles[y] = new Array(this.width / 32)

			for (let x = 0; x < tiles[y].length; x++) {
				tiles[y][x] = {
					body: new RigidBody(x * 32, y *  32, 32, 32),
					image: false,
				}
			}
		}
		return tiles
	}

	placeTile = (click, image, mapPosition, trigger, collision) => {
		
		this.iterTiles((tile) => {
			let offsetTile = new RigidBody(tile.body.pos.x + mapPosition.pos.x, tile.body.pos.y + mapPosition.pos.y, tile.body.size.x, tile.body.size.y)

			if (offsetTile.collide(click)) {
				if (collision.editing) {
					tile.collision = true;
					tile.tag = collision.tag
				} else {
					tile.collision = false;
				}

				if (trigger.editing) {
					tile.trigger = true;
					tile.tag = trigger.tag
				} else {
					tile.trigger = false;
				}

				tile.image = image
				return true
			}
		})
		return false
	}

	renderTile = (ctx, mapPosition) => {
		let _render = this.render;
		this.iterTiles((tile) => {
			
			if (tile.image) {
				_render.image(
					{img: tile.image.img, x: tile.image.pos.pos.x, y: tile.image.pos.pos.y, width: tile.image.pos.size.x, height: tile.image.pos.size.y},
					{x: tile.body.pos.x + mapPosition.pos.x, y: tile.body.pos.y + mapPosition.pos.y, width: tile.body.size.x, height: tile.body.size.y},
					ctx
				)

				if (tile.collision) {
					_render.outlineRect(tile, ctx, "red", {x: mapPosition.pos.x, y: mapPosition.pos.y})
				}

				if (tile.trigger) {
					_render.outlineRect(tile, ctx, "blue", {x: mapPosition.pos.x, y: mapPosition.pos.y})
				}
			}
			
		})
	}

	renderOutline = (ctx, mapPosition) =>  {
		let _render = this.render;

		this.iterTiles((tile) => {
			_render.outlineRect(tile, ctx, "lightgrey", {x: mapPosition.pos.x, y: mapPosition.pos.y})
		})
		
	}

	iterTiles(callback) {
		let len = this.tiles.length;
		for (let y = 0; y < len; y++ ) {
			let x_len = this.tiles[y].length

			for (let x = 0; x < x_len; x++){
				callback(this.tiles[y][x]);
			}
		}
	}




}