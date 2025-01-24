const sizeX = 71, sizeY = 71, fallSize = 1024;

// https://stackoverflow.com/a/46395006/19036, except I don't need the 
// whole path, just the number of steps it took to get to each spot.
function Explore(maze, startX, startY, targetX, targetY) {
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    
    let queue = [];
    maze[startY][startX] = "*";
    queue.push([startX, startY, 0]);

    while (queue.length > 0) {
        let position = queue.shift();

        for (let i = 0; i < directions.length; i++) {
            let newX = position[0] + directions[i][0];
            let newY = position[1] + directions[i][1];
            let newCount = position[2] + 1;

            if (newX == targetX && newY == targetY)
                return newCount;

            if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length || maze[newY][newX] != " ")
                continue;

            maze[newY][newX] = "*";
            queue.push([newX, newY, newCount]);
        }
    }
}

function ClearMaze(maze) {
    for (let y = 0; y < maze.length; y++)
        for (let x = 0; x < maze[y].length; x++)
            if (maze[y][x] == "*") maze[y][x] = " ";
}

function Solve1() {
    let maze = [];

    for (let y = 0; y < sizeY; y++)
        maze.push(Array(sizeX).fill(" "));

    let coords = [];
    input.split(/[\r\n]+/).forEach(row => {
        let rowSplit = row.trim().split(",");
        coords.push([parseInt(rowSplit[0]), parseInt(rowSplit[1])]);
    });

    for (let i = 0; i < fallSize; i++)
        maze[coords[i][1]][coords[i][0]] = "#";

    let shortestPath = Explore(maze, 0, 0, sizeX - 1, sizeY - 1);
    txtAnswer.value = shortestPath;
}

function Solve2() {
    let maze = [];

    for (let y = 0; y < sizeY; y++)
        maze.push(Array(sizeX).fill(" "));

    let coords = [];
    input.split(/[\r\n]+/).forEach(row => {
        let rowSplit = row.trim().split(",");
        coords.push([parseInt(rowSplit[0]), parseInt(rowSplit[1])]);
    });

    for (let i = 0; i < fallSize; i++)
        maze[coords[i][1]][coords[i][0]] = "#";

    let failX = 0, failY = 0;

    for (let i = fallSize; i < coords.length; i++) {
        ClearMaze(maze);
        maze[coords[i][1]][coords[i][0]] = "#";
     
        if (!Explore(maze, 0, 0, sizeX - 1, sizeY - 1)) {
            failX = coords[i][0];
            failY = coords[i][1];
            break;
        }
    }

    txtAnswer.value = `${failX},${failY}`;
}
