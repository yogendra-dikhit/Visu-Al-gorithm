import { Component, OnInit, ViewChild } from '@angular/core';
import { MazeGenerator } from '../shared/Algorithms/maze-generation-algorithms';
import { SnackBarService } from '../shared/snack-bar.service';
import { Spot } from '../shared/spot';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-maze-generator',
  templateUrl: './maze-generator.component.html',
  styleUrls: ['./maze-generator.component.css'],
})
export class MazeGeneratorComponent implements OnInit {
  @ViewChild('toolbar') toolBar: ToolbarComponent;
  numberOfRows: number = 20;
  numberOfColumns: number = 50;
  grid: Array<Array<Spot>> = [];
  methods: string[] = ['Recurrsive DFS', 'Division'];
  method: string = '';
  isVisualizerRunning: boolean = false;
  runnerSpeed: number = 100;
  sliderVisibility: string = 'none';
  mazeGenerator: MazeGenerator;
  constructor(private _snackBar: SnackBarService) {}
  ngOnInit(): void {
    this.setup();
  }
  setup() {
    if (this.isVisualizerRunning) {
      this._snackBar.openSnackBar('Visualizer still running', 'mat-warn');
      return;
    }
    this.grid = [];
    for (let i = 0; i < this.numberOfRows; i++) {
      this.grid[i] = Array();
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.grid[i].push(new Spot(i, j));
      }
    }
    this.mazeGenerator = new MazeGenerator(this.grid);
  }
  changeRunnerSpeed(speedChanged: string) {
    switch (speedChanged) {
      case 'Slow':
        this.runnerSpeed = 250;
        break;
      case 'Medium':
        this.runnerSpeed = 100;
        break;
      case 'Fast':
        this.runnerSpeed = 50;
    }
    this.mazeGenerator.runnerSpeed = this.runnerSpeed;
  }
  changeRunningState(e: boolean) {
    this.isVisualizerRunning = e;
    this.mazeGenerator.isVisualizerRunning = this.isVisualizerRunning;
  }
  async RunVisualizer(e: string) {
    this.method = e;
    switch (this.method) {
      case 'Recurrsive DFS':
        await this.mazeGenerator.ExecDFS();
        break;
      case 'Division':
        await this.mazeGenerator.execDivision();
        break;
    }
    this.isVisualizerRunning = false;
    this.toolBar.changeRunningState(this.isVisualizerRunning);
  }
}
