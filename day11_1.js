const {readFileSync, promises: fsPromises} = require('fs');

    const file = './monkeys.txt';

    function syncReadFile(filename) {
            const contents = readFileSync(filename, 'utf-8');
        
            const arr = contents.split(/(\r\n){2}/);        
            return arr;
          
    }

    const arr_read = syncReadFile(file);
    function math_it_up(operation) {
        let split = operation.split(' ');
        if (split[2] === 'old'){
            if (split[1] === '+') return (n) => (2 * n);
            if (split[1] === '-') return 0;
            if (split[1] === '*') return (n) => (n * n);
            if (split[1] === '/') return 1;
        }
        if (split[1] === '+') return (n) => (n + Number(split[2]));
        if (split[1] === '-') return (n) => (n - Number(split[2]));
        if (split[1] === '*') return (n) => (n * Number(split[2]));
        if (split[1] === '/') return (n) => (n / Number(split[2]));
    }
    let monkeys = arr_read.filter(el => el !== '\r\n').map(el => el.split(/\r\n/)).map((el,index, array) => {
        return {
            inspected: 0,
            items : el[1].match(/[0-9]+/g).map(Number),
            divider: Number(el[3].match(/[0-9]+/g)[0]),
            true_push: Number(el[4].match(/[0-9]+/g)[0]),
            false_push: Number(el[5].match(/[0-9]+/g)[0]),
            operation : math_it_up(el[2].split(' = ')[1]),
            test(n){
                return ((n % this.divider) == 0) ? true : false;
            },
        };
    });

    for (let round = 0; round < 20; round++){
        for ( let monkey of monkeys){
            for (i = 0; i < monkey.items.length; i++)
            {
                let item = monkey.items[i];
                monkey.inspected++;
                let worry = Math.floor(monkey.operation(item) / 3);
                if (monkey.test(worry)) {
                    monkeys[monkey.true_push].items.push(worry);
                } else {
                    monkeys[monkey.false_push].items.push(worry);
                }
            }
            monkey.items = [];
        }
    }

    let inspected_count = monkeys.map(el => el.inspected).sort((a,b) => b-a);

    console.log(monkeys);