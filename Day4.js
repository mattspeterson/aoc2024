function Search(words, targets, xStart, yStart, xOffset, yOffset, xReset, yReset, results) {
    let buffer = "";
    let rows = words.length;
    let cols = words[0].length;
    let x = xStart, xCurrent = xStart;
    let y = yStart, yCurrent = yStart;

    while (x >= 0 && x < cols && y >= 0 && y < rows) {
        buffer = (buffer + words[y][x]).slice(-targets[0].length);

        if (targets.includes(buffer)) {
            results.Count += 1;
            results.Coordinates.push((x - xOffset).toString() + "|" + (y - yOffset).toString());
        }

        x += xOffset;
        y += yOffset;

        if (x < 0 || x >= cols || y < 0 || y >= rows) {
            x = xReset == 0 ? xStart : xCurrent + xReset;
            y = yReset == 0 ? yStart : yCurrent + yReset;
            xCurrent = x;
            yCurrent = y;
            buffer = "";
        }
    }
}

function Solve1() {
    let words = [];
    let rows = input.trim().split(/[\r\n]+/);

    rows.forEach(row => {
        words.push(Array.from(row));
    });

    const targets = ["XMAS", "SAMX"];
    let results = {
        Count: 0,
        Coordinates: []
    };

    // Horizontal
    Search(words, targets, 0, 0, 1, 0, 0, 1, results);

    // Vertical
    Search(words, targets, 0, 0, 0, 1, 1, 0, results);

    // Diagonals
    Search(words, targets, 0, 0, 1, -1, 0, 1, results);
    Search(words, targets, 1, words.length - 1, 1, -1, 1, 0, results);
    Search(words, targets, words[0].length - 1, 0, -1, -1, 0, 1, results);
    Search(words, targets, words[0].length - 2, words.length - 1, -1, -1, -1, 0, results);

    txtAnswer.value = results.Count;
}

function Solve2() {
    let words = [];
    let rows = input.trim().split(/[\r\n]+/);

    rows.forEach(row => {
        words.push(Array.from(row));
    });

    const targets = ["MAS", "SAM"];
    let results = {
        Count: 0,
        Coordinates: []
    };

    // Diagonals
    Search(words, targets, 0, 0, 1, -1, 0, 1, results);
    Search(words, targets, 1, words.length - 1, 1, -1, 1, 0, results);
    Search(words, targets, words[0].length - 1, 0, -1, -1, 0, 1, results);
    Search(words, targets, words[0].length - 2, words.length - 1, -1, -1, -1, 0, results);

    const coordinateCounts = {};

    results.Coordinates.forEach(coordinate => {
        coordinateCounts[coordinate] = coordinateCounts[coordinate] ? coordinateCounts[coordinate] + 1 : 1;
    });

    let counter = 0;

    for (const key in coordinateCounts) {
        if (coordinateCounts[key] >= 2)
            counter += 1;
    }

    txtAnswer.value = counter;
}