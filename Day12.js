// The order matters here (clockwise or counterclockwise) for corner checking.
const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];

function IsGood(x, y, direction, garden) {
    let checkX = x + direction[1];
    let checkY = y + direction[0];

    if (checkX >= 0 && checkX < garden[0].length && checkY >= 0 && checkY < garden.length && garden[checkY][checkX] == garden[y][x])
        return true;

    return false;
}

function Explore(x, y, currentType, visited, garden) {
    visited.add(`${x}|${y}`);
    currentType.Cells += 1;

    // The number of sides is equal to the number of corners.
    for (let i = 0; i < directions.length; i++) {
        let neighbor1 = directions[i];
        let neighbor2 = directions[(i + 1) % directions.length];

        if (!IsGood(x, y, neighbor1, garden) && !IsGood(x, y, neighbor2, garden))
            currentType.CornerCells += 1;

        if (IsGood(x, y, neighbor1, garden) && IsGood(x, y, neighbor2, garden) && !IsGood(x, y, [neighbor1[0] + neighbor2[0], neighbor1[1] + neighbor2[1]], garden))
            currentType.CornerCells += 1;

        // If we're off the edge of the garden or next to a cell of a different type, add to the perimeter.
        if (!IsGood(x, y, neighbor1, garden))
            currentType.PerimeterCells += 1;
        else if (!visited.has(`${x + neighbor1[1]}|${y + neighbor1[0]}`))
            Explore(x + neighbor1[1], y + neighbor1[0], currentType, visited, garden);
    }
}

function Solve(garden, sections) {
    let visited = new Set();

    input.split(/[\r\n]+/).forEach(row => {
        garden.push(row.split(""));
    });

    for (let y = 0; y < garden.length; y++) {
        for (let x = 0; x < garden[0].length; x++) {

            if (visited.has(`${x}|${y}`))
                continue;

            let currentType = { Type: garden[y][x], Cells: 0, PerimeterCells: 0, CornerCells: 0 };
            Explore(x, y, currentType, visited, garden);
            sections.push(currentType);
        }
    }
}

function Solve1() {
    let garden = [];
    let sections = [];
    Solve(garden, sections);
    txtAnswer.value = sections.reduce((acc, curr) => acc + curr.Cells * curr.PerimeterCells, 0);
}

function Solve2() {
    let garden = [];
    let sections = [];
    Solve(garden, sections);
    txtAnswer.value = sections.reduce((acc, curr) => acc + curr.Cells * curr.CornerCells, 0);
}
