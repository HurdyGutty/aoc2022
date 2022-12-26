const {readFileSync, promises: fsPromises} = require('fs');

    const file = './signal.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/(\r\n){2}/).filter(el => el != '\r\n').map(el => el.split(/\r?\n/).map( el => JSON.parse(el)));        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let compare_array = (left, right) => {
        if (typeof left !== 'undefined' && typeof right === 'undefined') return false;

        if (typeof left === 'undefined' && typeof right !== 'undefined') return true;

        if (typeof left === 'number' && typeof right === 'number'){
            if (left < right) return true;
            if (left > right) return false;
            return null;
        }

        if (typeof left === 'number' && typeof right === 'object'){
            return compare_array([left], right)
        }

        if (typeof left === 'object' && typeof right === 'number'){
            return compare_array(left, [right])
        }

        if (typeof left === 'object' && typeof right === 'object'){
            let compare_result;
            if (left.length == 0 && right.length == 0) return null;
            if (left.length == right.length){
                for ( let i = 0; i < right.length; i++){
                    compare_result = compare_array(left[i], right[i]);
                    if (compare_result === null) continue;
                    return compare_result;
                }
            } else {
                let max = (left.length < right.length) ? right.length : left.length;
                for ( let i = 0; i < max; i++){
                    compare_result = compare_array(left[i], right[i]);
                    if (compare_result === null) continue;
                    return compare_result;
                }
            }

            return compare_result;
        }
        
    }

    let sum = 0;

    for (const [index,signal] of arr_read.entries()){
        if (compare_array(signal[0], signal[1]) === true) sum += index + 1;
    }

    console.log(sum);