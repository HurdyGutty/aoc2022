const {readFileSync, promises: fsPromises} = require('fs');

    const file = './lava.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
               
            const arr = contents.split(/\r?\n/).map(el => el.split(',').map(Number));        
            return arr;
          
    }

    const contents = syncReadFile(file);

    let lava_map = new Map();

    contents.forEach(el => lava_map.set(el, 6));

    contents.forEach(el => {
        for (let cube of lava_map.keys()){
            if (Math.abs(el[0] - cube[0]) + Math.abs(el[1] - cube[1]) + Math.abs(el[2] - cube[2]) == 1){
                lava_map.set(cube, lava_map.get(cube) - 1);
            }
        }
    })

    console.log([...lava_map.values()].reduce( (acc, el) => acc += el , 0));

