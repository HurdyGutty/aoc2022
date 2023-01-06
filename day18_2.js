const {readFileSync, promises: fsPromises} = require('fs');

    const file = './lava.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
               
            const arr = contents.split(/\r?\n/).map(el => el.split(',').map(Number));        
            return arr;
          
    }

    const contents = syncReadFile(file);

    let surface_area = (cubes) => {

        if (cubes.length == 0) return 0;
        let lava_map = new Map();

        cubes.forEach(el => lava_map.set(el, 6));

        cubes.forEach(el => {
            for (let cube of lava_map.keys()){
                if (Math.abs(el[0] - cube[0]) + Math.abs(el[1] - cube[1]) + Math.abs(el[2] - cube[2]) == 1){
                    lava_map.set(cube, lava_map.get(cube) - 1);
                }
            }
        })

        return [...lava_map.values()].reduce( (acc, el) => acc += el , 0);
    }

    

    let existed = (cube, array = contents) => {
        return array.some(el => el[0] == cube[0] && el[1] == cube[1] && el[2] == cube[2]);
    }

    let inBorder = ([x, y, z]) => {
        return (border_min[0] <= x <= border_max[0] && 
                border_min[1] <= y <= border_max[1] && 
                border_min[2] <= z <= border_max[2]) ? true : false;
    }

    let spread = (start) => {
        let trapped = [];
        let queue = [start];
        let direction = [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
        let is_opened = false;
        while (queue.length > 0 && is_opened === false){
            let cube = queue.shift();
            for ([x, y, z] of direction){
                
                let adjacent = [cube[0] + x, cube[1] + y, cube[2] + z];

                if (existed(adjacent)){
                    continue;
                }
    
                if (existed(adjacent, trapped)){
                    continue;
                }
    
                if (!inBorder(adjacent)) {
                    is_opened = true;
                    break;
                }
                queue.push(adjacent);
            }
            if (is_opened) break;
            trapped.push(...queue);
        }
        
        return is_opened ? [] : trapped;
    } 

    let border_max = new Array(...contents[0]);
    let border_min = new Array(...contents[0]);

    contents.forEach( el => {
        for (let i = 0, len = Math.min(border_max.length, el.length, border_min.length); i < len; i++) {
            border_max[i] = el[i] > border_max[i] ? el[i] : border_max[i];
            border_min[i] = el[i] < border_min[i] ? el[i] : border_min[i];
        }
    });

    let cubes_insides = [];

    contents.forEach(el => {
        for (let [x, y, z] of contents){
            if (el[0] == x && el[1] == y && el[2] != z){
                let inside = [x, y, Number((el[2] + z) / 2)];

                if (!existed(inside) && !existed(inside, cubes_insides)) {
                    cubes_insides.push(...spread(inside));
                }
            }
        }
    });

    let result = surface_area(contents) - surface_area(cubes_insides);

    console.log(result);

