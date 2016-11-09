function Item(value) {
    this.value = value;
    this.changeable = (value == 0 ? true : false);
}

Item.prototype.toString = function() {
    return this.value;
};

var Row, Column, Grid;

Row = Column = Grid = function() {
    this.items = [];
    this.has = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
    }
};

Column.prototype.addItem = Row.prototype.addItem = Grid.prototype.addItem = function(item, index) {
    this.items[index] = item;
    this.has[item.value] = true;
};

Column.prototype.toString = Row.prototype.toString = Grid.prototype.toString = function() {
    var i, arr = [];
    for (i = 0; i < 9; i++) {
        arr[i] = this.items[i].value;
    }
    return arr.join(' ');
};


function solve(sudoku) {
    var i, j;
    var finished = false;
    var rows = [],
        row;
    var columns = [],
        column;
    var grids = [],
        grid;
    var gridMap = [
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
    ];
    var item;
    var result = [];

    for (i = 0; i < 9; i++) {
        rows[i] = new Row();
        columns[i] = new Column();
        grids[i] = new Grid();
    }

    for (i = 0; i < 9; i++) {
        row = rows[i];
        for (j = 0; j < 9; j++) {
            column = columns[j];

            item = new Item(sudoku[i][j]);
            grid = grids[gridMap[i][j]];

            row.addItem(item, j);
            column.addItem(item, i);
            grid.addItem(item, (i % 3) * 3 + (j % 3));

        }
    }

    function setItem(i, j) {
        var num, item, originValue, result;
        if (i >= 9) {
            return true;
        }
        item = rows[i].items[j];

        if (item.changeable == true) {

            originValue = item.value;
            rows[i].has[originValue] = undefined;
            columns[j].has[originValue] = undefined;
            grids[gridMap[i][j]].has[originValue] = undefined;

            for (num = 1; num <= 9; num++) {

                if (rows[i].has[num] || columns[j].has[num] || grids[gridMap[i][j]].has[num]) {
                    continue;
                }

                item.value = num;
                rows[i].has[num] = true;
                columns[j].has[num] = true;
                grids[gridMap[i][j]].has[num] = true;


                if (j == 8) {
                    result = setItem(i + 1, 0);
                } else {
                    result = setItem(i, j + 1);
                }

                if (result) {
                    return true;
                }

                rows[i].has[num] = false;
                columns[j].has[num] = false;
                grids[gridMap[i][j]].has[num] = false;
            }


            item.value = originValue;
            rows[i].has[originValue] = true;
            columns[j].has[originValue] = true;
            grids[gridMap[i][j]].has[originValue] = true;
            return false;

        } else {
            if (j == 8) {
                return setItem(i + 1, 0);
            } else {
                return setItem(i, j + 1);
            }
        }
    }

    setItem(0, 0);

    for (i = 0; i < 9; i++) {
        result[i] = [];
        for (j = 0; j < 9; j++) {
            result[i][j] = rows[i].items[j].value;
        }
    }
    return result;
}

module.exports.solve = solve;
