import inventoryUI from "./SpriteSheets/UI/inventoryUI2.png"
import armorUI from "./SpriteSheets/UI/armorUI.png"
import statsUI from "./SpriteSheets/UI/statsUI.png"
import redButton from "./SpriteSheets/UI/Buttons/Button19.png"
import greenButton from "./SpriteSheets/UI/Buttons/Button18.png"
import aquaButton from "./SpriteSheets/UI/Buttons/Button5.png"
import blueButton from "./SpriteSheets/UI/Buttons/Button20s.png"

import upArrow from "./SpriteSheets/UI/upArrow.png"
import downArrow from "./SpriteSheets/UI/downArrow.png"
import closeButton from "./SpriteSheets/UI/closeButton.png"
import bankScrollBar from "./SpriteSheets/UI/bankScrollBar.png"


import icons from "./SpriteSheets/UI/icons.png"
import bankBackGround from "./SpriteSheets/UI/bankBackGround.png"
import itemBorder from "./SpriteSheets/UI/itemBorder.png"

import itemInfoBackGround from "./SpriteSheets/UI/itemInfoBackGround.png"

import actionButtonBackGround from "./SpriteSheets/UI/actionButtonBackGround.png"

import healthBar from "./SpriteSheets/UI/healthBars/healthBar.png"
import thirstBar from "./SpriteSheets/UI/healthBars/thirstBar.png"
import hungerBar from "./SpriteSheets/UI/healthBars/foodBar.png"
import emptyBar from "./SpriteSheets/UI/healthBars/emptyBar.png"
 

import {createSingleImage, mapTile} from '../../Helpers/Images'

let userInterface = {
	inventory : {
		img : createSingleImage(inventoryUI),
		pos : mapTile(0, 0, 120, 480) 
	},

	bankBackGround : {
		img : createSingleImage(bankBackGround),
		pos : mapTile(0, 0, 300, 430) 
	},

	buyBackGround : {
		img : createSingleImage(bankBackGround),
		pos : mapTile(0, 0, 300, 430) 
	},

	itemBorder : {
		img : createSingleImage(itemBorder),
		pos : mapTile(0, 0, 40, 40) 
	},


	armor : {
		img : createSingleImage(armorUI),
		pos : mapTile(0, 0, 120, 480) 
	},
	stats : {
		img : createSingleImage(statsUI),
		pos : mapTile(0, 0, 120, 480) 
	},

	redButton : {
		img : createSingleImage(redButton),
		pos : mapTile(0, 0, 230, 80) 
	},
	greenButton : {
		img : createSingleImage(greenButton),
		pos : mapTile(0, 0, 230, 80) 
	},
	aquaButton : {
		img : createSingleImage(aquaButton),
		pos : mapTile(0, 0, 230, 80) 
	},
	
	blueButton : {
		img : createSingleImage(blueButton),
		pos : mapTile(0, 0, 230, 80) 
	},

	closeButton : {
		img : createSingleImage(closeButton),
		pos : mapTile(0, 0, 64, 64) 
	},

	downArrow : {
		img : createSingleImage(downArrow),
		pos : mapTile(0, 0, 64, 64) 
	},

	upArrow : {
		img : createSingleImage(upArrow),
		pos : mapTile(0, 0, 64, 64) 
	},

	bankScrollBar : {
		img : createSingleImage(bankScrollBar),
		pos : mapTile(0, 0, 8, 120) 
	},


	statsIcon : {
		img : createSingleImage(icons),
		pos : mapTile(5, 5, 30, 30) 
	},

	magicIcon : {
		img : createSingleImage(icons),
		pos : mapTile(5, 40, 30, 30) 
	},

	inventoryIcon : {
		img : createSingleImage(icons),
		pos : mapTile(40, 40, 30, 30) 
	},

	armorIcon : {
		img : createSingleImage(icons),
		pos : mapTile(110, 40, 30, 30) 
	},

	actionButtonBackGround : {
		img : createSingleImage(actionButtonBackGround),
		pos : mapTile(0, 0, 431, 196) 
	},

	itemInfoBackGround : {
		img : createSingleImage(itemInfoBackGround),
		pos : mapTile(0, 0, 431, 196) 
	},

	healthBar: {
		img : createSingleImage(healthBar),
		pos : mapTile(0, 0, 206, 28) 
	},

	hungerBar: {
		img : createSingleImage(hungerBar),
		pos : mapTile(0, 0, 206, 28) 
	},

	thirstBar: {
		img : createSingleImage(thirstBar),
		pos : mapTile(0, 0, 206, 28) 
	},

	emptyBar: {
		img : createSingleImage(emptyBar),
		pos : mapTile(0, 0, 206, 28) 
	},
}

export {
	userInterface
}