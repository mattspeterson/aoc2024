function ReadMachines() {
    let machines = [];
    let lines = input.split(/[\r\n]+/);

    for (let i = 0; i < lines.length; i += 3) {
        let aLine = lines[i].split(", ");
        let bLine = lines[i+1].split(", ");
        let prizeLine = lines[i+2].split(", ");

        machines.push({
            AX: parseInt(aLine[0].replace("Button A: X+", "")),
            AY: parseInt(aLine[1].replace("Y+", "")),
            BX: parseInt(bLine[0].replace("Button B: X+", "")),
            BY: parseInt(bLine[1].replace("Y+", "")),
            PrizeX: parseInt(prizeLine[0].replace("Prize: X=", "")),
            PrizeY: parseInt(prizeLine[1].replace("Y=", ""))
        });
    }

    return machines;
}

function Solve1() {
    let machines = ReadMachines();
    let tokens = 0;

    machines.forEach(m => {
        for (let b = 0; b * m.BX < m.PrizeX && b * m.BY <= m.PrizeY; b++) {
            for (let a = 0; a * m.AX <= m.PrizeX && a * m.AY <= m.PrizeY; a++) {
                if ((b * m.BX) + (a * m.AX) == m.PrizeX && (b * m.BY) + (a * m.AY) == m.PrizeY)
                    tokens += b + (a * 3);
            }
        }
    });

    txtAnswer.value = tokens;
}

// The numbers are too big to brute force now...have to solve simulaneous equations.
function Solve2() {
    let machines = ReadMachines();
    let tokens = 0;

    machines.forEach(m => {
        m.PrizeX += 10000000000000;
        m.PrizeY += 10000000000000;

        let b = (m.PrizeY * m.AX - m.PrizeX * m.AY) / (m.BY * m.AX - m.BX * m.AY);
        let a = (m.PrizeX - b * m.BX) / m.AX;

        // JS doesn't handle math and equality on large floating point numbers well, so
        // we have to make sure that our button presses are whole numbers (as well as
        // actually being the correct answers, of course).
        if ((a % 1 == 0) && (b % 1 == 0) && (a * m.AX + b * m.BX === m.PrizeX) && (a * m.AY + b * m.BY === m.PrizeY)) {
            tokens += b + 3 * a;
        }
    });

    txtAnswer.value = tokens;
}
