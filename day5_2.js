let crates = {
    1: 'TVJWNRMS',
    2: 'VCPQJDWB',
    3: 'PRDHFJB',
    4: 'DNMBPRF',
    5: 'BTPRVH',
    6: 'TPBC',
    7: 'LPRJB',
    8: 'WBZTLSCN',
    9: 'GSL',
}

const {readFileSync, promises: fsPromises} = require('fs');
    const file = './crates.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let instruction = arr_read.map(el => el.match(/\d+/g).map(element => Number(element)));
    instruction.forEach(el => {
        crates[el[2]] = crates[el[1]].slice(0,el[0]) + crates[el[2]]
        crates[el[1]] = crates[el[1]].substring(el[0]);
    })
    first_letter = '';
    for ( const [key,value] of Object.entries(crates)){
        first_letter += value.substring(0,1);
    }
    console.log(first_letter);