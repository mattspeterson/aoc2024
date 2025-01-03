function Solve1() {
    let id = 0;
    let blocks = [];

    // Start by expanding the input.
    for (let i = 0; i < input.trim().length; i++) {

        // Is this a file or free space?
        if (i % 2 == 0) {
            _.times(input[i], () => { blocks.push(id.toString()); });
            id += 1;
        } else {
            _.times(input[i], () => { blocks.push("."); });
        }
    }

    // Now let's defrag.
    let start = 0, end = blocks.length - 1;

    while (true) {
        while (blocks[start] != "." && start < blocks.length) start += 1;
        while (blocks[end] == "." && end >= 0) end -= 1;

        if (start >= end)
            break;

        blocks[start] = blocks[end];
        blocks[end] = ".";
    }

    // Finally, compute the checksum.
    let checksum = 0;

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] == ".") break;
        checksum += i * parseInt(blocks[i]);
    }

    txtAnswer.value = checksum;
}

function Solve2() {
    let id = 0;
    let blocks = [];

    // Start by expanding the input.
    for (let i = 0; i < input.trim().length; i++) {

        // Is this a file or free space?
        if (i % 2 == 0) {
            blocks.push({ Id: id, Size: parseInt(input[i]) });
            id += 1;
        } else {
            blocks.push({ Id: -1, Size: parseInt(input[i]) });
        }
    }

    // Now let's defrag.
    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i].Id == -1) continue;

        for (let j = 0; j < i; j++) {
            if (blocks[j].Id == -1 && blocks[j].Size >= blocks[i].Size) {
                let size = blocks[i].Size;
                let freeSize = blocks[j].Size;
                blocks[j].Id = blocks[i].Id;
                blocks[j].Size = size;
                blocks[i].Id = -1;

                if (freeSize > size)
                    blocks.splice(j + 1, 0, { Id: -1, Size: freeSize - size });
                
                break;
            }
        }
    }

    // Finally, compute the checksum.
    let checksum = 0;
    let position = 0;

    blocks.forEach(block => {
        if (block.Id == -1) {
            position += block.Size
        } else {
            for (let i = 0; i < block.Size; i++) {
                checksum += position * block.Id;
                position += 1;
            }
        }
    });

    txtAnswer.value = checksum;
}