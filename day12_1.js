const {readFileSync, promises: fsPromises} = require('fs');

    const file = './monkeys.txt';

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

    let check_path = (current, next) => {
        let current_elevation = convert(arr_read[current[0]][current[1]]);
        let next_elevation = convert(arr_read[next[0]][next[1]]);

        return (current_elevation <= next_elevation) ? true : false;
    }

    let check_border = (coordinate) => {
        if (coordinate[0] > arr_read.length) return false;
        if (coordinate[1] > arr_read[0].length) return false;
        if (coordinate[0] < 0) return false;
        if (coordinate[1] < 0) return false;
        return true;
    }

    let repeated = (previous, next) => {
        if (previous.every((val, index) => val === next[index])) return true;
        return false;
    }

    let current = S_coordinate;
    while ( current[0] != E_coordinate[0] && current[1] != E_coordinate[1]){
        if (current[1] != E_coordinate[1]) current[1] += Math.sign(E_coordinate[1] - current[1]) * 1;
        if (current[0] != E_coordinate[0]) current[0] += Math.sign(E_coordinate[0] - current[0]) * 1;

    }