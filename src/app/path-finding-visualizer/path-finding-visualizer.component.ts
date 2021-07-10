import { Component, OnInit, ViewChild } from '@angular/core';
import { Box } from '../shared/box';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Astar, BFS, DFS, dijkstra, getAllNodes, getNeighboursForAstar, getNeighboursForDjikstra, heuristic,
   removeFromArray, sortNodesByDistance, updateNeighboursBFS, updateNeighboursDFS, updateNeighboursForAstar, 
   updateUnvisitedNeighboursFordijkstra 
  } from '../shared/Algorithms/pathFinding-algorithms'

@Component({
  selector: 'path-finding-visualizer',
  templateUrl: './path-finding-visualizer.component.html',
  styleUrls: ['./path-finding-visualizer.component.css']
})
export class PathFindingVisualizerComponent implements OnInit {

  @ViewChild("toolbar") toolBar :ToolbarComponent;
  rows: any[]=[];
  columns:any[]=[];
  numberOfRows :number = 20;
  numberOfcolumns :number = 40;
  startPoint :Box = null;
  endPoint: Box = null;
  grid : Array<Box[]> = [];
  methods : String[] = ["A*","djikstra","BFS","DFS"];
  method = "";
  isVisualizerRunning: boolean = false;
  runnerSpeed: number = 100;
  sliderVisibility : string = "none";
  mousedown: boolean;
  timer = (ms: number) => new Promise(res => setTimeout(res, ms));
  Astar: { (): Box[]; (): Box[]; };
  BFS: { (): Box[]; (): Box[]; };
  DFS: { (): Box[]; (): Box[]; };
  dijkstra: { (): Box[]; (): any[]; };
  updateNeighboursForAstar: (current: Box, openSet: Box[], closedSet: Box[]) => void;
  getNeighboursForAstar: (node: Box) => any[];
  heuristic: (a: Box, b: Box) => number;
  removeFromArray: (arr: any[], box: Box) => void;
  updateUnvisitedNeighboursFordijkstra: (node: Box) => void;
  getNeighboursForDjikstra: (node: Box) => any[];
  getAllNodes: () => any[];
  sortNodesByDistance: (nodeList: Box[]) => Box[];
  updateNeighboursDFS: (node: Box, queue: Box[]) => void;
  updateNeighboursBFS: (current: Box, queue: Box[]) => void;
  constructor() {
    this.Astar = Astar;
    this.BFS = BFS;
    this.DFS = DFS;
    this.dijkstra = dijkstra;
    this.updateNeighboursForAstar = updateNeighboursForAstar;
    this.getNeighboursForAstar = getNeighboursForAstar;
    this.heuristic = heuristic;
    this.removeFromArray = removeFromArray;
    this.updateUnvisitedNeighboursFordijkstra = updateUnvisitedNeighboursFordijkstra;
    this.getNeighboursForDjikstra = getNeighboursForDjikstra;
    this.getAllNodes = getAllNodes;
    this.sortNodesByDistance = sortNodesByDistance;
    this.updateNeighboursDFS = updateNeighboursDFS;
    this.updateNeighboursBFS = updateNeighboursBFS;
  }

  ngOnInit(): void {
    this.setup();
  }

  setup(){
    this.rows = Array(this.numberOfRows);
    this.grid= [];
    this.startPoint = null;
    this.endPoint = null;
    for(let i=0; i<=this.numberOfRows; i++){  
      this.grid[i] = new Array();
      for(let j=0; j<=this.numberOfcolumns; j++){
        this.grid[i].push(new Box(i,j));
      }
    }
  }

  changeRunnerSpeed(speedChanged:string){
    switch (speedChanged){
      case "Slow":
        this.runnerSpeed = 100;
        break;
      case "Medium":
        this.runnerSpeed = 50;
        break;
      case "Fast":
        this.runnerSpeed = 10;
    }
  }
  changeRunningState(e){
    this.isVisualizerRunning = e;
  }
  async RunVisualizer(method:string){
    this.method = method;
    switch (this.method){
      case "A*" :
        await this.execAstar();
        break;
      case "djikstra":
        await this.execdijkstra();
        break;
      case "BFS":
        await this.excecBFS();
        break;
      case "DFS":
        await this.excecDFS();
        break;
    }
    this.isVisualizerRunning = false;
    this.toolBar.changeRunningState(this.isVisualizerRunning);
  }

  async execAstar(){
    let visitedNodesInOrder : Box[] = this.Astar();
    if(visitedNodesInOrder == undefined || visitedNodesInOrder.length == 0){
      console.log('No Solution!!');
      return;
    } 
    for(let node of visitedNodesInOrder){
      if(!this.isVisualizerRunning) break;
      if(!(node.isStart || node.isFinish)){
        
        this.grid[node.row][node.col].class = this.grid[node.row][node.col].class + ' visited-point';
        await this.timer(this.runnerSpeed);
      }
    }
    let nodesInShortestPathOrder : Box[] = this.getNodesInShortestPathOrder();
    for(let node of nodesInShortestPathOrder){
      if(!this.isVisualizerRunning) break;
      if(!(node.isStart || node.isFinish)){
        
          this.grid[node.row][node.col].class = 'traversed-point';
          await this.timer(this.runnerSpeed);
      }
    }
  }
  async excecBFS(){
    let visitedNodesInOrder : Box[] = this.BFS();
    if(visitedNodesInOrder == undefined || visitedNodesInOrder.length == 0){
      console.log('No Solution!!');
      return;
    } 
    for(let node of visitedNodesInOrder){
      if(!this.isVisualizerRunning) break;
      if(!(node.isStart || node.isFinish)){
        
          this.grid[node.row][node.col].class = this.grid[node.row][node.col].class + ' visited-point';
          await this.timer(this.runnerSpeed);
      }
    }
    let nodesInShortestPathOrder : Box[] = this.getNodesInShortestPathOrder();
    for(let node of nodesInShortestPathOrder){
      if(!this.isVisualizerRunning) break;
      if(!(node.isStart || node.isFinish)){
        
          this.grid[node.row][node.col].class = 'traversed-point';
          await this.timer(this.runnerSpeed);
      }
    }
  }
  async excecDFS(){
    let visitedNodesInOrder : Box[] = this.DFS();
    if(visitedNodesInOrder == undefined || visitedNodesInOrder.length == 0){
      console.log('No Solution!!');
      return;
    } 
    for(let node of visitedNodesInOrder){
      if(!this.isVisualizerRunning) break;
      if(!(node.isStart || node.isFinish)){
        
          this.grid[node.row][node.col].class = this.grid[node.row][node.col].class + ' visited-point';
          await this.timer(this.runnerSpeed);
      }
    }
    let nodesInShortestPathOrder : Box[] = this.getNodesInShortestPathOrder();
    for(let node of nodesInShortestPathOrder){
      if(!this.isVisualizerRunning) break;
      if(!(node.isStart || node.isFinish)){
        
          this.grid[node.row][node.col].class = 'traversed-point';
          await this.timer(this.runnerSpeed);
      }
    }
  }
  
  
  async execdijkstra(){
    let visitedNodesInOrder : Box[] = this.dijkstra();
      for(let node of visitedNodesInOrder){
        if(!this.isVisualizerRunning) break;
        if(!(node.isStart || node.isFinish)){
          
            this.grid[node.row][node.col].class = this.grid[node.row][node.col].class + ' visited-point';
            await this.timer(this.runnerSpeed);
        }
      }
      let nodesInShortestPathOrder : Box[] = this.getNodesInShortestPathOrder();
      for(let node of nodesInShortestPathOrder){
        if(!this.isVisualizerRunning) break;
        if(!(node.isStart || node.isFinish)){
          
            this.grid[node.row][node.col].class = 'traversed-point';
            await this.timer(this.runnerSpeed);
        }
      }
  }

  boxClicked(e:Box){
    if(this.startPoint == null){
      e.isVisited = true;
      e.class = 'start-point';
      e.distance = 0;
      e.isStart = true;
      this.startPoint = e;
    }else if(this.endPoint == null){
      e.class = 'end-point';
      e.isFinish = true;
      this.endPoint = e;
    }else{
      e.isWall = true;
      e.class = "wall";
    }
  }
  onmouseEnter(e:Box){
    if(this.mousedown)
    this.boxClicked(e);
  }
  onmouseDouwn(e:Box){
    this.boxClicked(e);
    this.mousedown =true;
  }
  onmouseUp(e:Box){
    this.mousedown = false;
  }

  getNodesInShortestPathOrder(){
    let curNode = this.endPoint;
    let nodesInShortestPathOrder : Box[] = [];
    while(curNode != null){
      nodesInShortestPathOrder.unshift(curNode);
      curNode = curNode.prevNode;
    }
    return nodesInShortestPathOrder;
  }

  
  /* boxClicked(e:any){
    // console.log(e);
    let id = $(e).attr("id");
    if(this.startPoint == ""){
      this.startPoint = id;
      $(e).attr('distance',0);
      $(e).addClass('start-point');
      return;
    }else if(this.endPoint == ""){
      this.endPoint = id;
      $(e).addClass('end-point');
      this.dijkstra();
      this.getNodesInShortesPathOrder();
      return;
    }
  }
  
  setup(){
    for(let i=1; i<=this.numberOfRows; i++){
      this.rows.push(i);
    }
    for(let i=1; i<=this.numberOfcolumns; i++){
      this.columns.push(i);
    }
  }
  getNodesInShortesPathOrder(){
    let shortestPathOrder = [];
    let currentNode = this.endPoint;
    while(currentNode != null){
      shortestPathOrder.unshift(currentNode);
      currentNode = $("#"+currentNode).attr('prevNode');
      if(currentNode != null && currentNode != this.startPoint) $("#"+currentNode).addClass("traversed-point");
    }
  }
  dijkstra(){
    let visitedNodes = [];
    while( this.idArray.length != 0){
      this.sortNodesByDistance(this.idArray);
      let closestNode = this.idArray.shift();
      if(this.getDistance(closestNode) == Infinity) return;
      $("#"+closestNode).attr("isVisited","true");
      $("#"+closestNode).addClass("visited-point");
      visitedNodes.push(closestNode);
      if(closestNode == this.endPoint) {console.log('found'+closestNode); return};
      this.updateUnvisitedNeighbors(closestNode);
    }
  }
  updateUnvisitedNeighbors(closestNode:string){
    let unvisitedNeightbors = this.getUnvisitedNeibhors(closestNode);
    for(let u of unvisitedNeightbors){
      let elDistance = $('#'+u).attr('distance');
      let row = Number.parseInt(u.substring(u.indexOf("r")+1,u.indexOf("c")));
      let col = Number.parseInt(u.substring(u.indexOf("c")+1));
      let newDistance = elDistance == "infinite" ? Number.parseInt($('#'+this.getRowColId(row,col-1)).attr('distance'))+1 : Number.parseInt(elDistance) +1;
      $("#"+u).attr("distance", newDistance);
      $("#"+u).attr('prevNode',closestNode);
    }
  }
  getUnvisitedNeibhors(node : string){
    let neighbors = [];
    let row = Number.parseInt(node.substring(node.indexOf("r")+1,node.indexOf("c")));
    let col = Number.parseInt(node.substring(node.indexOf("c")+1));
    if(row > 1) neighbors.push(this.getRowColId(row-1,col));
    if(row < this.numberOfRows) neighbors.push(this.getRowColId(row+1,col));
    if(col > 1) neighbors.push(this.getRowColId(row,col-1));
    if(col < this.numberOfcolumns) neighbors.push(this.getRowColId(row,col+1));
    return neighbors.filter(neighbor => $("#"+neighbor).attr('isVisited') == "false");
  }
  getRowColId(row:number,column:number){
    let id ="r"+row+"c"+column;
    return id;
  }
  sortNodesByDistance(nodes:any[]){
    nodes.sort((nodeA,nodeB)=> this.getDistance(nodeA) - this.getDistance(nodeB));
    /* this.idArray = nodes.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    }) */
   /*  while(this.idArray[0] == this.idArray[1])
      this.idArray.shift();
  }
  getDistance(nodeId){
    let dis = $("#"+nodeId).attr('distance');
    return dis == "infinite" ? Infinity : Number.parseInt(dis);
  }*/
}
