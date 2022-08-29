$(function () {
    if (document.cookie == "")
        document.cookie = 'count=1';
    else {
        let current = Boolean(sessionStorage.getItem('session'));
        if (!current)
            document.cookie = 'count=' + String(parseInt(document.cookie.substring(6)) + 1);
    }

    $("#cookie-info").append('<p>This page was loaded by you ' + document.cookie.substring(6) + ' times!');


});


function GameState(socket) {
    // this.playerColor=playerColor;
    this.socket = socket
    this.player
    this.myturn = false
    this.updateGame = function (from, to) {
        var message = {}
        message.msg = 'MOVE_MADE'
        message.from = from
        message.to = to
        

        socket.send(JSON.stringify(message))
    }
    this.capturedLastTurn=false;

    this.updateBoard = function (board) {
        for (var i = 0; i < 8; i++) {
            for (j = 0; j < 8; j++) {
                if (board[i][j].hasChecker == false) {
                    $('#' + i + j).empty()
                } else {
                    if (board[i][j].colourOfChecker == 'red') {
                        $('#' + i + j).empty()
                        if (board[i][j].isKing == true) {
                            $('#' + i + j).append('<img src="images/red-king.png">')
                        }
                        else { $('#' + i + j).append('<img src="images/red-checker.png">') }

                    } else {
                        $('#' + i + j).empty()
                        if (board[i][j].isKing == true) {
                            $('#' + i + j).append('<img src="images/black-king.png">')
                        }
                        else { $('#' + i + j).append('<img src="images/black-checker.png">') }
                    }
                }
            }
        }

    }
    this.fullscreen = function () {

        if ((document.fullScreenElement &&
            document.fullScreenElement !== null) || 
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {

            if (document.documentElement.requestFullScreen) {

                document.documentElement.requestFullScreen();

            } else
                if (document.documentElement.mozRequestFullScreen) {

                    document.documentElement.mozRequestFullScreen();

                } else
                    if (document.documentElement.webkitRequestFullScreen) {

                        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);

                    }

        } else {

            if (document.cancelFullScreen) {

                document.cancelFullScreen();

            } else
                if (document.mozCancelFullScreen) {

                    document.mozCancelFullScreen();

                } else
                    if (document.webkitCancelFullScreen) {

                        document.webkitCancelFullScreen();
                    }
        }
    }
}

var firstClick = true
var selectedTile = {
    x: undefined,
    y: undefined
}
function Board(gs) {
    this.initialize = function () {

        $("#fs").on('click', gs.fullscreen);

        $('.tile').on('click', function (event) {
            if (gs.myturn == true) {
                var id = String(event.currentTarget.id)

                if (firstClick == true) {
                    if ($('#' + id).is(':empty') === false) {
                        selectedTile.x = parseInt(id.charAt(0))
                        selectedTile.y = parseInt(id.charAt(1))

                        firstClick = false
                    }
                } else {
                    gs.updateGame(selectedTile, { x: parseInt(id.charAt(0)), y: parseInt(id.charAt(1)) })
                    firstClick = true
                }
            }
        })
    }
}

(function setup() {
    var socket = new WebSocket('ws://localhost:3000')
    var gs = new GameState(socket)
    var board = new Board(gs)
    board.initialize()

    socket.onmessage = function (event) {
        let incomingMsg = JSON.parse(event.data)

        if (incomingMsg.msg === 'PLAYER_TYPE') {



            if (incomingMsg.type == 'A') {
                gs.player = 'red'
                gs.usersAccessed++
                $('#waiting').show();
                $('#w').addClass("comeDown");
                $('#f').addClass("comeUp");
                $('#p').addClass("comeDown");
            } else {
                gs.player = 'black'
                gs.usersAccessed++
            }



        }

        if (incomingMsg === 'GAME_STARTED') {
            $('#waiting').hide();

            if (gs.player == 'red') {
                gs.myturn = true
                $('#info').text("It's your turn")

            } else {
                gs.myturn = false
                $('#info').text("It's the other player's turn")
            }
        }

        if (incomingMsg.msg === 'UPDATE_BOARD') {
            if(incomingMsg.captured==false){
                if (gs.myturn == true) {
                    gs.myturn = false
                    $('#info').text("It's the other player's turn")
    
                } else {
                    gs.myturn = true
                    $('#info').text("It's your turn")
                }
            }
            

            $("#redcount").text(12 - incomingMsg.checkersLeft.red)
            $("#blackcount").text(12 - incomingMsg.checkersLeft.black)


            gs.updateBoard(incomingMsg.board)
        }

        if (incomingMsg === 'A_NOT_VALID_MOVE') {
            if (gs.player == 'red') {
                $('#info').text("That was not a valid move.");

            }
            
            

        }
        if (incomingMsg === 'B_NOT_VALID_MOVE') {
            if (gs.player == 'black') {
                $('#info').text("That was not a valid move.")

            }
            
            

        }

        if (incomingMsg === 'PLAYER_A_WON') {
            window.alert('Player 1 won the game!')
        }

        if (incomingMsg === 'PLAYER_B_WON') {
            window.alert('Player 1 won the game!')
        }
    }
}
)()
