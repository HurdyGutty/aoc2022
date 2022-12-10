const {readFileSync, promises: fsPromises} = require('fs');

    const file = './clock_circuit.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let x = 0;
    let signal = [];
    let cycle = 0;
    let message = '';

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

    signal.unshift(0);

    for (i = 0; i < 240; i++){
        if ((i % 40) >= signal[i] && (i % 40) <= signal[i] + 2){
            message += '#';
        } else {
            message += '.';
        }

        if( (i + 1) % 40 == 0){
            console.log(message);
            message = '';
        }
    }