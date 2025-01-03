function Solve1() {
    let list1 = [], list2 = [];

    input.split(/[\r\n]+/).forEach(row => {
        let rowParts = row.split(/\s+/);
        list1.push(parseInt(rowParts[0], 10));
        list2.push(parseInt(rowParts[1], 10));
    });

    list1.sort();
    list2.sort();

    let total = 0;

    for (let i = 0; i < list1.length; i++) {
        total += Math.abs(list1[i] - list2[i]);
    }

    txtAnswer.value = total;
}

function Solve2() {
    let list1 = [], list2 = [];

    input.split(/[\r\n]+/).forEach(row => {
        let rowParts = row.split(/\s+/);
        list1.push(parseInt(rowParts[0], 10));
        list2.push(parseInt(rowParts[1], 10));
    });

    let list2counts = new Map();
    let total = 0;

    // Count the occurances of each ID in list 2.
    list2.forEach(id => {
        if (list2counts.has(id))
            list2counts.set(id, list2counts.get(id) + 1);
        else
            list2counts.set(id, 1);
    });

    // Now go through list 1 and compute the similarity.
    list1.forEach(id => {
        if (list2counts.has(id))
            total += id * list2counts.get(id);
    });

    txtAnswer.value = total;
}