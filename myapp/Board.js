function Tile (row, column) {
  this.x = row
  this.y = column
  this.hasChecker = false
  this.colourOfChecker
  this.isKing = false

  // this.isEmpty=function(){
  //     return ($.trim($("#"+this.row+this.column).html())==='');
  // }
}
Tile.prototype.getColor = function () {
  if (this.hasChecker === false) { return undefined } else { return this.colourOfChecker }
}

Tile.prototype.isEmpty = function () {
  if (this.x < 0 || this.x > 7 || this.y < 0 || this.x > 7) { return false }
  return (!this.hasChecker)
}

Tile.prototype.hasAllowedMove = function (t, x) {
  var me = x
  if (t.getColor() === 'red' || t.isKing === true) {
    if (me.getTile(String(t.x - 1) + String(t.y + 1)) !== undefined && me.getTile(String(t.x - 1) + String(t.y + 1)).isEmpty() === true) { return true }
    if (me.getTile(String(t.x - 1) + String(t.y - 1)) !== undefined && me.getTile(String(t.x - 1) + String(t.y - 1)).isEmpty() === true) { return true }
    if (me.getTile(String(t.x - 2) + String(t.y + 2)) !== undefined && me.getTile(String(t.x - 2) + String(t.y + 2)).isEmpty() === true) { return true }
    if (me.getTile(String(t.x - 2) + String(t.y - 2)) !== undefined && me.getTile(String(t.x - 2) + String(t.y - 2)).isEmpty() === true) { return true }
  } else if (t.isKing === true || t.getColor() === 'black') {
    if (me.getTile(String(t.x + 1) + String(t.y + 1)) !== undefined && me.getTile(String(t.x + 1) + String(t.y + 1)).isEmpty() === true) { return true }
    if (me.getTile(String(t.x + 1) + String(t.y - 1)) !== undefined && me.getTile(String(t.x + 1) + String(t.y - 1)).isEmpty() === true) { return true }
    if (me.getTile(String(t.x + 2) + String(t.y + 2)) !== undefined && me.getTile(String(t.x + 2) + String(t.y + 2)).isEmpty() === true) { return true }
    if (me.getTile(String(t.x + 2) + String(t.y - 2)) !== undefined && me.getTile(String(t.x + 2) + String(t.y - 2)).isEmpty() === true) { return true }
  }

  return false
}

function Board () {
  this.rows = []
}

Board.prototype.initialize = function () {
  this.rows.push([new Tile(0, 0), new Tile(0, 1), new Tile(0, 2), new Tile(0, 3), new Tile(0, 4), new Tile(0, 5), new Tile(0, 6), new Tile(0, 7)])
  this.rows.push([new Tile(1, 0), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)])
  this.rows.push([new Tile(2, 0), new Tile(2, 1), new Tile(2, 2), new Tile(2, 3), new Tile(2, 4), new Tile(2, 5), new Tile(2, 6), new Tile(2, 7)])
  this.rows.push([new Tile(3, 0), new Tile(3, 1), new Tile(3, 2), new Tile(3, 3), new Tile(3, 4), new Tile(3, 5), new Tile(3, 6), new Tile(3, 7)])
  this.rows.push([new Tile(4, 0), new Tile(4, 1), new Tile(4, 2), new Tile(4, 3), new Tile(4, 4), new Tile(4, 5), new Tile(4, 6), new Tile(4, 7)])
  this.rows.push([new Tile(5, 0), new Tile(5, 1), new Tile(5, 2), new Tile(5, 3), new Tile(5, 4), new Tile(5, 5), new Tile(5, 6), new Tile(5, 7)])
  this.rows.push([new Tile(6, 0), new Tile(6, 1), new Tile(6, 2), new Tile(6, 3), new Tile(6, 4), new Tile(6, 5), new Tile(6, 6), new Tile(6, 7)])
  this.rows.push([new Tile(7, 0), new Tile(7, 1), new Tile(7, 2), new Tile(7, 3), new Tile(7, 4), new Tile(7, 5), new Tile(7, 6), new Tile(7, 7)])

  this.rows[0][1].hasChecker = true; this.rows[0][1].colourOfChecker = 'black'
  this.rows[0][3].hasChecker = true; this.rows[0][3].colourOfChecker = 'black'
  this.rows[0][5].hasChecker = true; this.rows[0][5].colourOfChecker = 'black'
  this.rows[0][7].hasChecker = true; this.rows[0][7].colourOfChecker = 'black'
  this.rows[1][0].hasChecker = true; this.rows[1][0].colourOfChecker = 'black'
  this.rows[1][2].hasChecker = true; this.rows[1][2].colourOfChecker = 'black'
  this.rows[1][4].hasChecker = true; this.rows[1][4].colourOfChecker = 'black'
  this.rows[1][6].hasChecker = true; this.rows[1][6].colourOfChecker = 'black'
  this.rows[2][1].hasChecker = true; this.rows[2][1].colourOfChecker = 'black'
  this.rows[2][3].hasChecker = true; this.rows[2][3].colourOfChecker = 'black'
  this.rows[2][5].hasChecker = true; this.rows[2][5].colourOfChecker = 'black'
  this.rows[2][7].hasChecker = true; this.rows[2][7].colourOfChecker = 'black'

  this.rows[5][0].hasChecker = true; this.rows[5][0].colourOfChecker = 'red'
  this.rows[5][2].hasChecker = true; this.rows[5][2].colourOfChecker = 'red'
  this.rows[5][4].hasChecker = true; this.rows[5][4].colourOfChecker = 'red'
  this.rows[5][6].hasChecker = true; this.rows[5][6].colourOfChecker = 'red'
  this.rows[6][1].hasChecker = true; this.rows[6][1].colourOfChecker = 'red'
  this.rows[6][3].hasChecker = true; this.rows[6][3].colourOfChecker = 'red'
  this.rows[6][5].hasChecker = true; this.rows[6][5].colourOfChecker = 'red'
  this.rows[6][7].hasChecker = true; this.rows[6][7].colourOfChecker = 'red'
  this.rows[7][0].hasChecker = true; this.rows[7][0].colourOfChecker = 'red'
  this.rows[7][2].hasChecker = true; this.rows[7][2].colourOfChecker = 'red'
  this.rows[7][4].hasChecker = true; this.rows[7][4].colourOfChecker = 'red'
  this.rows[7][6].hasChecker = true; this.rows[7][6].colourOfChecker = 'red'
}

Board.prototype.getTile = function (id) {
  
  if(id.charAt(0)=='-')
    return undefined;
  if(id.charAt(1)=='-')
    return undefined;
  if(parseInt(id.charAt(0))>7)
    return undefined;
  if(parseInt(id.charAt(0))>7)
    return undefined;
  return this.rows[parseInt(id.charAt(0))][parseInt(id.charAt(1))]
}

// Board.prototype.checkerCanMove = function (id) {

//     var t = this.getTile(id);
//     if (t.getColor() === "red") {

//     }
// }

Board.prototype.outOfMoves = function () {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (this.getTile(String(i) + String(j)).hasChecker === true ) {
        if (this.getTile(String(i) + String(j)).hasAllowedMove(this.getTile(String(i) + String(j)), this) === true) { return false }
      }
    }
  }
  return true
}

Board.prototype.canEat = function (color) {

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (this.getTile(String(i) + String(j)).hasChecker === true && this.getTile(String(i) + String(j)).getColor() === color) {
        if (color === 'red'){
          if (this.getTile(String(i-2) + String(j+2)) !== undefined && this.getTile(String(i - 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'black' ) { return true }
          if (this.getTile(String(i - 2) + String(j - 2)) !== undefined && this.getTile(String(i - 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'black' ) { return true }
        }
        if(color==='red' && this.getTile(String(i) + String(j)).isKing===true){
          if (this.getTile(String(i + 2) + String(j - 2)) !== undefined && this.getTile(String(i + 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'black' ) { return true }
          if (this.getTile(String(i + 2) + String(j + 2)) !== undefined && this.getTile(String(i + 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'black' ) { return true }

        }
        if (color === 'black'){
          if (this.getTile(String(i + 2) + String(j + 2)) !== undefined && this.getTile(String(i + 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'red' ) { return true }
          if (this.getTile(String(i + 2) + String(j - 2)) !== undefined && this.getTile(String(i + 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'red' ) { return true }
        }
        if(color=='black' && this.getTile(String(i) + String(j)).isKing===true){
          if (this.getTile(String(i - 2) + String(j - 2)) !== undefined && this.getTile(String(i - 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'red' ) { return true }
          if (this.getTile(String(i - 2) + String(j + 2)) !== undefined && this.getTile(String(i - 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'red' ) { return true }

        }
      }
    }
  }
  return false;
}

Board.prototype.specificCanEat=function(t,color){
  var i=t.x;
  var j=t.y;
  if (color === 'red'){
    if (this.getTile(String(i-2) + String(j+2)) !== undefined && this.getTile(String(i - 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'black' ) { return true }
    if (this.getTile(String(i - 2) + String(j - 2)) !== undefined && this.getTile(String(i - 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'black' ) { return true }
  }
  if(color==='red' && this.getTile(String(i) + String(j)).isKing===true){
    if (this.getTile(String(i + 2) + String(j - 2)) !== undefined && this.getTile(String(i + 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'black' ) { return true }
    if (this.getTile(String(i + 2) + String(j + 2)) !== undefined && this.getTile(String(i + 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'black' ) { return true }

  }
  if (color === 'black'){
    if (this.getTile(String(i + 2) + String(j + 2)) !== undefined && this.getTile(String(i + 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'red' ) { return true }
    if (this.getTile(String(i + 2) + String(j - 2)) !== undefined && this.getTile(String(i + 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i+2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'red' ) { return true }
  }
  if(color=='black' && this.getTile(String(i) + String(j)).isKing===true){
    if (this.getTile(String(i - 2) + String(j - 2)) !== undefined && this.getTile(String(i - 2) + String(j - 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j-2) / 2))).getColor() === 'red' ) { return true }
    if (this.getTile(String(i - 2) + String(j + 2)) !== undefined && this.getTile(String(i - 2) + String(j + 2)).isEmpty() === true && this.getTile(String(Math.abs((i + i-2) / 2)) + String(Math.abs((j + j+2) / 2))).getColor() === 'red' ) { return true }

}
}

Board.prototype.allowedMove = function (t1, t2, currentplayer) {
  if (currentplayer === 'A') {

    if (this.getTile(String(t1.x) + String(t1.y)).getColor() === 'black') {
      return false
    }

    if (this.getTile(String(t2.x) + String(t2.y)).isEmpty() === false) { return false }

    if (t2.x === (t1.x - 1)) {
      if (t2.y === (t1.y + 1) || t2.y === (t1.y - 1)) {
        return true
      }
    }
    if (this.getTile(String(t1.x) + String(t1.y)).isKing === true) {
      if (t2.x === (t1.x + 1)) {
        if (t2.y === (t1.y + 1) || t2.y === (t1.y - 1)) {
          return true
        }
      }
    }
    if (t2.x === (t1.x - 2)) {
      if ((t2.y === (t1.y - 2) || t2.y === (t1.y + 2)) && this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).getColor() === 'black') {
        return true
      }
    }
    if (this.getTile(String(t1.x) + String(t1.y)).isKing === true) {
      if (t2.x === (t1.x + 2)) {
        if ((t2.y === (t1.y - 2) || t2.y === (t1.y + 2)) && this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).getColor() === 'black') {
          return true
        }
      }
    }

    return false
  } else {

    if (this.getTile(String(t1.x) + String(t1.y)).getColor() === 'red') { return false }

    if (this.getTile(String(t2.x) + String(t2.y)).isEmpty() === false) { return false }

    if (t2.x === (t1.x + 1)) {
      if (t2.y === (t1.y + 1) || t2.y === (t1.y - 1)) {
        return true
      }
    }
    if (this.getTile(String(t1.x) + String(t1.y)).isKing === true) {
      if (t2.x === (t1.x - 1)) {
        if (t2.y === (t1.y + 1) || t2.y === (t1.y - 1)) {
          return true
        }
      }
    }
    if (t2.x === (t1.x + 2)) {
      if ((t2.y === (t1.y - 2) || t2.y === (t1.y + 2)) && this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).getColor() === 'red') {
        return true
      }
    }
    if (this.getTile(String(t1.x) + String(t1.y)).isKing === true) {
      if (t2.x === (t1.x - 2)) {
        if ((t2.y === (t1.y - 2) || t2.y === (t1.y + 2)) && this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).getColor() === 'red') {
          return true
        }
      }
    }
    return false
  }
}

Board.prototype.updateBoard = function (t1, t2, currentplayer) {
  this.getTile(String(t1.x) + String(t1.y)).hasChecker = false
  this.getTile(String(t2.x) + String(t2.y)).hasChecker = true
  if (this.getTile(String(t1.x) + String(t1.y)).isKing === true) {
    this.getTile(String(t2.x) + String(t2.y)).isKing = true
    this.getTile(String(t1.x) + String(t1.y)).isKing = false
  }
  if (currentplayer === 'A') {
    this.getTile(String(t2.x) + String(t2.y)).colourOfChecker = 'red'
    if (t2.x === 0) { this.getTile(String(t2.x) + String(t2.y)).isKing = true }
  } else {
    this.getTile(String(t2.x) + String(t2.y)).colourOfChecker = 'black'
    if (t2.x === 7) { this.getTile(String(t2.x) + String(t2.y)).isKing = true }
  }

  if (t2.x === t1.x - 2 || t2.x === t1.x + 2) {
    this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).hasChecker = false
    if(this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).isKing==true)
    this.getTile(String(Math.abs((t1.x + t2.x) / 2)) + String(Math.abs((t1.y + t2.y) / 2))).isKing=false;
    return true
  }

  return false
}

module.exports = Board
