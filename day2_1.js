const {readFileSync, promises: fsPromises} = require('fs');
    const file = './rock_paper_scissors.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    const strategy =  new Map([
        ['A X',4],
        ['A Y',8],
        ['A Z',3],
        ['B X',1],
        ['B Y',5],
        ['B Z',9],
        ['C X',7],
        ['C Y',2],
        ['C Z',6],
    ])
    let result = arr_read.map(a => strategy.get(a)).reduce((accumilate, value) => accumilate + value, 0);
    console.log(result);