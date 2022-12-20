const {readFileSync, promises: fsPromises} = require('fs');

    const file = './elevation.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/(\r\n){2}/);        
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
        if (char === 'S') return 'a';
        if (char === 'E') return 'z';
        return char;
    }

    let check_elevation = (current, next) => {
        let current_elevation = convert(arr_read[current[0]][current[1]]);
        let next_elevation = convert(arr_read[next[0]][next[1]]);

        return (next_elevation.charCodeAt() - current_elevation.charCodeAt() <= 1) ? true : false;
    }

    let check_border = (coordinate) => {
        if (coordinate[0] >= arr_read.length) return false;
        if (coordinate[1] >= arr_read[0].length) return false;
        if (coordinate[0] < 0) return false;
        if (coordinate[1] < 0) return false;
        return true;
    }

    let repeated = (path, next) => {
        if (path.some(el => (el[0] === next[0] && el[1] === next[1]))) return true;
        return false;
    }

    let legit_coordinate = (path, coordinate) => {
        if (check_border(coordinate) && check_elevation(path[path.length - 1], coordinate && !repeated(path, coordinate))){
            return true;
        }else{
            return false;
        }
    }

    let current = S_coordinate;
    let path = [current];
    let final_path = [];
    function path_maker(path, current){
        let up = [current[0] - 1, current[1]];
        let down = [current[0] + 1, current[1]];
        let left = [current[0], current[1] - 1];
        let right = [current[0], current[1] + 1];

        if (current[0] != E_coordinate[0] && current[1] != E_coordinate[1]){
           return [...path, current]; 
        }

        if (
            !legit_coordinate(path, up) && 
            !legit_coordinate(path, down) && 
            !legit_coordinate(path, left) && 
            !legit_coordinate(path, right)
            ){
            return [];
        }

        final_path.push(path)
    }