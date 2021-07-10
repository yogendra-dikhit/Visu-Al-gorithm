import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  horizontalPos:MatSnackBarHorizontalPosition = "end";
  verticalPos:MatSnackBarVerticalPosition = "top";

  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar( message:string , styleClass: string){
    this._snackBar.open(message , "", {
      duration: 1000,
      horizontalPosition : this.horizontalPos,
      verticalPosition : this.verticalPos,
      panelClass : ['mat-toolbar',styleClass]
    });
  }
  
}
