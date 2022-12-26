const {readFileSync, promises: fsPromises} = require('fs');

    const file = './signal.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/).filter(el => el.length != 0).map( el => JSON.parse(el));        
            return arr;
          
    }

    const arr_read = syncReadFile(file);
    const first_divider_packet = [[2]];
    const second_divider_packet = [[6]];

    let packets = [...arr_read, first_divider_packet, second_divider_packet];

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

    const mergeSort = (arr) => {
        if (arr.length <= 1) return arr;

        let right = [...arr];
        let mid = arr.length / 2;
        let left = right.splice(0, mid);
        
        return mergeArraySorted(mergeSort(left), mergeSort(right));
    }

    const mergeArraySorted = (left, right) => {
        let temp_arr = [];
        while (left.length && right.length){
            if (compare_array(left[0], right[0]) == true){
                temp_arr.push(left.shift());
            } else {
                temp_arr.push(right.shift());
            }
        }

        return [...temp_arr, ...left, ...right];
    }

    let sorted = mergeSort(packets);
    let key = (sorted.findIndex(el => el == first_divider_packet) + 1 ) * ((sorted.findIndex(el => el == second_divider_packet) + 1 ))

    console.log(key);

