const {readFileSync, promises: fsPromises} = require('fs');

const file = './compartment.txt'

function syncReadFile(file) {
    const contents = readFileSync(file, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
  
    return arr;
  }
  

const fileread = syncReadFile(file);

let item_duplicated = fileread.map((element,index) => {
    let length = element.length;
    let mid = length / 2;
    let left = new Set();
    let right = new Set();

    for (i = 0; i < length; i++){
        if (i < mid) left.add(element[i]);
        else right.add(element[i]);
    }
    let item = '';
    left.forEach((char) => {
        if (right.has(char)) item += char;
    })
    return item;
})

function char_converter(char){
    if (char == char.toLowerCase()){
        return char.charCodeAt(0) - 96;
    }
    else{
        return char.charCodeAt(0) - 38; 
    }
}

let sum = item_duplicated.map(element => char_converter(element)).reduce((acc,cur) => (acc + cur) , 0)

console.log(sum);