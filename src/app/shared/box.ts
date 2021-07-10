export class Box {
    isVisited : boolean = false;
    isStart : boolean = false;
    isFinish : boolean = false;
    isWall : boolean = false;
    distance : number = Infinity;
    prevNode : any = null;
    class : string = 'box';
    col: number;
    row: number;
    fScore : number =0;
    gScore : number =0;
    hScore : number =0;
    constructor(row:number,col:number){
      this.row = row;
      this.col = col;
    }
  }
