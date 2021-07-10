export class Spot {
    row: number;
    col: number;
    isVisited : boolean = false;
    borderTop = "1px solid black";
    borderBottom = "1px solid black";
    borderLeft = "1px solid black";
    borderRight = "1px solid black";
    class : string = "";
    constructor(row:number,col:number){
        this.row = row;
        this.col = col;
      }
}
