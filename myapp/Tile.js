function Tile(row, column){

    this.row=row;
    this.column=column;
    this.hasChecker=false;
    this.colourOfChecker;
    this.isKing=false;

     // this.isEmpty=function(){
    //     return ($.trim($("#"+this.row+this.column).html())=='');
    // }
  
}

Tile.prototype.isEmpty=function (){
    return (!this.hasChecker);
}

Tile.prototype.getRow=function(){
    return this.row;
}

Tile.prototype.getColumn=function(){
    return this.column;
}

module.exports=Tile;