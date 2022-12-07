const {readFileSync, promises: fsPromises} = require('fs');
    const file = './directories.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    const regexp = /(?:\$ cd )(\w+|\/)/g;

    const array = arr_read[0].matchAll(regexp);

    console.log(array);

    let arr_folders = [];

    // for (let element of arr_read){
    //     let folder_name = element.matchAll(/(?:\$ cd )(\w+|\/)/g);
    //     let child_name = element.matchAll(/(?:dir )(\w+)/g);
    //     let file_size = element.matchAll(/(\d+)(?: \w+.\w+)/g)[1];
    //     if (folder_name != null){
    //         let folder = new Map();
    //         folder.set('name',folder_name);
    //         folder.set('sum',0);
    //         folder.set('child',[]);
    //         arr_folders.push(folder);
    //     }
    //     if (child_name != null){
    //         folder.set('child',[...folder.get('child'),child_name]);
    //     }
    //     if (file_size != null){
    //         folder.set('sum', folder.get('sum') + Number(file_size));
    //     }
    // }

    