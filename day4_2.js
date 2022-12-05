const {readFileSync, promises: fsPromises} = require('fs');

const file = './section.txt'

function syncReadFile(file) {
    const contents = readFileSync(file, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
  
    return arr;
  }
  

const fileread = syncReadFile(file);

let overlapped_pairs = 0;
fileread.map(element => element.match(/\d+/g).map(Number))
        .forEach((element) => {
            if ((element[0] <= element[3] && element[0] >= element[2]) || (element[1] >= element[2] && element[1] <= element[3]) || 
            (element[2] >= element[0] && element[2] <= element[1]) || (element[3] >= element[0] && element[3] <= element[1])){
                overlapped_pairs++
            }
        });

console.log(overlapped_pairs);