// https://www.youtube.com/watch?v=yxHSWwrq4JQ&t=8221s
function Blink(counts) {
    let newCounts = new Map();

    counts.forEach((value, key) => {
        if (key == 0) {
            newCounts.set(1, newCounts.getoradd(1, 0) + value);
        } else if (key.toString().length % 2 == 0) {
            let stoneAsString = key.toString();
            let first = parseInt(stoneAsString.substring(0, stoneAsString.length / 2));
            let second = parseInt(stoneAsString.substring(stoneAsString.length / 2));
            newCounts.set(first, newCounts.getoradd(first, 0) + value);
            newCounts.set(second, newCounts.getoradd(second, 0) + value);
        } else {
            newCounts.set(key * 2024, newCounts.getoradd(key * 2024, 0) + value);
        }
    });

    console.log(newCounts);
    return newCounts;
}

function ParseInput() {
    let counts = new Map();

    input.split(" ").forEach(stone => {
        stoneCount = counts.getoradd(parseInt(stone), 0);
        counts.set(parseInt(stone), stoneCount + 1);
    });

    return counts;
}

function Solve1() {
    let counts = ParseInput();

    for (let i = 0; i < 25; i++)
        counts = Blink(counts);

    txtAnswer.value = counts.values().reduce((acc, cur) => acc + cur);
}

function Solve2() {
    let counts = ParseInput();

    for (let i = 0; i < 75; i++)
        counts = Blink(counts);

    txtAnswer.value = counts.values().reduce((acc, cur) => acc + cur);
}