import { Component, Input, OnInit } from '@angular/core';
import { Box } from '../box';

@Component({
  selector: 'app-box',
  template: `
  <div [ngClass]="boxVal.class"></div>
  `,
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() boxVal : Box = null;
  constructor() { }

  ngOnInit(): void {
  }

}
