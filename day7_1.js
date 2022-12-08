const {readFileSync, promises: fsPromises} = require('fs');
const { PassThrough } = require('stream');
    const file = './directories.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    const folder_regex = /(?:\$ cd )(\w+|\/)/;

    const child_regex = /(?:dir )(\w+)/;

    const file_regex = /(\d+)(?: \w+.\w+)/;

    const cdline_regex = /\$ cd .+/;

    let arr_folders = [];

    let folder = new Map();

    for (var i = 0; i < arr_read.length; i++){
        if (folder_regex.test(arr_read[i]) === true){
            let folder_name = [...arr_read[i].matchAll(folder_regex)][0][1];
            folder.set('name',folder_name);
            folder.set('sum',0);
            folder.set('child',[]);
        }
        if (child_regex.test(arr_read[i]) === true){
            let child_name = [...arr_read[i].matchAll(child_regex)][0][1];
            folder.set('child',[...folder.get('child'),child_name]);
        }
        if (file_regex.test(arr_read[i]) === true){
            let file_size = [...arr_read[i].matchAll(file_regex)][0][1]
            folder.set('sum', folder.get('sum') + Number(file_size));
        }
        if (cdline_regex.test(arr_read[i + 1]) === true){
            let folder_copy = new Map([...folder]);
            arr_folders.push(folder_copy);
            folder.clear();
        }
    }

    let folders_right_size = [];
    arr_folders.forEach(element => {
        if (element.size > 0 && element.get('sum') <= 100000)
        {
            folders_right_size.push(element);
        }
    });
    let folder_right_name = folders_right_size.map(el => el.get('name'));

    function getSumWithName(name, array_map){
        return array_map.filter(el => el.get('name') === name).reduce((acc, el) => acc + el.get('sum'),0)
    }

    folders_right_size.forEach((element, index, array) => {
        if (element.get('child').length == 0) return;
        if (element.get('child').every(el => folder_right_name.includes(el)) == false){
            array.splice(index, 1);
        }
        element.set('sum', folder.get('sum') + element.get('child').reduce((acc, name) => acc + getSumWithName(name,folders_right_size),0));
    })

    console.log(folders_right_size);