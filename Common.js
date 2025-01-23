const btnSolve1 = document.getElementById("btnSolve1");
const btnSolve2 = document.getElementById("btnSolve2");
const txtAnswer = document.getElementById("txtAnswer");
const fileInput = document.getElementById("fileInput");
const fileReader = new FileReader();

let input = "";

fileReader.addEventListener("load", () => { input = fileReader.result.trim(); });
fileInput.addEventListener("change", event => { fileReader.readAsText(event.target.files[0]); });
btnSolve1.addEventListener("click", Solve1);
btnSolve2.addEventListener("click", Solve2);

Object.defineProperty(Map.prototype, "getoradd", {
    value: function (key, initial) {
        if (!this.has(key))
            this.set(key, initial);

        return this.get(key);
    }
});

function Print(maze) {
    let output = "";

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++)
            output += maze[i][j];

        output += "\n";
    }

    return output;
}

// function Explore(maze, x, y, direction) {
//     let queue = [];
//     let bestScores = new Map();
//     queue.push({X: x, Y: y, Direction: direction, Points: 0, Visited: []});

//     while (queue.length > 0) {
//         let current = queue.shift();
//         current.Visited.push(`${current.X},${current.Y}`);
//         bestScores.set(`${current.X},${current.Y}`, current.Points);

//         if (maze[current.Y][current.X] == "E" && current.Points <= bestPoints) {
//             bestPoints = current.Points;
//             paths.push({ Score: current.Points, Path: current.Visited });
//         } else {
//             DirectionOptions(current.Direction).forEach(newDirection => {
//                 let offset = OffsetFromDirection(newDirection);
//                 let newX = current.X + offset[0], newY = current.Y + offset[1];
//                 let newPoints = current.Direction == newDirection ? current.Points + 1 : current.Points + 1001;

//                 // If the new spot 1) is a wall, 2) we've already been to it in this recursive
//                 // branch, or 3) will exceed our best point total discovered so far, skip it.
//                 if (maze[newY][newX] == "#" || current.Visited.includes(`${newX},${newY}`) || newPoints > bestPoints || bestScores.get(`${newX},${newY}`) < newPoints)
//                     return;

//                 queue.push({X: newX, Y: newY, Direction: newDirection, Points: newPoints, Visited: current.Visited.slice()});
//             });
//         }
//     }
// }