const {readFileSync, promises: fsPromises} = require('fs');

    const file = './directories.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    const root_regex = /(?:\$ cd )\//g;

    const folder_regex = /(?:\$ cd )(\w+)/g;

    const child_regex = /(?:dir )(\w+)/g;

    const file_regex = /(\d+)(?: \w+.\w+)/g;

    const cdline_regex = /\$ cd .+/;

    let current_path = [];

    let folder = new Map();

    function current_directory(directory, object_map = new Map([['sum', 0]])){
        if (directory === '..'){
            current_path.pop();
        }
        current_path.push(object_map);
    }

    for (let i = 0; i < arr_read.length; i++){

        // $ cd /
        if (arr_read[i].search(root_regex) !== -1){
            let directory = '/';
            let folder_name = 'root';
            let root = new Map([['sum', 0]]);
            
            folder.set(folder_name, root);
            current_directory(directory, root);
        }

        // $ cd dfghsdfgs
        if (arr_read[i].search(folder_regex) !== -1){
            let directory = [...arr_read[i].matchAll(folder_regex)][0][1];
            let current = current_path[current_path.length - 1].get(directory);
            current_directory(directory, current);
        }

        // dir asdfasdfas
        if (arr_read[i].search(child_regex) !== -1){
            let folder_name = [...arr_read[i].matchAll(child_regex)][0][1];
            let child = new Map([['sum', 0]]);
            current_path[current_path.length - 1].set(folder_name,child);
        }

        // 132454 asdasdd.sfs
        if (arr_read[i].search(file_regex) !== -1){
            let file_size = [...arr_read[i].matchAll(file_regex)][0][1];
            let current_directory = current_path[current_path.length - 1];
            current_directory.set('sum', current_directory.get('sum') + Number(file_size));
        }

        // $ cd ..
        if (arr_read[i].search(cdline_regex) !== -1){
            current_directory('..')
        }

        if (arr_read[i] === '$ ls') continue;
    }

    console.log(folder);
