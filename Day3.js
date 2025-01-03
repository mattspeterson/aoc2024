const innerRegex = /[0-9]{1,3}/g;

function Solve1() {
    const outerRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
    let matches = input.trim().matchAll(outerRegex);
    let total = 0;

    for (const match of matches) {
        let matchText = match[0];
        let numbers = [...matchText.matchAll(innerRegex)];
        let product = 0;

        if (numbers.length == 2) {
            product = parseInt(numbers[0]) * parseInt(numbers[1]);
        }

        total += product;
    }

    txtAnswer.value = total;
}

function Solve2() {
    const outerRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g;
    let matches = input.trim().matchAll(outerRegex);
    let enabled = true;
    let total = 0;

    for (const match of matches) {
        let matchText = match[0];

        if (matchText.startsWith("do(")) {
            enabled = true;
        } else if (matchText.startsWith("don't(")) {
            enabled = false;
        } else if (enabled) {                    
            let numbers = [...matchText.matchAll(innerRegex)];
            let product = 0;

            if (numbers.length == 2) {
                product = parseInt(numbers[0]) * parseInt(numbers[1]);
            }

            total += product;
        }
    }

    txtAnswer.value = total;
}