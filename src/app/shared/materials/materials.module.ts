import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const modules = [
  CommonModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatSliderModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialsModule { }
