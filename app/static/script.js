TABLE_SIZE = 16
CANVAS_SIZE = 800
STEP = CANVAS_SIZE / TABLE_SIZE;

var room_id = Number(location.pathname.split('/').at(-1))

var selectedCellX = -1;
var selectedCellY = -1;
var board

var engine
var player


function initApp() {
    board = new Board()
    engine = new Engine()
    loadBoard()

    getCnv().addEventListener('mousedown', function(e) {mouseHandler(e)})

    window.onbeforeunload = function (event) {exit_room(); return "Some text"}

    setInterval(update, 100)
}

function fetchBoard() {
    response = fetch('/fetch',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'room_id':room_id})
    })
    .then(response => response.json())
    .then(data => board.setBoard(data.response.table))

}

function updateBoard() {
     response = fetch('/update',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'board':board,'room_id':room_id})
        })

}

function loadBoard() {
    response = fetch('/load',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'board':board,'room_id':room_id})
        })
        .then(response => response.json())
        .then(data => setPlayer(data['response']))
}

function exit_room()
{
    response = fetch('/exit_room',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=UTF-8','Accept': 'application/json'},
        body: JSON.stringify({'room_id': room_id})
    })
}

function update() {
    fetchBoard()
    draw()
}


function setPlayer(id) {
    player = id;
    console.log(player)
}``


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
    [id, x, y] = piece.getParam()
    ctx = getCtx();
    X = STEP * x
    Y = STEP * y
    
    if (piece.player == 1) {
        ctx.fillStyle = 'black';
    } else {
        ctx.fillStyle = 'red';
    }

    ctx.fillRect(X, Y, STEP, STEP)
}

function draw() {
    context = getCtx()
    canvas = getCnv()
    context.clearRect(0, 0, canvas. width, canvas. height);
    
    drawTable()
    drawBoard()
}


function getMousePos(event) {
    canvas = getCnv()
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top


    return [x,y]
}

function getCell(pos){
    var [XPos, YPos] = pos

    return [Math.floor(XPos/STEP), Math.floor(YPos/STEP)]
}


function setPiece(pos, fill_value) {
    var [XCell, YCell] = pos
    var piece = new Piece(fill_value, XCell, YCell)
    
    board.addPiece(piece)
    updateBoard()
}


function setSelect(pos) {
    var [XCell, YCell] = pos

    if (selectedCellX === XCell && selectedCellY === YCell) {
        [selectedCellX, selectedCellY] = [-1, -1]
        return
    }

    [selectedCellX, selectedCellY] = [XCell, YCell]
}

function mouseHandler(e){
    switch (e.button){
        case 0:
            var [x,y] = getCell(getMousePos(e))
            

            if (board.table[x][y].getType() != -1){
                selectedCellX = x
                selectedCellY = y

                board.table[x][y].color = 'gray'
                break
            }


            if (selectedCellX === -1 && selectedCellY === -1) {
                setPiece([x,y], 0)
                break
            }

            setPiece([selectedCellX, selectedCellY], -1)
            setPiece([x, y], 0)
            break
    }
}