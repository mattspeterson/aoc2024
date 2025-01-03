const ANTENNA = /[A-Za-z0-9]/g;

function FillMap(map, antennas) {
    let y = 0;

    // Scan through the map and organize the antennas into a Map object, grouped by "frequency".
    map.forEach(line => {
        let cells = line.trim().split("");

        for (let x = 0; x < cells.length; x++)
            if (cells[x].match(ANTENNA))
                antennas.getoradd(cells[x], []).push([x, y]);

        y += 1;
    });
}

function Solve1() {
    let antennas = new Map();
    let map = input.trim().split(/[\r\n]+/);
    const MAX_Y = map.length - 1, MAX_X = map[0].length -1;

    FillMap(map, antennas);
    let antinodes = new Set();

    // For each antenna frequency...
    antennas.keys().forEach(antennaKey => {
        let antennaLocations = antennas.get(antennaKey);

        // And each location for that frequency...
        antennaLocations.forEach(antennaLocation => {
            let baseX = antennaLocation[0];
            let baseY = antennaLocation[1];

            // Compute it's offset to each other antenna of the same frequency
            antennaLocations.forEach(otherLocation => {
                let otherX = otherLocation[0];
                let otherY = otherLocation[1];

                // If this isn't our own location...
                if (baseX != otherX || baseY != otherY) {
                    let offsetX = otherX - baseX, offsetY = otherY - baseY;
                    let newX = baseX + (2 * offsetX), newY = baseY + (2 * offsetY);

                    // If it is within the bounds of the map, log it.
                    if (newX >= 0 && newX <= MAX_X && newY >= 0 && newY <= MAX_Y)
                        antinodes.add(`${newX}|${newY}`);
                }
            });
        });
    });

    txtAnswer.value = antinodes.size;
}

function Solve2() {
    let antennas = new Map();
    let map = input.trim().split(/[\r\n]+/);
    const MAX_Y = map.length - 1, MAX_X = map[0].length -1;

    FillMap(map, antennas);
    let antinodes = new Set();

    // For each antenna frequency...
    antennas.keys().forEach(antennaKey => {
        let antennaLocations = antennas.get(antennaKey);

        // And each location for that frequency...
        antennaLocations.forEach(antennaLocation => {
            let baseX = antennaLocation[0];
            let baseY = antennaLocation[1];

            // Compute it's offset to each other antenna of the same frequency
            antennaLocations.forEach(otherLocation => {
                let otherX = otherLocation[0];
                let otherY = otherLocation[1];

                // If this isn't our own location...
                if (baseX != otherX || baseY != otherY) {
                    let offsetX = otherX - baseX, offsetY = otherY - baseY;
                    let newX = otherX, newY = otherY;

                    while (newX >= 0 && newX <= MAX_X && newY >= 0 && newY <= MAX_Y) {

                        // If it is within the bounds of the map, log it.
                        antinodes.add(`${newX}|${newY}`);
                        newX += offsetX, newY += offsetY;
                    }
                }
            });
        });
    });

    txtAnswer.value = antinodes.size;
}