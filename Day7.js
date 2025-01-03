// Had some help on this one, but can't find the source now...
function GenerateCombinations(options, count) {
    if (count === 0) return [[]];

    const result = [];

    for (const option of options) {
        const subCombinations = GenerateCombinations(options, count - 1);

        for (const subCombination of subCombinations)
            result.push([option, ...subCombination]);
    }

    return result;
}

function IsEquationTrue(operands, operators, answer) {
    let result = operands[0];

    for (let i = 0; i < operators.length; i++) {
        
        if (operators[i] == "+")
            result += operands[i + 1];
        else if (operators[i] == "*")
            result *= operands[i + 1];
        else
            result = parseInt(`${result}${operands[i + 1]}`);

        // Since all of the allowed operators are additive (and there are no 
        // negative or fractional operands) we can bail if we exceed the answer.
        if (result > answer)
            break;            
    }

    return result == answer;
}

function Solve(operators) {
    let equations = [];
    let allOperatorCombinations = new Map();

    input.trim().split(/[\r\n]+/).forEach(line => {
        let equation = {};
        let parts = line.split(":");
        equation.Answer = parseInt(parts[0]);
        equation.Operands = [];
        let operands = parts[1].trim().split(" ");

        operands.forEach(operand => {
            equation.Operands.push(parseInt(operand.trim()));
        });

        let operatorCombinations = [];
        let operatorCount = equation.Operands.length - 1;

        if (allOperatorCombinations.has(operatorCount)) {
            operatorCombinations = allOperatorCombinations.get(operatorCount);
        } else {
            operatorCombinations = GenerateCombinations(operators, operatorCount)
            allOperatorCombinations.set(operatorCount, operatorCombinations);
        }

        let canBeTrue = false;

        for (let i = 0; i < operatorCombinations.length; i++) {

            if (IsEquationTrue(equation.Operands, operatorCombinations[i], equation.Answer)) {
                canBeTrue = true;
                break;
            }
        }

        equation.IsTrue = canBeTrue;
        equations.push(equation);
    });

    return equations.reduce((acc, current) => acc + (current.IsTrue ? current.Answer : 0), 0);
}

function Solve1() {
    txtAnswer.value = Solve(["+", "*"]);
}

function Solve2() {
    txtAnswer.value = Solve(["+", "*", "||"]);
}