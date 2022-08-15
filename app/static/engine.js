// class Engine() {
//     constructor() {
//         this.board = board;
//     }
// }

class Engine {
    constructor() {
        this.board;
    }
    setBoard(board) {
        this.board = board
    }

    checkHistory(element) {
        for (let r = 0;  r < this.history.length; r++) {
            if (equals(this.history[r],element))
                return true
        }
        return false
    }

    expand(coord) {
        var [x,y] = coord;
        if (this.board.table[x][y]['id'] != -1 & this.player == this.board.table[x][y]['player']) {
            return [1]
        }
        if ((x>=16 | x<=0) | (y>=16 | y<=0)) {
            return [0]
        }
        this.history.push([x,y])
        
        var neighbours = []
        if (x > 0) {
            var coords = [x-1,y]
            if (!this.checkHistory(coords))
                neighbours.push(...this.expand(coords))
        }
        if (x < 15) {
            var coords = [x+1,y]
            if (!this.checkHistory(coords))
                neighbours.push(...this.expand(coords))    
        }
        if (y > 0) {
            var coords = [x,y-1]
            if (!this.checkHistory(coords))
                neighbours.push(...this.expand(coords))
        }
        if (y < 15) {
            var coords = [x,y+1]
            if (!this.checkHistory(coords))
                neighbours.push(...this.expand(coords))        
        }
        return neighbours
    }

    computeBorder(x,y) {
        this.player = this.board.table[x][y]['player']
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i+j) % 2 == 0) 
                    continue

                var [XPos, YPos] = [x+i,y+j]
                if (XPos < 0 | XPos > 15 | YPos < 0 | YPos > 15)
                    continue

                this.history = []
                var borders = this.expand([XPos,YPos])
                if (!borders.includes(0)) {
                    for (let r = 0; r < this.history.length; r++) {
                        var [a,b] = this.history[r]
                        this.board.table[a][b]['id'] = 0
                        this.board.table[a][b]['player'] = this.player
                    }
                }
            }
        }
        return this.board.table
    }
}

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);