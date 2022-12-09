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
    let highest_score = 0;

    function tree_top(value, row, column){
        let tree_count = 0;
        for (i = row - 1; i >= 0 ; i--){
            if (Number(arr_read[i][column]) >= value){
                tree_count++;
                break;
            }
            tree_count++;
        }
        return tree_count;
    }

    function tree_bottom(value, row, column){
        let tree_count = 0;
        for (i = row + 1; i < total_rows ; i++){
            if (Number(arr_read[i][column]) >= value){
                tree_count++;
                break;
            }
            tree_count++;
        }
        return tree_count;
    }

    function tree_left(value, row, column){
        let tree_count = 0;
        for (i = column - 1; i >= 0 ; i--){
            if (Number(arr_read[row][i]) >= value){
                tree_count++;
                break;
            }
            tree_count++;
        }
        return tree_count;
    }

    function tree_right(value, row, column){
        let tree_count = 0;
        for (i = column + 1; i < total_columns ; i++){
            if (Number(arr_read[row][i]) >= value){
                tree_count++;
                break;
            }
            tree_count++;
        }
        return tree_count;
    }

    for (let row = 1; row <  total_rows - 1; row++){
        for (let column = 1; column < total_columns - 1; column++){
            let value = Number(arr_read[row][column]);
            let scenic_score = tree_top(value,row,column)*
            tree_bottom(value,row,column)*
            tree_left(value,row,column)*
            tree_right(value,row,column);
            highest_score =  (highest_score <= scenic_score)? scenic_score : highest_score;
        }
    }
    console.log(highest_score);