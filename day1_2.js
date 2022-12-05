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
    arr_result.sort( (a,b) => (b-a) );
    let sum_top_3 = arr_result[0] + arr_result[1] + arr_result[2];

    console.log(sum_top_3);