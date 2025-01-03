const DIR_UP = "^", DIR_RIGHT = ">", DIR_DOWN = "v", DIR_LEFT = "<", OBSTACLE = "#";

const directions = new Map();
directions.set(DIR_UP, { XOffset: 0, YOffset: -1, TurnDirection: DIR_RIGHT });
directions.set(DIR_DOWN, { XOffset: 0, YOffset: 1, TurnDirection: DIR_LEFT });
directions.set(DIR_LEFT, { XOffset: -1, YOffset: 0, TurnDirection: DIR_UP });
directions.set(DIR_RIGHT, { XOffset: 1, YOffset: 0, TurnDirection: DIR_DOWN });

function LoadMaze(input) {
    let y = 0;
    let maze = [];
    let guardX = 0, guardY = 0, guardDirection = "";

    input.trim().split(/[\r\n]+/).forEach(line => {
        let row = line.split("");

        for (let x = 0; x < row.length; x++) {
            if (Array.from(directions.keys()).includes(row[x])) {
                guardX = x;
                guardY = y;
                guardDirection = row[x];
            }
        }

        maze.push(row);
        y += 1;
    });

    return {
        Maze: maze,
        GuardX: guardX,
        GuardY: guardY,
        GuardDirection: guardDirection
    };
}

function Solve1() {
    let mazeResults = LoadMaze(input);
    let maze = mazeResults.Maze, guardX = mazeResults.GuardX, guardY = mazeResults.GuardY, guardDirection = mazeResults.GuardDirection;
    let visitedSpots = new Set();

    while (true) {
        let visitedString = `${guardX}|${guardY}`;

        if (!visitedSpots.has(visitedString))
            visitedSpots.add(visitedString);

        let direction = directions.get(guardDirection);
        let newX = guardX + direction.XOffset;
        let newY = guardY + direction.YOffset;        

        if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length) {
            break;
        } else if (maze[newY][newX] == OBSTACLE) {
            guardDirection = direction.TurnDirection;            
        } else {
            guardX = newX;
            guardY = newY;
        }
    }

    txtAnswer.value = visitedSpots.size;
}

function HasLoop(maze, guardX, guardY, guardDirection, obstacleX, obstacleY) {
    let visitedSpots = new Set();
    let hasLoop = false;

    while (true) {
        // We have to include the direction because simply crossing
        // over your previous path doesn't count as a loop.
        let visitedString = `${guardX}|${guardY}|${guardDirection}`;

        if (visitedSpots.has(visitedString)) {
            hasLoop = true;
            break;
        }

        visitedSpots.add(visitedString);

        let direction = directions.get(guardDirection);
        let newX = guardX + direction.XOffset;
        let newY = guardY + direction.YOffset;

        if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length) {
            break;
        } else if (maze[newY][newX] == OBSTACLE || (newX == obstacleX && newY == obstacleY)) {
            guardDirection = direction.TurnDirection;
            direction = directions.get(guardDirection);
        } else {
            guardX = newX;
            guardY = newY;
        }
    }

    return hasLoop;
}

function Solve2() {
    let mazeResults = LoadMaze(input);
    let maze = mazeResults.Maze, guardX = mazeResults.GuardX, guardY = mazeResults.GuardY, guardDirection = mazeResults.GuardDirection;
    let obstaclePositions = 0;

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {

            if (maze[y][x] == OBSTACLE || (y == guardY && x == guardX))
                continue;

            if (HasLoop(maze, guardX, guardY, guardDirection, x, y))
                obstaclePositions += 1;
        }
    }

    txtAnswer.value = obstaclePositions;
}