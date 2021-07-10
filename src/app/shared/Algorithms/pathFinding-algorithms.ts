import { Box } from "../box";

export function BFS(){
    let queue :Box[] = [];
    let pathQueue :Box[] = [];
    queue.push(this.startPoint);
    while(queue.length != 0){
      let current :Box = queue.shift();
      if(current.isWall)continue;
      pathQueue.push(current);
      if(current == this.endPoint){ console.log("Found!!"); return pathQueue; }
      this.updateNeighboursBFS(current,queue);
    }
    return Array<Box>();
  }
export function  updateNeighboursBFS(current: Box,queue:Box[]){
    let unvisitedNeightbors :Box[] = this.getNeighboursForDjikstra(current).filter(neighbour => !neighbour.isVisited);
    for(let neighbour of unvisitedNeightbors){
      neighbour.isVisited =true;
      neighbour.prevNode = current;
      queue.push(neighbour);
    }
  }
export function  DFS(){
    let queue :Box[] = [];
    let pathQueue :Box[] = [];
    queue.push(this.startPoint);
    while(queue.length != 0){
      let current = queue.pop();
      if(current.isWall)continue;
      current.isVisited = true;
      pathQueue.push(current);
      if(current == this.endPoint){console.log("Found!!"); return pathQueue;}
      this.updateNeighboursDFS(current,queue);
    }
    return Array<Box>();
  }
export function  updateNeighboursDFS(node: Box,queue:Box[]){
    let neighbors : Box[] = this.getNeighboursForDjikstra(node).filter(neighbor => !neighbor.isVisited);
    for(let neighbor of neighbors){
      neighbor.prevNode = node;
      queue.push(neighbor);
    }
  }
export function  Astar(){
    let closedSet :Box[] = [];
    let openSet :Box[] = [this.startPoint];
    while( openSet.length != 0 ){
      let leastFscorePoint = 0;
      for(let i=0; i<openSet.length; i++){
        if(openSet[i].fScore < openSet[leastFscorePoint].fScore)
          leastFscorePoint = i;
      }
      let current :Box = openSet[leastFscorePoint];
      this.removeFromArray(openSet,current);
      // current.class = 'visited-point';
      closedSet.push(current);
      if(current === this.endPoint){console.log('Found'); return closedSet;}
      this.updateNeighboursForAstar(current,openSet,closedSet);
    }
    return new Array<Box>();
  }
export function  updateNeighboursForAstar(current:Box,openSet:Box[],closedSet:Box[]){
    let neighbours :Box[] = this.getNeighboursForAstar(current);
    for(let neighbor of neighbours){
      if(!closedSet.includes(neighbor) && !neighbor.isWall){
      let tempGScore = neighbor.gScore + 1;
      let betterPath = false;
      if(openSet.includes(neighbor)){
        neighbor.gScore = tempGScore < neighbor.gScore ? tempGScore : neighbor.gScore;
        betterPath = true;
      }else{
        neighbor.gScore = tempGScore;
        openSet.push(neighbor);
        betterPath = true;
      }
      if(betterPath){
        neighbor.hScore = this.heuristic(neighbor,this.endPoint);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        neighbor.prevNode = current;
      }
      }
    }
  }

  export function  getNeighboursForAstar(node:Box){
    let row = node.row;
    let col = node.col;
    let neighbors = [];
    if(row > 0) neighbors.push(this.grid[row-1][col]);
    if(row < this.grid.length -1) neighbors.push(this.grid[row+1][col]);
    if(col > 0) neighbors.push(this.grid[row][col-1]);
    if(col < this.grid[0].length -1) neighbors.push(this.grid[row][col+1]);
    if(row > 0 && col > 0){
      neighbors.push(this.grid[row-1][col-1]);
    }
    if(row < this.grid.length-1 && col < this.grid[0].length-1){
      neighbors.push(this.grid[row+1][col+1]);
    }
    if(row > this.grid.length-1 && col > 0){
      neighbors.push(this.grid[row+1][col-1]);
    }
    if(row < 0 && col > this.grid[0].length-1){
      neighbors.push(this.grid[row-1][col+1]);
    }
    return neighbors;
  }
  
export function  heuristic(a:Box,b:Box){
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }
export function  removeFromArray(arr:any[],box:Box){
    for(let i=arr.length-1; i>=0; i--){
      if(arr[i] == box)
        arr.splice(i,1);
    }
  }

export function  dijkstra(){
    let visitedNodesInOrder = [];
    let unvisitedNodes :Box[] = this.getAllNodes();
    while(unvisitedNodes.length != 0){
      this.sortNodesByDistance(unvisitedNodes);
      let closestNode = unvisitedNodes.shift();
      if(closestNode.isWall) continue;
      if(closestNode.distance == Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      // closestNode.class = closestNode.class + ' visited-point';
      visitedNodesInOrder.push(closestNode);
      if(closestNode == this.endPoint) return visitedNodesInOrder;
      this.updateUnvisitedNeighboursFordijkstra(closestNode);
    }
    return new Array<Box>();
  }
export function  updateUnvisitedNeighboursFordijkstra(node:Box){
    let neighbors : Box[] = this.getNeighboursForDjikstra(node).filter(neighbor => !neighbor.isVisited);
    for(let neighbor of neighbors){
      neighbor.distance = node.distance +1;
      neighbor.prevNode = node;
    }
  }

export function  getNeighboursForDjikstra(node:Box){
    let row = node.row;
    let col = node.col;
    let neighbors = [];
    if(row > 0) neighbors.push(this.grid[row-1][col]);
    if(row < this.grid.length -1) neighbors.push(this.grid[row+1][col]);
    if(col > 0) neighbors.push(this.grid[row][col-1]);
    if(col < this.grid[0].length -1) neighbors.push(this.grid[row][col+1]);
    /* if(row > 0 && col > 0){
      neighbors.push(this.grid[row-1][col-1]);
    }
    if(row < this.grid.length-1 && col < this.grid[0].length-1){
      neighbors.push(this.grid[row+1][col+1]);
    }
    if(row > this.grid.length-1 && col > 0){
      neighbors.push(this.grid[row+1][col-1]);
    }
    if(row < 0 && col > this.grid[0].length-1){
      neighbors.push(this.grid[row-1][col+1]);
    } */
    return neighbors;
  }
export function  getAllNodes(){
    let nodes = [];
    for(let i=0; i<this.grid.length; i++){
      for(let j=0; j<this.grid[0].length; j++){
        nodes.push(this.grid[i][j]);
      }
    }
    return nodes;
  }
  
export function sortNodesByDistance(nodeList :Box[]){
    return nodeList.sort((nodeA,nodeB) => nodeA.distance - nodeB.distance);
  }
