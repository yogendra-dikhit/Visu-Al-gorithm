import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/materials/materials.module';
import { FormsModule } from '@angular/forms';
import { SortingVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';
import { PathFindingVisualizerComponent } from './path-finding-visualizer/path-finding-visualizer.component';
import { BoxComponent } from './shared/box/box.component';
import { SnackBarService } from './shared/snack-bar.service';
import { MazeGeneratorComponent } from './maze-generator/maze-generator.component';
import { SpotComponent } from './shared/spot/spot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolbarComponent,
    SortingVisualizerComponent,
    PathFindingVisualizerComponent,
    BoxComponent,
    MazeGeneratorComponent,
    SpotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
