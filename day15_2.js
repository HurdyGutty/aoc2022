const {readFileSync, promises: fsPromises} = require('fs');

    const file = './sensor.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/).map(el => [...el.match(/-?\d+/g).map(Number)]);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let beacon_map = arr_read.map(el => [...el, Math.abs(el[2] - el[0]) + Math.abs(el[3] - el[1])]);

    let inManhattanRange = (x_sensor, y_sensor, x_coor, y_coor, range) => {
        if (Math.abs(x_sensor - x_coor) + Math.abs(y_sensor - y_coor) <= range) return true;
        return false;
    }

    let signal_map = [];
    
    for ( let y = 0 ; y <= 4000000 ; y++){
        let border = new Set;

        for (let signal of beacon_map){
            if ( Math.abs(signal[1] - y) > signal[4] + 1) continue;
            if (Math.abs(y - signal[1]) == 1 && !beacon_map.some(el => inManhattanRange(el[0], el[1], signal[0], y, el[4]))) border.add(signal[0]);

            let i = signal[0] + signal[4] - Math.abs(signal[1] - y) + 1;
            let j = signal[0] - (signal[4] - Math.abs(signal[1] - y)) - 1;

                if (i <= 4000000 && !beacon_map.some(el => inManhattanRange(el[0], el[1], i, y, el[4]))) border.add(i);
                if (j >= 0 && !beacon_map.some(el => inManhattanRange(el[0], el[1], j, y, el[4]))) border.add(j);
        }
        if (border.size) signal_map.push([border , y]);
    }
    
    let missing_place = [...signal_map[0]].map( el => {
        if (typeof el === 'object') return BigInt([...el][0]);
        return BigInt(el);
    });

    let tuning_frequency = missing_place[0] * 4000000n + missing_place[1];

    console.log(tuning_frequency);
