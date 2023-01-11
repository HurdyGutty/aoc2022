const {readFileSync, promises: fsPromises} = require('fs');

    const file = './lava.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
               
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const contents = syncReadFile(file);

    let surface_area = (cubes) => {

        if (cubes.length == 0) return 0;
        let lava_map = new Map();

        cubes.forEach(el => lava_map.set(el, 6));

        cubes.forEach(el => {
            let [x, y, z] = el.split(",").map(Number);
            for (let cube of lava_map.keys()){
                let [x2, y2, z2] = cube.split(",").map(Number);
                if (Math.abs(x - x2) + Math.abs(y - y2) + Math.abs(z - z2) == 1){
                    lava_map.set(cube, lava_map.get(cube) - 1);
                }
            }
        })

        return [...lava_map.values()].reduce( (acc, el) => acc += el , 0);
    }

    const convert = (cube_string) => {
        return cube_string.split(',').map(Number);
    }

    contents.sort( (a, b) => {
        let a_cube = convert(a);
        let b_cube = convert(b);
        for (let i = 0, len = Math.min(a_cube.length, b_cube.length); i < len; i++) {
            if (a_cube[i] > b_cube[i]) return 1;
            if (a_cube[i] < b_cube[i]) return -1;
        }
        return 0;
    })

    let lava_cubes = {};

    contents.forEach(el => lava_cubes[el] = true);

        

    const inBorder = (cube_string) => {
        let [x, y, z] = convert(cube_string);
        return (border_min[0] <= x && x <= border_max[0] && 
                border_min[1] <= y && y <= border_max[1] && 
                border_min[2] <= z && z <= border_max[2]) ? true : false;
    }

    let discarded = {};

    const spread = (start) => {
        let trapped = {};
        let visited = {};
        let queue = [start];
        let direction = [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
        let is_opened = false;
        while (queue.length > 0 && is_opened === false){
            let cube_string = queue.shift()
            let cube = convert(cube_string);

                for ([x, y, z] of direction){
                    
                    let adjacent = `${cube[0] + x},${cube[1] + y},${cube[2] + z}`;

                    if (visited[adjacent]) continue;

                    if (lava_cubes[adjacent]){
                        continue;
                    }
        
                    if (trapped[adjacent]){
                        visited[adjacent] = true;
                        continue;
                    }
        
                    if (!inBorder(adjacent) || discarded(adjacent)) {
                        is_opened = true;
                        break;
                    }
                    queue.push(adjacent);
                }

            visited[cube_string] = true;
            if (is_opened) {
                discarded = {...discarded,...visited};
                queue.forEach(el => discarded[el] = true);
                visited = {};
                break;
            }
            
        }
        trapped = {...trapped,...visited};
        return is_opened ? {} : trapped;
    } 

    let border_max = convert(contents[0]);
    let border_min = convert(contents[0]);

    contents.forEach( el => {
        let lava_cube = convert(el);
        for (let i = 0, len = Math.min(border_max.length, lava_cube.length, border_min.length); i < len; i++) {
            border_max[i] = lava_cube[i] > border_max[i] ? lava_cube[i] : border_max[i];
            border_min[i] = lava_cube[i] < border_min[i] ? lava_cube[i] : border_min[i];
        }
    });

    let cubes_insides = {};

    for (let i = 0; i < contents.length - 1; i++){
        let current = convert(contents[i]);
        let next = convert(contents[i + 1]);
        if (current[0] == next[0] && current[1] == next[1] && current[2] != next[2]){
            let inside = `${current[0]},${current[1]},${Math.floor((current[2] + next[2]) / 2)}`;
            if (discarded[inside]) continue;

            if (!lava_cubes[inside] && !cubes_insides[inside]) {
                cubes_insides = {...cubes_insides,...spread(inside)};
            }
        }
    }

    let result = surface_area(contents) - surface_area(Object.keys(cubes_insides));

    console.log(result);

