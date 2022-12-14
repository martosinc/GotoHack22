TABLE_SIZE = 16
CANVAS_SIZE = 800
STEP = CANVAS_SIZE / TABLE_SIZE;

var room_id = Number(location.pathname.split('/').at(-1))

var player;
var board;
var engine;

class Board {
    constructor() {
        var table = []
        for (let i = 0; i < TABLE_SIZE; i++) {
            table[i] = []
            for (let j = 0; j < TABLE_SIZE; j++) {
                table[i][j] = new Piece(-1,i,j)
            }
        }
        this.table = table
        this.playerMove = 0
    }

    addPiece(piece) {
        var [id,x,y] = piece.getParam()
        this.table[x][y] = piece
    }

    setBoard(board) {
        for (let i = 0; i < TABLE_SIZE; i++) {
            for (let j = 0; j < TABLE_SIZE; j++) {
                var prm = board[i][j]
                this.table[i][j] = new Piece(prm['id'],prm['x'],prm['y'],prm['player'])
            }
        }   
    }
}

class Piece {
    constructor(id,x,y,player_id) {
        this.id = id
        this.x = x
        this.y = y

        this.player = player_id
    }

    getParam() {
        return [this.id,this.x,this.y]
    }
    getType() {
        return this.id
    }
}

function exit_room() {
    response = fetch('/exit_room',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'room_id': room_id})
    })
}

function initApp() {
    getCnv().addEventListener('mousedown', function(e) {
    setPiece(e)
    })

    window.onbeforeunload = function (event) {exit_room()}

    board = new Board()
    engine = new Engine()
    sendData('/load', {'board':board,'room_id':room_id})

    setInterval(update, 100)
}

function webUpdate() {
    response = fetch('/fetch',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'room_id':room_id})
    })
    .then(response => response.json())
    .then(data => board.setBoard(data.response.table))
}

function update() {
    webUpdate()
    draw()
}

function setPlayer(url,id) {
    if (url != '/load')
        return
    player = id;
    console.log(player)
}

function sendData(url,data) {
    response = fetch(url,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response=> response.json())
    .then(data => setPlayer(url, data['response']))
    return 
}

function getMousePos(event) {
    canvas = getCnv()
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x,y]
}

function getCnv() {
    const canvas = document.getElementById("canv")
    return canvas
}

function getCtx() {
    const canvas = getCnv()
    return canvas.getContext('2d');
}

function drawTable() {
    ctx = getCtx();
    for (let i = 0; i < TABLE_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(STEP*i,0);
        ctx.lineTo(STEP*i,CANVAS_SIZE);
        ctx.closePath();
        ctx.stroke()
    }
    for (let i = 0; i < TABLE_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(0,STEP*i);
        ctx.lineTo(CANVAS_SIZE,STEP*i);
        ctx.closePath();
        ctx.stroke()
    }
}

function drawBoard() {
    ctx = getCtx()

    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (board.table[i][j].getType() != -1) {
                drawPiece(board.table[i][j])
            }
        }
    }
}

function drawPiece(piece) {
    [id,x,y] = piece.getParam()
    ctx = getCtx();
    X = STEP * x
    Y = STEP * y

    if (piece.player == 1) {
        ctx.fillStyle = 'black';
    } else {
        ctx.fillStyle = 'red';
    }
    console.log(player)
    
    ctx.fillRect(X,Y,STEP,STEP)
}

function setPiece(e) {
    [XPos, YPos] = getMousePos(e)

    var [XCell, YCell] = [Math.floor(XPos/STEP),Math.floor(YPos/STEP)]
    var piece = new Piece(0,XCell,YCell,player)
    
    // drawPiece(piece)
    board.addPiece(piece)

    engine.setBoard(board)
    board.setBoard(engine.computeBorder(XCell,YCell))

    sendData('/update',{'board':board,'room_id':room_id})

}

function draw() {
    context = getCtx()
    canvas = getCnv()
    context.clearRect(0, 0, canvas. width, canvas. height);
    
    drawTable()
    drawBoard()
}