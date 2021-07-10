import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BubbleSort,
  InsertionSort,
  MergeSort,
  QuickSort,
  SelectionSort,
  swap,
  partition,
  merge,
} from '../shared/Algorithms/sorting-algorithms';
import { SnackBarService } from '../shared/snack-bar.service';
import { Box } from '../shared/utils/BoxType';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.css'],
})
export class SortingVisualizerComponent implements OnInit {
  // boxes = ["500px","200px","700px","400px","100px","900px","300px","600px"];
  methods: string[] = ['Bubble', 'Insertion', 'Selection', 'Quick', 'Merge'];
  numberOfBoxes: number = 10;
  boxes: Box[] = [];
  method: string = '';
  runnerSpeed: number = 100;
  isVisualizerRunning: boolean = false;
  timer = () => new Promise((res) => setTimeout(res, this.runnerSpeed));
  @ViewChild('toolbar') toolBar: ToolbarComponent;
  BubbleSort: Function;
  InsertionSort: Function;
  SelectionSort: Function;
  QuickSort: Function;
  MergeSort: Function;
  swap: Function;
  partition: Function;
  merge: Function;
  constructor(private _snackBar: SnackBarService) {
    this.BubbleSort = BubbleSort;
    this.InsertionSort = InsertionSort;
    this.SelectionSort = SelectionSort;
    this.QuickSort = QuickSort;
    this.MergeSort = MergeSort;
    this.swap = swap;
    this.partition = partition;
    this.merge = merge;
  }

  ngOnInit(): void {
    this.setup();
  }

  changeSlider(numberOfBoxes: number) {
    this.numberOfBoxes = numberOfBoxes;
    this.boxes.splice(this.numberOfBoxes);
    this.setup();
  }
  changeRunnerSpeed(speedChanged: string) {
    switch (speedChanged) {
      case 'Slow':
        this.runnerSpeed = 500;
        break;
      case 'Medium':
        this.runnerSpeed = 250;
        break;
      case 'Fast':
        this.runnerSpeed = 100;
    }
  }
  changeRunningState(e: boolean) {
    this.isVisualizerRunning = e;
  }
  async RunSorter(method: string) {
    this.method = method;
    let sorter = this.method + 'Sort';
    switch (sorter) {
      case 'BubbleSort':
        await this.BubbleSort();
        break;
      case 'InsertionSort':
        await this.InsertionSort();
        break;
      case 'SelectionSort':
        await this.SelectionSort();
        break;
      case 'QuickSort':
        await this.QuickSort(0, this.boxes.length - 1);
        break;
      case 'MergeSort':
        await this.MergeSort(0, this.boxes.length - 1);
        break;
    }
    this.isVisualizerRunning = false;
    this.toolBar.changeRunningState(this.isVisualizerRunning);
  }

  setup() {
    for (let i = 0; i < this.numberOfBoxes; i++) {
      let temp = Math.floor(Math.random() * 1000);
      let box: Box = new Box(temp);
      if (!this.searchBox(box)) this.boxes[i] = box;
      else this.boxes[i] = new Box(Math.floor(Math.random() * 1000));
    }
  }
  searchBox(box: Box) {
    return this.boxes.find((temp) => temp.height == box.height);
  }
  getHeight(i: number) {
    return this.boxes[i].height * 0.5 + 'px';
  }
}
