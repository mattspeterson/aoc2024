function Explore1(x, y, headX, headY, map, trails) {

    if (map[y][x] == "9") {
        if (!trails.get(`${headX}|${headY}`).includes(`${x}|${y}`)) {
            trails.get(`${headX}|${headY}`).push(`${x}|${y}`);
            return;
        }                
    }

    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(direction => {
        let newX = x + direction[0];
        let newY = y + direction[1]

        if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length)
            if (parseInt(map[newY][newX]) == parseInt(map[y][x]) + 1)
                Explore1(newX, newY, headX, headY, map, trails);
    });
}

function Explore2(x, y, headX, headY, map, trails) {

    if (map[y][x] == "9") {
        trails.get(`${headX}|${headY}`).push(`${x}|${y}`);
        return;    
    }

    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(direction => {
        let newX = x + direction[0];
        let newY = y + direction[1]

        if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length)
            if (parseInt(map[newY][newX]) == parseInt(map[y][x]) + 1)
                Explore2(newX, newY, headX, headY, map, trails);
    });
}

function Solve(exploreFunction) {
    let map = [];

    input.split(/[\r\n]+/).forEach(row => {
        map.push(row.split(""));
    });

    const maxX = map[0].length;
    const maxY = map.length;
    let trails = new Map();

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] == "0") {
                trails.set(`${x}|${y}`, []);
                exploreFunction(x, y, x, y, map, trails);
            }
        }
    }

    txtAnswer.value = trails.values().reduce((accumulator, current) => accumulator + current.length, 0);
}

function Solve1() {
    Solve(Explore1);
}

function Solve2() {
    Solve(Explore2);
}