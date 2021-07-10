import { Component, OnInit , Output , EventEmitter, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  numberOfBoxes :number = 10;
  method :string = "";
  runnerSpeeds : string[] = ["Slow","Medium","Fast"];
  runnerSpeed : string = "Medium";
  isVisualizerRunning: boolean = false;
  sliderColor : ThemePalette = 'primary';
  @Input() methods : String[] = [];
  @Input() isSliderVisible : string = "block";
  @Output() onReset = new EventEmitter();
  @Output() onChangeSlider = new EventEmitter();
  @Output() onRunVisualizer = new EventEmitter();
  @Output() onRunnerSpeedChange = new EventEmitter();
  @Output() onChangeRunningState = new EventEmitter();

  constructor(private _snackBar:SnackBarService) { }

  ngOnInit(): void {
  }

  Reset(){
    this.onReset.emit();
  }
  StopVisualizer(){
    this.isVisualizerRunning = false;
    this.onChangeRunningState.emit(this.isVisualizerRunning);
  }
  public changeRunningState(state){
    this.isVisualizerRunning = state;
  }
  RunVisualizer(){
    if(this.method == ""){
      this._snackBar.openSnackBar("Please Select a Method!!","mat-warn");
      return;
    }
    this.isVisualizerRunning = true;
    this.onChangeRunningState.emit(this.isVisualizerRunning);
    this.onRunVisualizer.emit(this.method);
  }
  getMethodName(method:string){
    return method+" Sort";
  }
  changeSlider(){
    this.onChangeSlider.emit(String(this.numberOfBoxes));
  }
  speedChanged(e:any){
    this.onRunnerSpeedChange.emit(e.value);
  }
}
