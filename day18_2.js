const {readFileSync, promises: fsPromises} = require('fs');

    const file = './lava.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
               
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const contents = syncReadFile(file);

    const convert = (cube_string) => {
        return cube_string.split(',').map(Number);
    }

    let lava_cubes = {};

    contents.forEach(el => lava_cubes[el] = true);

    const inBorder = (cube_string) => {
        let [x, y, z] = convert(cube_string);
        return (border_min[0] <= x && x <= border_max[0] && 
                border_min[1] <= y && y <= border_max[1] && 
                border_min[2] <= z && z <= border_max[2]) ? true : false;
    }

    let border_max = convert(contents[0]);
    let border_min = convert(contents[0]);

    contents.forEach( el => {
        let lava_cube = convert(el);
        for (let i = 0, len = Math.min(border_max.length, lava_cube.length, border_min.length); i < len; i++) {
            border_max[i] = lava_cube[i] + 1 > border_max[i] ? lava_cube[i] + 1 : border_max[i];
            border_min[i] = lava_cube[i] - 1 < border_min[i] ? lava_cube[i] - 1 : border_min[i];
        }
    });

    const spread = (start) => {
        let visited = {};
        let exposed = 0;
        let queue = [start];
        let direction = [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
        while (queue.length > 0){
            let cube_string = queue.shift()
            let cube = convert(cube_string);

            if (visited[cube_string]) continue;

            if (lava_cubes[cube_string]) {
                exposed++;
                continue;
            }

                visited[cube_string] = true;

                for ([x, y, z] of direction){
                    
                    let adjacent = `${cube[0] + x},${cube[1] + y},${cube[2] + z}`;
        
                    if (!inBorder(adjacent)) continue;

                    queue.push(adjacent);
                }
                
        }
        return exposed;
    } 

    let result = spread(border_min.join());

    console.log(result);

