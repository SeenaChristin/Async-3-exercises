const fetch = require("node-fetch");

async function readMainArray() {
  const response = await fetch("http://localhost:3000/initialize");
  const mainArray = await response.json();
  return mainArray;
}
async function readOneVal(row, col) {
  const response = await fetch(
    `http://localhost:3000/value?rowIndex=${row}&colIndex=${col}`
  );
  const val = await response.json();
  return val;
}

async function readTwoVal(row, col, rowLength, colLength) {
  let promisesVal = [];
  let i = 0;
  while (i < 2 && row < rowLength) {
    promisesVal.push(await readOneVal(row, col));
    col++;
    if (col > colLength) {
      row = row + 1;
      col = 0;
    }
    i++;
  }
  return promisesVal;
}

async function main(row, col) {
  let mainArray = await readMainArray();
  while (row < mainArray.length && col < mainArray[row].length) {
    let rowLength = mainArray.length;
    let colLength = mainArray[row].length;
    let values = await readTwoVal(row, col, rowLength, colLength);
    console.log(
      "2 Values : " +
        "row: " +
        row +
        " " +
        "col " +
        col +
        " " +
        JSON.stringify(values)
    );
    col = col + 2;
    if (col >= colLength) {
      row = row + 1;
      col = 0;
    }
  }
}
main(60, 60);
