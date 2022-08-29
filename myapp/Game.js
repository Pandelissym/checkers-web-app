var Game = function (GameID) {
  this.player1 = null
  this.player2 = null
  this.id = GameID
  this.board = null
  this.GameState = '0 JOINED'
  this.checkersLeft = {
    red: 12,
    black: 12
  }
}

Game.prototype.transitionStates = {}
Game.prototype.transitionStates['0 JOINED'] = 0
Game.prototype.transitionStates['1 JOINED'] = 1
Game.prototype.transitionStates['2 JOINED'] = 2
Game.prototype.transitionStates['A WON'] = 3
Game.prototype.transitionStates['B WON'] = 4
Game.prototype.transitionStates['ABORTED'] = 5


Game.prototype.getBoard = function () {
  return this.board
}

Game.prototype.isValidState = function (s) {
  return (s in Game.prototype.transitionStates)
}

Game.prototype.transitionMatrix = [
  [0, 1, 0, 0, 0, 0], // 0 JOINED
  [1, 0, 1, 0, 0, 0], // 1 JOINED
  [0, 0, 0, 1, 1, 1], // 2 JOINED (note: once we have two players, there is no way back!)
  [0, 0, 0, 0, 0, 0], // A WON
  [0, 0, 0, 0, 0, 0], // B WON
  [0, 0, 0, 0, 0, 0] // ABORTED
]

Game.prototype.setStatus = function (newStatus) {
  console.assert(typeof newStatus === 'string', '%s: Expecting a string, got a %s', arguments.callee.name, typeof newStatus)

  if (Game.prototype.isValidState(newStatus) && Game.prototype.isValidTransition(this.GameState, newStatus)) {
    this.GameState = newStatus
    console.log('[STATUS] %s', this.GameState)
  } else {
    return new Error('Impossible status change from %s to %s', this.GameState, newStatus)
  }
}

Game.prototype.isValidTransition = function (from, to) {
  console.assert(typeof from === 'string', '%s: Expecting a string, got a %s', arguments.callee.name, typeof from)
  console.assert(typeof to === 'string', '%s: Expecting a string, got a %s', arguments.callee.name, typeof to)
  console.assert(from in Game.prototype.transitionStates == true, '%s: Expecting %s to be a valid transition state', arguments.callee.name, from)
  console.assert(to in Game.prototype.transitionStates == true, '%s: Expecting %s to be a valid transition state', arguments.callee.name, to)

  let i, j
  if (!(from in Game.prototype.transitionStates)) {
    return false
  } else {
    i = Game.prototype.transitionStates[from]
  }

  if (!(to in Game.prototype.transitionStates)) {
    return false
  } else {
    j = Game.prototype.transitionStates[to]
  }

  return (Game.prototype.transitionMatrix[i][j] > 0)
}

Game.prototype.addPlayer = function (p) {
  console.assert(p instanceof Object, '%s: Expecting an object (WebSocket), got a %s', arguments.callee.name, typeof p)

  if (this.GameState != '0 JOINED' && this.GameState != '1 JOINED') {
    return new Error('Invalid call to addPlayer, current state is %s', this.GameState)
  }

  /*
     * revise the game state
     */
  var error = this.setStatus('1 JOINED')

  if (this.player1 == null) {
    this.player1 = p
    return 'A'
  } else {
    this.player2 = p
    this.setStatus('2 JOINED')
    return 'B'
  }
}

Game.prototype.hasTwoPlayers = function () {
  return (this.GameState == '2 JOINED')
}

module.exports = Game
