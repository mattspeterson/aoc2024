const btnSolve1 = document.getElementById("btnSolve1");
const btnSolve2 = document.getElementById("btnSolve2");
const txtAnswer = document.getElementById("txtAnswer");
const fileInput = document.getElementById("fileInput");
const fileReader = new FileReader();

let input = "";

fileReader.addEventListener("load", () => { input = fileReader.result.trim(); });
fileInput.addEventListener("change", event => { fileReader.readAsText(event.target.files[0]); });
btnSolve1.addEventListener("click", Solve1);
btnSolve2.addEventListener("click", Solve2);

Object.defineProperty(Map.prototype, "getoradd", {
    value: function (key, initial) {
        if (!this.has(key))
            this.set(key, initial);

        return this.get(key);
    }
});