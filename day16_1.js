const {readFileSync, promises: fsPromises} = require('fs');

    const file = './valve.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/\r?\n/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);

    let valve_map = new Map;

    arr_read.forEach(el => valve_map.set(el.match(/[A-Z]{2}/)[0], new Map([
        ['flow', Number(el.match(/\d+/)[0])],
        ['connect', el.match(/[A-Z]{2}/g).splice(1)]
    ])))

    let closed = [];

    valve_map.forEach((value, key) => value.get('flow') > 0 ? closed.push(key) : "");

    let queue = [[0, [], 'AA', 0, 0]];

    let flow_sum_arr = []; 
    let max_sum = 0;

    while (queue.length > 0){

        let [i, opened, valve, current_flow, flow_sum] = queue.shift();

        flow_sum += current_flow * (30 - i);

        if (i >= 30 ) {
            if (flow_sum > max_sum) {
                max_sum = flow_sum;
                flow_sum_arr.push(max_sum);
            }
            continue;
        }

        if (valve_map.get(valve).get('flow') > 0 && !opened.includes(valve)){
            current_flow += valve_map.get(valve).get('flow');
            queue.push([i+1, [...opened, valve], valve, current_flow, flow_sum]);
        }

        for (let connect_valve of valve_map.get(valve).get('connect')){
            queue.push([i+1, opened, connect_valve, current_flow, flow_sum]);
        }
        
    }
    console.log(flow_sum_arr);