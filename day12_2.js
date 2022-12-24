const {readFileSync, promises: fsPromises} = require('fs');

    const file = './elevation.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let find_coordinate = (char) => {
        let row = arr_read.findIndex(el => el.search(char) != -1);

        let column = arr_read[row].search(char);

        return [row, column];
    }

    let S_coordinate = find_coordinate('S');
    let E_coordinate = find_coordinate('E');

    let convert = (char) => {
        if (char === 'S') return 1;
        if (char === 'E') return 26;
        return (char.charCodeAt() - 96);
    }

    let row_count = arr_read.length;
    let column_count = arr_read[0].length;

    let grid = arr_read.map( el => {
        let string_to_elevation = [];
        for (let char of el){
            string_to_elevation.push(convert(char));
        }
        return string_to_elevation;
    });

    let check_elevation = (current, next) => {
        let current_elevation = grid[current[0]][current[1]];
        let next_elevation = grid[next[0]][next[1]];

        return (current_elevation - next_elevation <= 1 ) ? true : false;
    }

    let repeated = (path, next) => {
        if (path.some(el => (el[0] === next[0] && el[1] === next[1]))) return true;
        return false;
    }

    let visiting = [E_coordinate];
    let waiting = [];
    let visited = [];
    let cell_count = row_count * column_count;
    let directions = [[-1,0], [1,0], [0,-1], [0,1]];
    let break_check = false;
    let step;
    for (step = 0 ; step < cell_count; step++){
        for (let current of visiting){
            if ((grid[current[0]][current[1]] == 1)){
                break_check = true;
                break;
            }
            for (let direction of directions){
                let next_row = current[0] + direction[0];
                let next_col = current[1] + direction[1];
                let next = [next_row, next_col];
                if (next_row >= row_count) continue;
                if (next_col >= column_count) continue;
                if (next_row < 0) continue;
                if (next_col < 0) continue;
                if (!check_elevation(current, next)) continue;
                if (repeated(visited, next)) continue;
                if (repeated(waiting, next)) continue;
                waiting.push(next);
            }
        }
        visited = visited.concat(visiting);
        visiting = waiting;
        waiting = [];
        if (break_check == true) break;
    }

    console.log(step);