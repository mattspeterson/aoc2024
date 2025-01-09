const sizeX = 101;
const sizeY = 103;

function GetRobots() {
    let robots = [];

    input.split(/[\r\n]+/).forEach(row => {
        let robotStart = row.split(" ");
        let position = robotStart[0].replace("p=", "").split(",");
        let velocity = robotStart[1].replace("v=", "").split(",");

        robots.push({
            X: parseInt(position[0]),
            Y: parseInt(position[1]),
            DX: parseInt(velocity[0]),
            DY: parseInt(velocity[1])
        });
    });

    return robots;
}

function Solve1() {
    let robots = GetRobots();
    const seconds = 100;

    for (let second = 0; second < seconds; second++) {
        robots.forEach(robot => {
            let newX = robot.X + robot.DX;
            let newY = robot.Y + robot.DY;

            robot.X = newX >= sizeX ? newX - sizeX : (newX < 0 ? newX + sizeX : newX);
            robot.Y = newY >= sizeY ? newY - sizeY : (newY < 0 ? newY + sizeY : newY);
        });
    }

    const middleX = Math.floor(sizeX / 2);
    const middleY = Math.floor(sizeY / 2);
    let counts = [0, 0, 0, 0];

    robots.forEach(robot => {
        
        if (robot.X < middleX && robot.Y < middleY)
            counts[0] += 1;
        else if (robot.X > middleX && robot.Y < middleY)
            counts[1] += 1;
        else if (robot.X > middleX && robot.Y > middleY)
            counts[2] += 1;
        else if (robot.X < middleX && robot.Y > middleY)
            counts[3] += 1;            
    });

    txtAnswer.value = counts.reduce((acc, cur) => acc * cur, 1);
}

function Solve2() {
    let robots = GetRobots();
    const seconds = 100000;

    for (let second = 0; second < seconds; second++) {
        let positions = new Set();

        robots.forEach(robot => {
            let newX = robot.X + robot.DX;
            let newY = robot.Y + robot.DY;

            robot.X = newX >= sizeX ? newX - sizeX : (newX < 0 ? newX + sizeX : newX);
            robot.Y = newY >= sizeY ? newY - sizeY : (newY < 0 ? newY + sizeY : newY);
            positions.add(`${robot.Y},${robot.X}`);
        });

        // How many robots have many neighbors?
        let crowdedRobots = 0;
        robots.forEach(robot => {
            let neighbors = 0;
            [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach(direction => {
                if (positions.has(`${robot.Y + direction[0]},${robot.X + direction[1]}`))
                    neighbors += 1;
            });

            if (neighbors == 8)
                crowdedRobots += 1;
        });

        if (crowdedRobots > 0)
            console.log(crowdedRobots + " - at " + second + 1 + " seconds");
    }
}
