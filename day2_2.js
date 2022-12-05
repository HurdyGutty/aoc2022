const {readFileSync, promises: fsPromises} = require('fs');
    const file = './rock_paper_scissors.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    const enemy = {
        'A': 1,
        'B': 2,
        'C': 3,
    };

    function win(move){
        if (move == 3 ) return 1; 
        return move + 1;
    }
    function lose(move){
        if (move == 1) return 3;
        return move - 1;
    }
    
    let sum = arr_read.map((element) => {
        enemy_move = enemy[element[0]];
        if (element[2] == "X") return lose(enemy_move);
        if (element[2] == "Z") return win(enemy_move) + 6;
        if (element[2] == "Y") return enemy_move + 3;
    })
    .reduce((accumilate, value) => accumilate + value, 0);
    console.log(sum);