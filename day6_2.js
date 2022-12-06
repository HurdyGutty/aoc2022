const {readFileSync, promises: fsPromises} = require('fs');
    const file = './message.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            return contents
          
    }

    const text = syncReadFile(file);
    let length = text.length;
    
for (i = 14, j = 0; i < length; i++, j++){
    let buffer_code = text.substring(j,i);
    let buffer_different = new Set(buffer_code).size;
    if (buffer_different == 14){
        console.log(i);
        break;
    }
}
