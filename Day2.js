function IsSafe(levels) {
    let direction = levels[0] - levels[1] > 0 ? 0 : 1;

    for (let i = 0; i < levels.length - 1; i++) {
        let change = levels[i] - levels[i + 1];

        // Check for level of change
        if (Math.abs(change) < 1 || Math.abs(change) > 3)
            return false;

        // Check for change in direction
        let newDirection = levels[i] - levels[i + 1] > 0 ? 0 : 1;

        if (newDirection != direction)
            return false;

        direction = newDirection;
    }

    return true;
}

function Solve1() {
    let numberSafe = 0;

    input.trim().split(/[\r\n]+/).forEach(row => {
        let levels = row.split(" ").map(x => parseInt(x, 10));

        if (levels.length < 2) return;
            
        if (IsSafe(levels))
            numberSafe += 1;
    });

    txtAnswer.value = numberSafe;
}

function Solve2() {
    let numberSafe = 0;

    input.trim().split(/[\r\n]+/).forEach(row => {
        let levels = row.split(" ").map(x => parseInt(x, 10));

        if (levels.length < 2) return;
            
        if (IsSafe(levels)) {
            numberSafe += 1;
        } else if (levels.length >= 3) {

            for (let i = 0; i < levels.length; i++) {
                let levelsCopy = Array.from(levels);
                levelsCopy.splice(i, 1);

                if (IsSafe(levelsCopy)) {
                    numberSafe += 1;
                    break;
                }
            }
        }
    });

    txtAnswer.value = numberSafe;
}