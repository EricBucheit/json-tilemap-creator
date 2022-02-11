import RigidBody from '../../Helpers/Rigidbody'
import {userInterface} from "../../assets/images/UserInterface"
import exportFromJSON from 'export-from-json'
import Renderer from '../../Helpers/Renderer'

let Buttons = {
	editingCollision: false,
	editingTrigger: false,
	collisionTagName: "noName",
	triggerTagName: "noName",
	render : new Renderer(),

	collisionButton : {
	  ...userInterface.greenButton,
	  body: new RigidBody(0, 0, 100, 50),
	  label: {
	  	fontSize: "16",
		label: "Collision",
		body: new RigidBody(20, 30, 32, 32)
	  }
	},

	collisionButtonActive : {
	  ...userInterface.redButton,
	  body: new RigidBody(0, 0, 100, 50),
	  label: {
	  	fontSize: "16",
		label: "Collision",
		body: new RigidBody(20, 30, 32, 32)
	  }
	},

	triggerButton : {
	  ...userInterface.greenButton,
	  body: new RigidBody(120, 0, 100, 50),
	  label: {
	  	fontSize: "16",
		label: "Trigger",
		body: new RigidBody(140, 30, 32, 32)
	  }
	},

	triggerButtonActive : {
	  ...userInterface.blueButton,
	  body: new RigidBody(120, 0, 100, 50),
	  label: {
	  	fontSize: "16",
		label: "Trigger",
		body: new RigidBody(140, 30, 32, 32)
	  }
	},


	removeButton : {
	  ...userInterface.greenButton,
	  body: new RigidBody(235, 0, 100, 50),
	  label: {
	  	fontSize: "16",
		label: "Remove",
		body: new RigidBody(250, 30, 32, 32)
	  }
	},

	getExportLayer : function(layer) {		
		let _layer = {
			map: layer.creator.map.src,
			width: layer.creator.width / layer.creator.tile_width,
			height: layer.creator.height / layer.creator.tile_height,
			name: layer.creator.name,
			tiles: [],
		}

		layer.creator.iterTiles((tile) => {
			if (tile.image) {
				_layer.tiles.push({
					img: {
						pos: tile.image.pos.pos,
						size: tile.image.pos.size,
					},
					pos: {
						x: tile.body.pos.x,
						y: tile.body.pos.y
					},
					collision: tile.collision ? true : false,
					trigger: tile.trigger ? true : false,
					tag: tile.tag || "",
				})
			} else {
				_layer.tiles.push({img: false});
			}
		})
		return _layer;
	},

	export : function(layer, filename) {
		var data = [];
		data.push(this.getExportLayer(layer));
		const fileName = filename || `tilemap-${layer.name}`;
		const exportType =  exportFromJSON.types.json;
		exportFromJSON({ data, fileName, exportType });
	},

	exportAll : function(layers, filename) {
			var data = [];

			for (let _layer of layers) {
				data.push(this.getExportLayer(_layer));
			}
			const fileName = filename || `TileMap-${layers.length}-layers`
			const exportType =  exportFromJSON.types.json
			exportFromJSON({ data, fileName, exportType })
	},

	editCollisionButton: function(click, tagName) {
		if (this.collisionButton.body.collide(click)) {
			this.editingCollision = !this.editingCollision
			this.editingTrigger = false
			this.collisionTagName = tagName
			return true
		}
		return false
	},

	editTriggerClick: function(click, tagName) {
		if (this.triggerButton.body.collide(click)) {
			this.editingTrigger = !this.editingTrigger
			this.editingCollision = false;
			this.triggerTagName = tagName
			return true
		}
		return false
	},

	resetButtons: function() {
		this.editingCollision = false;
		this.editingTrigger = false;
	},

	removeButtonClick: function(click) {
		if (this.removeButton.body.collide(click)) {
			return true
		}
		return false
	},

	renderButtons: function(ctx) {		
		if (this.editingCollision) {
			this.render.imgButton(this.collisionButtonActive, ctx)

		} else {
			this.render.imgButton(this.collisionButton, ctx)	
		}

		if (this.editingTrigger) {
			this.render.imgButton(this.triggerButtonActive, ctx)
		} else {
			this.render.imgButton(this.triggerButton, ctx)	
		}

		this.render.imgButton(this.removeButton, ctx);
	},
}

export default Buttons