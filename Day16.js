// Inspired by https://github.com/RD-Dev-29/advent_of_code_24/blob/main/code_files/day16.py

function DirectionOptions(direction) {
    if (direction == "E")
        return ["E", "N", "S"];
    else if (direction == "W")
        return ["W", "N", "S"];
    else if (direction == "S")
        return ["S", "E", "W"];
    else if (direction == "N")
        return ["N", "E", "W"];
    else
        return ["N", "E", "W", "S"];
}

function OffsetFromDirection(direction) {
    if (direction == "E")
        return [1, 0];
    else if (direction == "W")
        return [-1, 0];
    else if (direction == "S")
        return [0, 1];
    else
        return [0, -1];
}

function Explore(maze, x, y, direction, points) {

    if ([".", "S", "E"].includes(maze[y][x]) || maze[y][x] > points)
        maze[y][x] = points;

    DirectionOptions(direction).forEach(newDirection => {
        let offset = OffsetFromDirection(newDirection);
        let newX = x + offset[0], newY = y + offset[1];
        let newPoints = direction == newDirection ? points + 1 : points + 1001;

        if (maze[newY][newX] == "#" || maze[newY][newX] < newPoints)
            return;

        Explore(maze, newX, newY, newDirection, newPoints);
    });
}

function ExploreBackwards(maze, x, y, direction, points, bestSpots) {

    if (maze[y][x] == "#" || maze[y][x] > points)
        return;
    
    bestSpots.add(`${x},${y}`);

    DirectionOptions(direction).forEach(newDirection => {
        let offset = OffsetFromDirection(newDirection);
        let newX = x + offset[0], newY = y + offset[1];
        let newPoints = direction == newDirection || direction == "" ? points - 1 : points - 1001;
        ExploreBackwards(maze, newX, newY, newDirection, newPoints, bestSpots);
    });
}

function Solve1() {
    let maze = [];
    let startX = 0, startY = 0, endX = 0, endY = 0, y = 0;

    input.trim().split(/[\r\n]+/).forEach(row => {
        let startIndex = row.indexOf("S");
        let endIndex = row.indexOf("E");

        if (startIndex >= 0) {
            startX = startIndex;
            startY = y;
        }

        if (endIndex >= 0) {
            endX = endIndex;
            endY = y;
        }        

        maze.push(row.split(""));
        y += 1;
    });

    Explore(maze, startX, startY, "E", 0);
    txtAnswer.value = maze[endY][endX];
}

function Solve2() {
    let maze = [];
    let startX = 0, startY = 0, endX = 0, endY = 0, y = 0;

    input.trim().split(/[\r\n]+/).forEach(row => {
        let startIndex = row.indexOf("S");
        let endIndex = row.indexOf("E");

        if (startIndex >= 0) {
            startX = startIndex;
            startY = y;
        }

        if (endIndex >= 0) {
            endX = endIndex;
            endY = y;
        }

        maze.push(row.split(""));
        y += 1;
    });

    let bestSpots = new Set();
    Explore(maze, startX, startY, "E", 0);
    ExploreBackwards(maze, endX, endY, "", maze[endY][endX], bestSpots);
    txtAnswer.value = bestSpots.size;
}

