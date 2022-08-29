var express = require("express");
var http = require("http");
var websocket = require("ws");
var indexRouter = require("./routes/index");
var stats = require("./Statistics");

var Board = require("./Board");
var Game = require("./Game");

var port = process.argv[2];
var app = express();

var server = http.createServer(app);
// const wss = new websocket.Server({ server })

app.use(express.static(__dirname + "/public"));

app.get("/game", indexRouter);
app.get("/splash", (req, res) => {
  res.render("splash.ejs", {
    gamesInitialized: stats.gamesStarted,
    gamesCompleted: stats.gamesCompleted,
    gamesAborted: stats.gamesAborted,
  });
});
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("splash.ejs", {
    gamesInitialized: stats.gamesStarted,
    gamesCompleted: stats.gamesCompleted,
    gamesAborted: stats.gamesAborted,
  });
});

// var websockets = {}

// var currentGame = new Game(stats.gamesStarted++)
// var newBoard = new Board()
// currentGame.board = newBoard
// currentGame.board.initialize()

// var connectionID = 0
// wss.on('connection', function connection(ws) {
//   let con = ws
//   con.id = connectionID++
//   let playerType = currentGame.addPlayer(con)
//   websockets[con.id] = currentGame

//   console.log('Player %s placed in game %s as %s', con.id, currentGame.id, playerType)

//   var message = {
//     msg: 'PLAYER_TYPE',
//     type: playerType
//   }

//   con.send(JSON.stringify(message))

//   if (currentGame.hasTwoPlayers()) {
//     if (currentGame.player1.readyState != 3)
//       currentGame.player1.send(JSON.stringify('GAME_STARTED'))
//     currentGame.player2.send(JSON.stringify('GAME_STARTED'))
//     currentGame = new Game(stats.gamesStarted++)
//     newBoard = new Board()
//     currentGame.board = newBoard
//     currentGame.board.initialize()
//   }

//   con.on('message', function incoming(message) {
//     let msgObj = JSON.parse(message)

//     let game = websockets[con.id]

//     let isPlayerA = (game.player1 === con);
//     var captured = false;
//     if (msgObj.msg === 'MOVE_MADE') {
//       if (isPlayerA) {
//         if (game.board.allowedMove(msgObj.from, msgObj.to, 'A')) {

//           if (game.board.canEat('red') === true) {

//             if (msgObj.from.x === msgObj.to.x + 2 || msgObj.from.x === msgObj.to.x - 2) {

//               game.board.updateBoard(msgObj.from, msgObj.to, 'A');
//               game.checkersLeft.black--;
//               var message = {
//                 msg: 'UPDATE_BOARD',
//                 board: game.board.rows,
//                 checkersLeft: game.checkersLeft
//               }
//               if (game.board.specificCanEat(msgObj.to, 'red'))
//                 message.captured = true;
//               else
//                 message.captured = false;

//               con.send(JSON.stringify(message))
//               game.player2.send(JSON.stringify(message))

//               if (game.checkersLeft.black === 0 || game.board.outOfMoves() === true) {
//                 con.send(JSON.stringify('PLAYER_A_WON'))
//                 game.player2.send(JSON.stringify('PLAYER_A_WON'))
//                 stats.gamesCompleted++;
//               }
//             }
//             else {
//               con.send(JSON.stringify('A_NOT_VALID_MOVE'))
//               game.player2.send(JSON.stringify('A_NOT_VALID_MOVE'))
//             }
//           }
//           else {
//             game.board.updateBoard(msgObj.from, msgObj.to, 'A');
//             var message = {
//               msg: 'UPDATE_BOARD',
//               board: game.board.rows,
//               checkersLeft: game.checkersLeft,
//               captured: false
//             }
//             con.send(JSON.stringify(message))
//             game.player2.send(JSON.stringify(message))

//             if (game.checkersLeft.black === 0 || game.board.outOfMoves() === true) {
//               game.setStatus('A_WON');

//               con.send(JSON.stringify('PLAYER_A_WON'))
//               game.player2.send(JSON.stringify('PLAYER_A_WON'))
//               stats.gamesCompleted++;
//             }
//           }
//         }
//         else {
//           con.send(JSON.stringify('A_NOT_VALID_MOVE'))
//           game.player2.send(JSON.stringify('A_NOT_VALID_MOVE'))
//         }
//       }

//       else {
//         if (game.board.allowedMove(msgObj.from, msgObj.to, 'B')) {

//           if (game.board.canEat('black') === true) {
//             if (msgObj.from.x === msgObj.to.x + 2 || msgObj.from.x === msgObj.to.x - 2) {
//               game.board.updateBoard(msgObj.from, msgObj.to, 'B');
//               game.checkersLeft.red--;
//               if (game.checkersLeft.red === 0) {
//                 game.setStatus('B_WON');
//                 con.send(JSON.stringify('PLAYER_B_WON'))
//                 game.player1.send(JSON.stringify('PLAYER_B_WON'))
//               }
//               var message = {
//                 msg: 'UPDATE_BOARD',
//                 board: game.board.rows,
//                 checkersLeft: game.checkersLeft
//               }
//               if (game.board.specificCanEat(msgObj.to, 'black'))
//                 message.captured = true;
//               else
//                 message.captured = false;

//               con.send(JSON.stringify(message))
//               game.player1.send(JSON.stringify(message))

//               if (game.checkersLeft.red === 0 || game.board.outOfMoves() === true) {
//                 con.send(JSON.stringify('PLAYER_B_WON'))
//                 game.player1.send(JSON.stringify('PLAYER_B_WON'))
//                 stats.gamesCompleted++;

//               }
//             }
//             else {
//               con.send(JSON.stringify('B_NOT_VALID_MOVE'))
//               game.player1.send(JSON.stringify('B_NOT_VALID_MOVE'))
//             }
//           }
//           else {
//             game.board.updateBoard(msgObj.from, msgObj.to, 'B');
//             if (game.checkersLeft.red === 0) {
//               con.send(JSON.stringify('PLAYER_B_WON'))
//               game.player1.send(JSON.stringify('PLAYER_B_WON'))
//             }
//             var message = {
//               msg: 'UPDATE_BOARD',
//               board: game.board.rows,
//               checkersLeft: game.checkersLeft,
//               captured: false
//             }

//             con.send(JSON.stringify(message))
//             game.player1.send(JSON.stringify(message))

//             if (game.checkersLeft.red === 0 || game.board.outOfMoves() === true) {
//               con.send(JSON.stringify('PLAYER_B_WON'))
//               game.player1.send(JSON.stringify('PLAYER_B_WON'))
//               stats.gamesCompleted++;

//             }
//           }

//         } else {
//           con.send(JSON.stringify('B_NOT_VALID_MOVE'))
//           game.player1.send(JSON.stringify('B_NOT_VALID_MOVE'))
//         }
//       }
//     }
//   })

//   con.on('close', function (code) {
//     console.log(con.id + ' disconnected...')

//     let game = websockets[con.id]
//     if (code === 1001) {

//       if (game.isValidTransition(game.GameState, 'ABORTED')) {
//         game.setStatus('ABORTED')
//         stats.gamesAborted++
//         console.log("hi");

//         game.player1.close()
//         game.player1 = null

//         game.player2.close()
//         game.player2 = null
//       }
//     }
//   })
// })

server.listen(process.env.PORT || 3000);
