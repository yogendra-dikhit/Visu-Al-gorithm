import { Component, OnInit, ViewChild } from '@angular/core';
import { Spot } from '../shared/spot';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-maze-generator',
  templateUrl: './maze-generator.component.html',
  styleUrls: ['./maze-generator.component.css']
})
export class MazeGeneratorComponent implements OnInit {

  constructor() { }
  @ViewChild("toolbar") toolBar :ToolbarComponent;
  numberOfRows :number = 20;
  numberOfColumns :number = 50;
  timer = (ms: number) => new Promise(res => setTimeout(res, ms));
  grid :Array<Array<Spot>> = [];
  DFSStack : Spot[]= [];
  methods : string[] = [ "Recurrsive DFS" , "Division" ];
  method: string = "";
  isVisualizerRunning: boolean = false;
  runnerSpeed : number = 10;
  sliderVisibility :string = "none";
  ngOnInit(): void {
    this.setup();
  }
  setup(){
    this.grid=[];
    this.DFSStack =[];
    for(let i=0; i<this.numberOfRows; i++){
      this.grid[i]= Array();
      for(let j=0; j<this.numberOfColumns; j++){
        this.grid[i].push(new Spot(i,j));
      }
    }
  }
  changeRunnerSpeed(speedChanged:string){
    switch (speedChanged){
      case "Slow":
        this.runnerSpeed = 250;
        break;
      case "Medium":
        this.runnerSpeed = 100;
        break;
      case "Fast":
        this.runnerSpeed = 50;
    }
  }
  changeRunningState(e: boolean){
    this.isVisualizerRunning = e;
  }
  async RunVisualizer(e: string){
    this.method = e;
    switch (this.method){
      case "Recurrsive DFS" :
        await this.ExecDFS(this.grid[0][0]);
        break;
      case "Division":
        await this.execDivision(0,this.numberOfRows,0,this.numberOfColumns);
        break;
    }
    this.isVisualizerRunning = false;
    this.toolBar.changeRunningState(this.isVisualizerRunning);
  }
  async ExecDFS(current:Spot){
    if(!this.isVisualizerRunning || current == undefined ) return;
    current.isVisited = true;
    current.class =  "active";
    let unvisitedNeighbours = this.getUnvisitedNeighbours(current);
    if(unvisitedNeighbours.length != 0){
      let rIndex = this.getRandomIndex(0,unvisitedNeighbours.length);
      let next = unvisitedNeighbours[rIndex];
      this.DFSStack.push(current);

      if(current.row - next.row != 0){
        if(current.row > next.row){
          current.borderTop = "none";
          next.borderBottom = "none";
        }else{
          next.borderTop = "none";
          current.borderBottom = "none";
        }
      }else{
        if(current.col < next.col){
          current.borderRight = "none";
          next.borderLeft = "none";
        }else{
          next.borderRight = "none";
          current.borderLeft = "none";
        }
      }
      await this.timer(this.runnerSpeed);
      current.class = "";
      await this.ExecDFS(next);
    }else{
      await this.timer(this.runnerSpeed);
      current.class = "";
      await this.ExecDFS(this.DFSStack.pop());
    }

  }

  getUnvisitedNeighbours(cur:Spot) :Spot[]{
    let unvisitedNeighbours =[];
    let i = cur.row;
    let j = cur.col;
    if(i> 0)
      unvisitedNeighbours.push(this.grid[i-1][j]);
    if(j < this.numberOfColumns-1)
      unvisitedNeighbours.push(this.grid[i][j+1]);
    if(i < this.numberOfRows-1)
      unvisitedNeighbours.push(this.grid[i+1][j]);
    if(j > 0)
      unvisitedNeighbours.push(this.grid[i][j-1]);
    return unvisitedNeighbours.filter(n => !n.isVisited);
  }
  getRandomIndex(min:number,max:number):number{
    return Math.floor(Math.random() * (max-min) + min);
  }

  async execDivision(startRow:number, endRow:number, startCol:number, endCol:number){
    if(startRow == 0 && endRow == this.numberOfRows && startCol == 0 && endCol == this.numberOfColumns){
      for(let j=0; j< this.numberOfColumns; j++){
        await this.timer(this.runnerSpeed);
        this.grid[0][j].class = "blackBox";
      }
      for(let i=0; i< this.numberOfRows; i++){
        await this.timer(this.runnerSpeed);
        this.grid[i][this.numberOfColumns-1].class = "blackBox";
      }
      for(let j=this.numberOfColumns-1; j>=0; j--){
        await this.timer(this.runnerSpeed);
        this.grid[this.numberOfRows-1][j].class = "blackBox";
      }
      for(let i=this.numberOfRows-1; i>=0; i--){
        await this.timer(this.runnerSpeed);
        this.grid[i][0].class = "blackBox";
      }
      await this.execDivision(startRow+2, endRow-2, startCol+2, endCol-2);
    }else{
      let rIndex = this.getRandomIndex(startRow, endRow-1);
      let cIndex = this.getRandomIndex(startCol,endCol-1);
      let rSkipIdx = this.getRandomIndex(startCol,endCol-1);
      let cSkipIdx = this.getRandomIndex(startRow,endRow-1);
      rSkipIdx = rSkipIdx < cIndex ? endCol - rSkipIdx : rSkipIdx;
      for(let j=startCol-1; j<=endCol; j++){
        if( j == rSkipIdx) continue;
        this.grid[rIndex][j].class = "blackBox";
      }

      for(let i=startRow-1; i<=endRow; i++){
        if(i == cSkipIdx) continue;
        this.grid[i][cIndex].class = "blackBox";
      }
    }

  }
}
