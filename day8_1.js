const {readFileSync, promises: fsPromises} = require('fs');

    const file = './tree.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    const total_rows = arr_read.length;
    const total_columns = arr_read[0].length;

    const total_tree = total_rows * total_columns;

    let blocked = 0;

    function blocked_column(value, row, column){
        let count_blocked = 0;
        for (let i = 0; i <  total_rows; i++){
            if (i == row) continue;
            if (Number(arr_read[i][column]) >= value && i < row){
                count_blocked++;
                i = row;
            }
            if (Number(arr_read[i][column]) >= value && i > row){
                count_blocked++;
                i = total_rows;
            }
        }
        if (count_blocked == 2) return true; 
    }

    function blocked_row(value, row, column){
        let count_blocked = 0;
        for (let i = 0; i < total_columns; i++){
            if (i == column) continue;
            if (Number(arr_read[row][i]) >= value && i < column){
                count_blocked++;
                i = column;
            }
            if (Number(arr_read[row][i]) >= value && i > column){
                count_blocked++;
                i = total_columns;
            }
        }
        if (count_blocked == 2) return true;
    }

    for (let row = 1; row <  total_rows - 1; row++){
        for (let column = 1; column < total_columns - 1; column++){
            if (blocked_column(arr_read[row][column],row,column) && blocked_row(arr_read[row][column],row,column)) blocked++;
        }
    }

    console.log(total_tree - blocked);