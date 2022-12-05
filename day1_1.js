
const {readFileSync, promises: fsPromises} = require('fs');
    const file = './calories.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);
    let length = arr_read.length;
    let arr_result = new Array();
    let sum = 0;
    for (let i = 0; i < length; i++){
      if (arr_read[i] == ''){
        arr_result.push(sum);
        sum = 0;
        continue;
      }
      sum += Number(arr_read[i]);
    } 
    let max = Math.max(...arr_result);
    console.log(max);

