TABLE_SIZE = 8
CANVAS_SIZE = 800
STEP = CANVAS_SIZE / TABLE_SIZE;

var room_id = Number(location.pathname.split('/').at(-1))

var board;
var boardNew;

var ctx;

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
                this.table[i][j] = new Piece(prm['id'],prm['x'],prm['y'])
            }
        }   
    }
}

class Piece {
    constructor(id,x,y) {
        this.id = id
        this.x = x
        this.y = y
    }

    getParam() {
        return [this.id,this.x,this.y]
    }
    getType() {
        return this.id
    }
}


function initApp() {
    getCnv().addEventListener('mousedown', function(e) {
    setPiece(e)
    })

    board = new Board()
    sendData('/update', {'board':board,'room_id':room_id})

    setInterval(update, 100)
}

function webUpdate() {
    // var boardNew;
    response = fetch('/fetch',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'room_id':room_id})
    })
    .then(response => response.json())
    .then(data => boardNew = data)

    board.setBoard(boardNew.response.table)
}

function update() {
    webUpdate()
    draw()
}

function sendData(url,data) {
    response = fetch(url,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify(data)
    })
    // .then(response=> response.json())
    // .then(data =>console.log(data))
    return 1
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
    
    ctx.fillRect(X,Y,STEP,STEP)
}

function setPiece(e) {
    [XPos, YPos] = getMousePos(e)

    var [XCell, YCell] = [Math.floor(XPos/STEP),Math.floor(YPos/STEP)]
    var piece = new Piece(0,XCell,YCell)
    
    // drawPiece(piece)
    board.addPiece(piece)
    sendData('/update',{'board':board,'room_id':room_id})
}

function draw() {
    context = getCtx()
    canvas = getCnv()
    context.clearRect(0, 0, canvas. width, canvas. height);
    
    drawTable()
    drawBoard()
}