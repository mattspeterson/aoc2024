function Solve1() {
    let rules = new Map();
    let updates = [];
    let middles = [];

    input.split(/[\r\n]+/).forEach(line => {
        if (line.indexOf("|") >= 0) {
            let rule = line.split("|");
            rules.getoradd(rule[0], []).push(rule[1]);
        } else {
            updates.push(line.split(","));
        }
    });

    updates.forEach(update => {
        let isCorrect = true;

        for (let i = update.length - 1; i > 0; i--) {
            let updatePage = update[i];

            if (rules.has(updatePage) && _.intersection(rules.get(updatePage), update.slice(0, i)).length > 0) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect)
            middles.push(update[Math.floor(update.length / 2)]);
    });

    txtAnswer.value = middles.reduce((acc, current) => acc + parseInt(current), 0);
}

function Solve2() {
    let rules = new Map();
    let updates = [];
    let middles = [];

    input.split(/[\r\n]+/).forEach(line => {
        if (line.indexOf("|") >= 0) {
            let rule = line.split("|");
            rules.getoradd(rule[0], []).push(rule[1]);
        } else {
            updates.push(line.split(","));
        }
    });

    updates.forEach(update => {
        let wasIncorrect = false;

        for (let i = update.length - 1; i > 0; i--) {
            let updatePage = update[i];

            if (rules.has(updatePage)) {
                let pageRules = rules.get(updatePage);
                let anySwaps = false;

                for (let j = i - 1; j >= 0; j--) {
                    if (pageRules.includes(update[j])) {
                        let temp = update[j];
                        update[j] = update[i];
                        update[i] = temp;
                        anySwaps = true;
                        break;
                    }
                }

                // If we swapped any elements, we need to force the main index to not
                // decrement so we recheck everything again starting at the same place.
                if (anySwaps) {
                    wasIncorrect = true;
                    i += 1;
                }
            }
        }

        if (wasIncorrect)
            middles.push(update[Math.floor(update.length / 2)]);
    });

    txtAnswer.value = middles.reduce((acc, current) => acc + parseInt(current), 0);
}