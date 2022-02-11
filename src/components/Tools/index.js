import TileSelector from '../Selector'
import MapCreator from '../Creator'
import Buttons from '../Buttons'

import terrain_atlas from "../../assets/images/SpriteSheets/terrain/terrain_atlas.png"
import base_atlas from "../../assets/images/SpriteSheets/terrain/base_out_atlas.png"
import misk_atlas from "../../assets/images/SpriteSheets/terrain/obj_misk_atlas.png"
import cottage from "../../assets/images/SpriteSheets/terrain/cottage.png"
import thatched_roof from "../../assets/images/SpriteSheets/terrain/thatched-roof.png"
import fence from "../../assets/images/SpriteSheets/terrain/fence.png"
import fence_alt from "../../assets/images/SpriteSheets/terrain/fence_alt.png"
import doors from "../../assets/images/SpriteSheets/terrain/lpc-doors-animated-1.png"
import well from "../../assets/images/SpriteSheets/terrain/lpc-well.png"
import tiles from "../../assets/images/SpriteSheets/terrain/Tiles.png"

import {loadImage} from "../../Helpers/Images"


let mapTools = {
	layers: [],
	layerIds : 1,
	currentLayer : 0,
	collisionTagName : "",
	triggerTagName: "",
	buttons: Buttons,

	maps : [
		{
			name: "baseout",
			map: loadImage(base_atlas, "../assets/images/SpriteSheets/terrain/base_out_atlas.png"),
		},
		{
			name: "terrain",
			map: loadImage(terrain_atlas, "../assets/images/SpriteSheets/terrain/terrain_atlas.png") 

		},
		{
			name: "misc-atlas",
			map: loadImage(misk_atlas, "../assets/images/SpriteSheets/terrain/obj_misk_atlas.png")
		},
		{
			name: "Cottage",
			map: loadImage(cottage, "../assets/images/SpriteSheets/terrain/cottage.png")
		},
		{
			name: "thatched-roof",
			map: loadImage(thatched_roof, "../assets/images/SpriteSheets/terrain/thatched-roof.png")
		},
		{
			name: "fence",
			map: loadImage(fence, "../assets/images/SpriteSheets/terrain/fence.png")
		},
		{
			name: "fence_alt",
			map: loadImage(fence_alt, "../assets/images/SpriteSheets/terrain/fence_alt.png")
		},
		{
			name: "doors",
			map: loadImage(doors, "../assets/images/SpriteSheets/terrain/lpc-doors-animated-1.png")
		},
		{
			name: "well",
			map: loadImage(well, "../assets/images/SpriteSheets/terrain/lpc-well.png")
		},
		{
			name: "tiles",
			map: loadImage(tiles, "../assets/images/SpriteSheets/terrain/Tiles.png")
		},


	],

	getCreator: function() {
		return this.layers[this.currentLayer].creator
	},

	getSelector: function() {
		return this.layers[this.currentLayer].selector
	},

	getLayer: function() {
		return this.layers[this.currentLayer];
	},

	addLayer: function(name, map, layerWidth, layerHeight) {
		this.layers.push({
			id: this.layerIds.toString(),
			name: name || `layer - ${this.layerIds}`,
	        selector: new TileSelector(map),
	        creator: new MapCreator(layerHeight, layerWidth, map),
		})
		this.layerIds++;
		this.currentLayer = this.layers.length - 1
		return (this.layers[this.currentLayer]);
	},

	removeLayer: function(index) {
		this.layers.splice(index, 1);
	},

	hideLayer: function(index) {
		this.layers[index].creator.hidden = !this.layers[index].creator.hidden
	},

	renderLayers: function(ctx, mapPosition) {
		if (this.layers[this.currentLayer]) {
	    	this.layers[this.currentLayer].creator.renderOutline(ctx, mapPosition);	
	    }
		
		for (let layer of this.layers) {
		  if (!layer.creator.hidden) {
		  	layer.creator.renderTile(ctx, mapPosition)	
		  }
	      
	    }

	    if (this.layers[this.currentLayer]) {
	    	this.layers[this.currentLayer].selector.draw(ctx);	
	    }
	    this.buttons.renderButtons(ctx)
	}
}


export {
	mapTools
}