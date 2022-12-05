const {readFileSync, promises: fsPromises} = require('fs');

const file = './compartment.txt'

function syncReadFile(file) {
    const contents = readFileSync(file, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
  
    return arr;
  }
  

const fileread = syncReadFile(file);

let types = [];

fileread.forEach((element,index,array) => {
  if (index % 3 == 0){
    let chars = new Set(element);

    chars.forEach((char) => {
      if (array[index + 1].includes(char) && array[index + 2].includes(char)){
        types.push(char);
      } 
    });
  }
});

function char_converter(char){
  if (char == char.toLowerCase()){
      return char.charCodeAt(0) - 96;
  }
  else{
      return char.charCodeAt(0) - 38; 
  }
}

let sum = types.map(element => char_converter(element)).reduce((acc,cur) => (acc + cur) , 0)

console.log(sum);