import { Component, OnInit, ViewChild } from '@angular/core';
import { Box } from '../shared/box';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PathFinder } from '../shared/Algorithms/pathFinding-algorithms';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'path-finding-visualizer',
  templateUrl: './path-finding-visualizer.component.html',
  styleUrls: ['./path-finding-visualizer.component.css'],
})
export class PathFindingVisualizerComponent implements OnInit {
  @ViewChild('toolbar') toolBar: ToolbarComponent;
  rows: any[] = [];
  columns: any[] = [];
  numberOfRows: number = 20;
  numberOfcolumns: number = 50;
  startPoint: Box = null;
  endPoint: Box = null;
  grid: Array<Box[]> = [];
  methods: String[] = ['A*', 'djikstra', 'BFS', 'DFS'];
  method = '';
  isVisualizerRunning: boolean = false;
  runnerSpeed: number = 100;
  sliderVisibility: string = 'none';
  mousedown: boolean;
  pathFinder: PathFinder;
  timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
  constructor(private _snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.setup();
  }

  setup() {
    if (this.isVisualizerRunning) {
      this._snackBar.openSnackBar('Visualizer still running', 'mat-warn');
      return;
    }
    this.rows = Array(this.numberOfRows);
    this.grid = [];
    this.startPoint = null;
    this.endPoint = null;
    for (let i = 0; i < this.numberOfRows; i++) {
      this.grid[i] = new Array();
      for (let j = 0; j < this.numberOfcolumns; j++) {
        this.grid[i].push(new Box(i, j));
      }
    }
    this.pathFinder = new PathFinder(this.grid);
  }

  changeRunnerSpeed(speedChanged: string) {
    switch (speedChanged) {
      case 'Slow':
        this.runnerSpeed = 100;
        break;
      case 'Medium':
        this.runnerSpeed = 50;
        break;
      case 'Fast':
        this.runnerSpeed = 10;
    }
  }
  changeRunningState(e: boolean) {
    this.isVisualizerRunning = e;
  }
  async RunVisualizer(method: string) {
    this.method = method;
    switch (this.method) {
      case 'A*':
        await this.execAstar();
        break;
      case 'djikstra':
        await this.execdijkstra();
        break;
      case 'BFS':
        await this.excecBFS();
        break;
      case 'DFS':
        await this.excecDFS();
        break;
    }
    this.isVisualizerRunning = false;
    this.toolBar.changeRunningState(this.isVisualizerRunning);
  }

  async execAstar() {
    let visitedNodesInOrder: Box[] = this.pathFinder.Astar();
    await this.RunAnimator(visitedNodesInOrder);
  }
  async excecBFS() {
    let visitedNodesInOrder: Box[] = this.pathFinder.BFS();
    await this.RunAnimator(visitedNodesInOrder);
  }
  async excecDFS() {
    let visitedNodesInOrder: Box[] = this.pathFinder.DFS();
    await this.RunAnimator(visitedNodesInOrder);
  }

  async execdijkstra() {
    let visitedNodesInOrder: Box[] = this.pathFinder.dijkstra();
    await this.RunAnimator(visitedNodesInOrder);
  }

  async RunAnimator(visitedNodesInOrder: Box[]) {
    if (visitedNodesInOrder == undefined || visitedNodesInOrder.length == 0) {
      console.log('No Solution!!');
      this._snackBar.openSnackBar('No Path found!!', 'mat-warn');
      return;
    }
    for (let node of visitedNodesInOrder) {
      if (!this.isVisualizerRunning) break;
      if (!(node.isStart || node.isFinish)) {
        this.grid[node.row][node.col].class =
          this.grid[node.row][node.col].class + ' visited-point';
        await this.timer(this.runnerSpeed);
      }
    }
    let nodesInShortestPathOrder: Box[] = this.getNodesInShortestPathOrder();
    for (let node of nodesInShortestPathOrder) {
      if (!this.isVisualizerRunning) break;
      if (!(node.isStart || node.isFinish)) {
        this.grid[node.row][node.col].class = 'traversed-point';
        await this.timer(this.runnerSpeed);
      }
    }
  }

  boxClicked(e: Box) {
    if (this.startPoint == null) {
      e.isVisited = true;
      e.class = 'start-point';
      e.distance = 0;
      e.isStart = true;
      this.startPoint = e;
      this.pathFinder.startPoint = e;
    } else if (this.endPoint == null) {
      e.class = 'end-point';
      e.isFinish = true;
      this.endPoint = e;
      this.pathFinder.endPoint = e;
    } else if (e.class != 'start-point' && e.class != 'end-point') {
      e.isWall = !e.isWall;
      e.class = e.isWall ? 'wall' : 'box';
    }
  }
  onmouseEnter(event: any, e: Box) {
    if (this.mousedown) this.boxClicked(e);
  }
  onmouseDouwn(event: any, e: Box) {
    event.preventDefault();
    if (event.button != 0) return false;
    this.mousedown = true;
    this.boxClicked(e);
    return true;
  }
  onmouseUp(event: any, e: Box) {
    this.mousedown = false;
  }
  getNodesInShortestPathOrder() {
    let curNode = this.endPoint;
    let nodesInShortestPathOrder: Box[] = [];
    while (curNode != null) {
      nodesInShortestPathOrder.unshift(curNode);
      curNode = curNode.prevNode;
    }
    return nodesInShortestPathOrder;
  }
}
