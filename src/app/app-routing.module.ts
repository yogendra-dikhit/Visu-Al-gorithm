import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MazeGeneratorComponent } from './maze-generator/maze-generator.component';
import { PathFindingVisualizerComponent } from './path-finding-visualizer/path-finding-visualizer.component';
import { SortingVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';

const routes: Routes = [
  { path:"", pathMatch:"full", component: SortingVisualizerComponent },
  { path:"path-finding", component: PathFindingVisualizerComponent },
  { path:"maze-generator", component: MazeGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
