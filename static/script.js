TABLE_SIZE = 15
CANVAS_SIZE = 800
STEP = CANVAS_SIZE / TABLE_SIZE;

var ctx;

class Board {
    constructor() {
        var table = []
        for (let i = 0; i < TABLE_SIZE; i++) {
            table[i] = []
            for (let j = 0; j < TABLE_SIZE; j++) {
                table[i][j] = -1
            }
        }
        this.table = table
    }

    addPiece(piece) {
        var [id,x,y] = piece.getParam()
        this.table[x][y] = id
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
}

function initApp() {
    drawTable()
    drawPiece(1,7,7)

    sendData()
}

function initApp() {
    drawTable()
    drawPiece(1,7,7)

    board = new Board()

    sendData(board.table)
}

function sendData(data) {
    fetch('motion',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({
            data: data,
        })
    })
    .then(data =>console.log(data))
    .catch(err => alert(err))
}

function getCtx() {
    const canvas = document.getElementById("canv");
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

function drawPiece(id,x,y) {
    ctx = getCtx();
    X = STEP * x - STEP
    Y = STEP * y - STEP
    
    ctx.fillRect(X,Y,STEP,STEP)
}