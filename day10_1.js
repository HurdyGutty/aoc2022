const {readFileSync, promises: fsPromises} = require('fs');

    const file = './clock_circuit.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let x = 1;
    let signal = [];
    let cycle = 0;

    for (const el of arr_read) {
        if (el.substring(0,4) === 'noop'){
            cycle++;
            signal.push(x);
        }
        if (el.substring(0,4) === 'addx'){
            cycle += 2;
            signal.push(x);
            x += parseInt(el.substring(5), 10);
            signal.push(x);
        }
    }

    console.log(20 * signal[20 - 2] + 60 * signal[60 - 2] + 100 * signal[100 - 2] + 140 * signal[140 - 2] + 180 * signal[180 - 2] + 220 * signal[220 - 2]);