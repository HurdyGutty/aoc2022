const {readFileSync, promises: fsPromises} = require('fs');

    const file = './sensor.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/).map(el => [...el.match(/-?\d+/g).map(Number)]);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let y = 2000000;

    let beacon_map = arr_read.map(el => [...el, Math.abs(el[2] - el[0]) + Math.abs(el[3] - el[1])]);

    let coverage = new Set;

    let beacons_x = new Set;

    for (let signal of beacon_map){
        if ( Math.abs(signal[1] - y) > signal[4]) continue;
        coverage.add(signal[0]);
        if (signal[3] == y) beacons_x.add(signal[2]);
        for ( let i = j = signal[0]; i < signal[0] + signal[4] - Math.abs(signal[1] - y) 
                                    && j > signal[0] - (signal[4] - Math.abs(signal[1] - y)); i++, j--)
            {
                coverage.add(i + 1);
                coverage.add(j - 1);
            }
    }
    
    beacons_x.forEach(el => coverage.delete(el));
    console.log(coverage.size);
