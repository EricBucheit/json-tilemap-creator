import React, { useEffect, useState, useRef } from 'react';


import ClickHandler from '../../Helpers/ClickHandler'
// import TileSelector from '../../components/Selector'
// import MapCreator from '../../components/Creator'
import RigidBody from '../../Helpers/Rigidbody'
import Timer from '../../Helpers/Timer'


import {mapTools} from '../../components/Tools';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

let gameTimer = Timer(1000 / 40);


//todos
//Add json parser to edit


const Game = {
  init() {
    this.mouseDown = false;
    this.mapPosition = new RigidBody(0,0,32,32);
  },
  
  logic: function() {
    this.mapPosition.invertedMoveControls();
    this.mapPosition.checkSprint(20, 20);
  }, 

  render: function(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mapTools.renderLayers(ctx, this.mapPosition)
  }
}

const getPixelRatio = ctx => {
    var backingStore =
    ctx.backingStorePixelRatio ||
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
    
    return (window.devicePixelRatio || 1) / backingStore;
};
 

Game.init();



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

const getItemStyle = (isDragging, draggableStyle, index, currentLayer) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: (isDragging || index === currentLayer) ? "lightgreen" : "white",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid * 2,
  width: 150

});


function DragNDrop({layers, setLayers, currentLayer, setCurrentLayer}) {
  
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
     
      return;
    }

    const _layers = reorder(
      layers,
      result.source.index,
      result.destination.index
    );

    setLayers(_layers)
    mapTools.layers = _layers
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {layers.map((layer, index) => (
                <Draggable key={layer.id} draggableId={layer.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        index,
                        currentLayer, 
                      )}
                      onClick={() => {
                        mapTools.currentLayer = index;

                        setCurrentLayer(index);
                      }}
                    >
                      {index + 1}: {layer.name}

                      <button 
                        style={{float: "right", width: 20, padding: 1, textAlign:"center", backgroundColor:"red", border: "0px solid black"}}
                        onClick={() => {
                          mapTools.removeLayer(index)
                          setLayers([...mapTools.layers]);
                        }}
                      > - </button>
                      <button 
                        style={{float: "right", width: 20, padding: 1, textAlign:"center", backgroundColor:"white", border: "0px solid black"}}
                        onClick={() => {
                          mapTools.hideLayer(index)
                          setLayers([...mapTools.layers]);
                        }}
                      > 
                      {!layer.creator.hidden === false ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>


  )
}






export default function Draw() {
    let ref = useRef();
    let requestId;
        let [filename, setFilename] = useState("")

    let [triggerTagName, setTriggerTagName] = useState("")
    let [collisionTagName, setCollisionTagName] = useState("")
    let [layerName, setLayerName] = useState("")
    let [layerWidth, setLayerWidth] = useState(5);
    let [layerHeight, setLayerHeight] = useState(5);


    let [layers, setLayers] = useState(mapTools.layers);
    let [currentLayer, setCurrentLayer] = useState(mapTools.currentLayer);



    let [panelPage, setPanelPage] = useState("layers");


    useEffect(() => {
        let canvas = ref.current;
        let ctx = canvas.getContext('2d');

        const handleResize = e => {
          ctx.canvas.height = window.innerHeight;
          ctx.canvas.width = window.innerWidth;
        };

        const render = () => {
          if (gameTimer.check()) {
            Game.logic()
            Game.render(ctx, canvas);  
          }
          
          requestId = requestAnimationFrame(render);
        };

        window.addEventListener("resize", handleResize);

        handleResize();
        render()

        return () => {
          cancelAnimationFrame(requestId);
        };
    }, []);
     
     return (
        <>
         <canvas
          ref={ref} 
         
          tabIndex="0" 
          width={window.innerWidth}
          height={window.innerHeight}
          onKeyDown={(e) => {
                Game.mapPosition.keydown(e.key)
          }}

          onKeyUp={(e) => {
                Game.mapPosition.keyup(e.key)
          }}

          onContextMenu = {(e) => {
              e.preventDefault()
              const canvas = ref.current;
            }
          }
            onMouseMove = {(e) => {
              if (mapTools.mouseDown === true) {
                const canvas = ref.current;

                let click = ClickHandler.clickCoordinates(e, canvas)
                let creator = mapTools.getCreator();
                let selector = mapTools.getSelector();

                if (selector.click(click)) return ;
                
                if  (creator.placeTile(
                      click,
                      selector.selected,
                      Game.mapPosition,
                      {tag: triggerTagName, editing: mapTools.buttons.editingTrigger}, 
                      {tag: collisionTagName, editing: mapTools.buttons.editingCollision}
                    )
                  ) {
                  return ;
                }
                  
                }
              }
            }

          onClick = {(e) => {
              const canvas = ref.current;
              let click = ClickHandler.clickCoordinates(e, canvas)
              
              let creator = mapTools.getCreator();
              let selector = mapTools.getSelector();
              let layer = mapTools.getLayer();
              
              if (mapTools.buttons.editCollisionButton(click, collisionTagName)) return ;
              if (mapTools.buttons.editTriggerClick(click, triggerTagName)) return ;
              if (mapTools.buttons.removeButtonClick(click)) {
                selector.selected = false
              }


              if (selector.click(click)) return ;
              if  (creator.placeTile(
                      click,
                      selector.selected,
                      Game.mapPosition,
                      {tag: triggerTagName, editing: mapTools.buttons.editingTrigger}, 
                      {tag: collisionTagName, editing: mapTools.buttons.editingCollision}
                    )
                  )
              {
                return ;
              }
                
              
            }
          }

          onMouseDown = {(e) => {
              const canvas = ref.current;
              mapTools.mouseDown = true;
            }
          }

          onMouseUp = {(e) => {
              const canvas = ref.current;
              mapTools.mouseDown = false;
            }
          }
         />
        
         <div style={{position: "absolute", top: window.innerHeight * .5, right: 0, width: "30%", padding: 5, backgroundColor:"lightgrey"}}>
            <div style={{display:"flex", flexDirection: "row", padding: 5, justifyContent:"space-around"}}>
                <button onClick={() => setPanelPage("layers")} style={{padding: 5, borderRadius: 5}}>Layers</button>
                <button onClick={() => setPanelPage("tags")} style={{padding: 5, borderRadius: 5}}>Tags</button>
                <button onClick={() => setPanelPage("export")} style={{padding: 5, borderRadius: 5}}>Export</button>
            </div> 

            <hr />

            <div style={{display:"flex", flexDirection: "column"}}> 
                {panelPage === "layers" && 
                    <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr", justifyContent: "center", alignContent: "center"}}>
                        <div>
                            <center>
                                <label>Layer Name</label>
                                <input type="text" style={{margin: 2, padding: 2}} value={layerName} onChange ={(e) =>  {
                                    setLayerName(e.target.value)
                                }} />
                                 <label>Layer Width</label>
                                 <input type="text" style={{margin: 2, padding: 2}} value={layerWidth} onChange ={(e) =>  {
                                    setLayerWidth(e.target.value)
                                }} />
                                
                                <label>Layer Height</label>
                                 <input type="text" style={{margin: 2, padding: 2}} value={layerHeight} onChange ={(e) =>  {
                                    setLayerHeight(e.target.value)
                                }} />
                            </center>

                               

                            <div style={{height: 225, width: 250,overflowY: "scroll", margin: "auto"}}>  
                              {mapTools.maps.map((_map, index) => {
                                return (
                                  <button key={index} style={{width: 100, padding: 5, margin: 5}} 
                                    onClick={() => { 
                                      mapTools.addLayer(layerName || _map.name, _map.map, layerWidth, layerHeight)
                                      setLayers([...mapTools.layers])
                                      setCurrentLayer(mapTools.currentLayer);
                                    }}
                                  > {_map.name} </button>
                                )
                              })} 
                            </div>
                        </div>
                         <div style={{height: 225, overflowY: "scroll"}}>
                            <label>Layers</label>
                            <DragNDrop layers={layers} setLayers={setLayers} currentLayer={currentLayer} setCurrentLayer={setCurrentLayer}/>
                        </div>
                    </div>
                }

                {panelPage === "tags" && 
                    <div>
                        <div style={{justifySelf: "center"}} >
                            <div style={{display: "flex", flexDirection:"column"}}>
                                <label>Collision Tag Name</label>
                                <input type="text" style={{margin: 2, padding: 2}} value={collisionTagName} onChange ={(e) =>  {
                                  let creator = mapTools.getCreator();
                                  setCollisionTagName(e.target.value)
                                  creator.collisionTagName = e.target.value

                                }} />

                                <label>Trigger Tag Name</label>
                                <input type="text" style={{margin: 2, padding: 2}} value={triggerTagName} onChange ={(e) =>  {
                                  let creator = mapTools.getCreator();
                                  setTriggerTagName(e.target.value)
                                  creator.triggerTagName = e.target.value

                                }} />
                            </div>
       
                        </div>
                    </div>
                }


                {panelPage === "export" && 
                    <div>
                        <div style={{justifySelf: "center"}} >
                            <label>Save Filename</label>
                            <input type="text" style={{margin: 2, padding: 2}} value={filename} onChange ={(e) =>  {
                              setFilename(e.target.value)
                            }} />
                            <div style={{display: "flex", flexDirection:"column"}}>
                               <button style={{margin: 5, padding:5, borderRadius: 5}} onClick={() => {
                                    let layer = mapTools.getLayer();
                                    mapTools.buttons.export(layer, filename)
                               }}>Export Layer</button>
                               <button style={{margin: 5, padding:5, borderRadius: 5}} onClick={() => {
                                    mapTools.buttons.exportAll(mapTools.layers, filename)
                               }}>Export All Layers</button>
                           </div>
       
                        </div>
                    </div>
                }

           </div>
         </div>


         </>
     );
 };