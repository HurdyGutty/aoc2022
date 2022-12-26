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
    let temp_arr = [];

    let merge_sort = (arr, l, r) => {
        if (l >= r) return;
        if (r - l == 1){
            if (!compare_array(arr[l], arr[r])) {
                [arr[r], arr[l]] = [arr[l], arr[r]];
                return;
            }
        }
        let mid = l + (r - 1)/2;
        merge_sort(arr, l, mid);
        merge_sort(arr, mid +1, r);
        let i,temp_index = l;
        let j = mid + 1;
        while (i <= mid && j <= r){
            if (!compare_array(arr[i], arr[j])) {
                [arr[r], arr[i]] = [arr[i], arr[r]];
                i++;
            } else {

            }
        }


    }



    console.log(arr_read);

