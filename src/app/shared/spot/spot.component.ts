import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../spot';

@Component({
  selector: 'app-spot',
  template: `
    <div [ngStyle]="{'border-top':spotVal.borderTop , 'border-bottom':spotVal.borderBottom , 'border-left':spotVal.borderLeft , 'border-right':spotVal.borderRight}"
    [ngClass]="spotVal.class"></div>
  `,
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {
  @Input() spotVal : Spot = null;
  constructor() { }

  ngOnInit(): void {
  }

}
