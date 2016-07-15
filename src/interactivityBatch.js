define([
    ], 
    function(
    ){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska
 */


var interactivityBatch = function(layerScreen, layerScreenTemp, draw, nodes, edges){
    var toAddEdges = [];
    var toAddNodes = [];
    var toRemoveEdges = [];
    var toRemoveNodes = [];
    
    var ePos,nPos,eDirs,lastNodeIndex,lastEdgeIndex;
    
    
    
    function createSupportStructs(nodes, edges){
      nPos = {};
      ePos = {};
      eDirs = {};

      nodes.forEach((n, i) => {
	n.uniqid = i;
	nPos[n.uniqid] = i;
	eDirs[n.uniqid] = {};
      });
      
      edges.forEach((e, i) => {
	e.uniqid = i;
	eDirs[e.source.uniqid][e.target.uniqid] = e;
	ePos[e.uniqid] = i;
      });
      
      lastNodeIndex = nodes[nodes.length-1].uniqid;
      lastEdgeIndex = nodes[nodes.length-1].uniqid;
      
      supStructsCreated = true;
    };

  function doRemoveNodes(){
    toRemoveNodes.forEach((n) => {
      if(n.uniqid === undefined)
        return;
      
      if(nPos[n.uniqid] !== undefined){
        //in the normal graph
        var pos = nPos[n.uniqid];
        layerScreen.removeNodeAtPos(pos);
      }else{
        //try to remove from temp graph
        
        for(var i = 0; i < actualTempNodes.length; i++){
          if(actualTempNodes[i].uniqid === n.uniqid){
            actualTempNodes.splice(i,1);
            break;
          }
        }
      }
      
      delete n.uniqid;
    });
  }

  function doRemoveEdges(){
    toRemoveEdges.forEach((e) => {
      if(e.uniqid === undefined)
        return;

      delete eDirs[e.source.uniqid][e.target.uniqid];
      
      if(ePos[e.uniqid] !== undefined){
        //in the normal graph
        var pos = ePos[e.uniqid];
        layerScreen.removeEdgeAtPos(pos);
      }else{
        //try to remove from temp graph
        
        for(var i = 0; i < actualTempEdges.length; i++){
          if(actualTempEdges[i].uniqid === e.uniqid){
            actualTempEdges.splice(i,1);
            break;
          }
        }

      }
      
      delete e.uniqid;
    });
  }
  
  function doAddEdges(){
    toAddEdges.forEach((e) => {
      //already added
      if(e.uniqid !== undefined){
        console.error(e);
        console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
        return;
      }
      //already added
      e.uniqid = ++lastEdgeIndex;

      //add this node into temporary chart
      actualTempEdges.push(e);
    });
  }
  
  function doAddNodes(nodes){
    toAddNodes.forEach((n) => {
      
      //already added
      if(n.uniqid !== undefined){
        console.error(n);
        console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
        return;
      }

      n.uniqid = ++lastNodeIndex;
      
      eDirs[n.uniqid] = {};
      actualTempNodes.push(n);
    });
  }

  this.addEdge = (e) => {
    var tid = e.target.uniqid;
    var sid = e.source.uniqid;
    
    if((eDirs[sid] || {})[tid]){
      //this edge was already added
      return this;
    }
    if((eDirs[tid] || {})[sid]){
      //must remove line and add two curves
      
      toRemoveEdges.push(eDirs[tid][sid]);
      
      toAddEdges.push(eDirs[tid][sid]);
      toAddEdges.push(eDirs[sid][tid] = e);
      
      return this;
    }

    toAddEdges.push(e);
    return this;
  };
  
  this.addNode = (n) => {
    toAddNodes.push(n);    
    return this;
  };

  this.applyChanges = () => {
    actualTempNodes = layerScreenTemp.nodes;
    actualTempEdges = layerScreenTemp.edges;
    
    doRemoveEdges();
    doRemoveNodes();
    doAddNodes();
    doAddEdges();
    
    toAddEdges = [];
    toAddNodes = [];
    toRemoveEdges = [];
    toRemoveNodes = [];
    
    
    layerScreenTemp.set(actualTempNodes, actualTempEdges);
    draw();
    
    return this;
  };
  
  createSupportStructs(nodes, edges);
  
}

module.exports = interactivityBatch;

});


 