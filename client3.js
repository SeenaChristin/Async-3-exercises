const fetch = require("node-fetch");

async function main() {
  const response = await fetch("http://localhost:8000/");
  const data = await response.json();
  data.items.map(async (item) => {
    if (item.isDir == true) {
      await getDirectory(item.name);
    } else {
      await printFilename(item.name);
    }
  });
}
main();

async function getDirectory(dirName) {
  const response = await fetch(`http://localhost:8000/${dirName}`);
  const data = await response.json();
  data.files.map(async (file) => {
    await printFilename(file.name);
  });
}

async function printFilename(fileName) {
  console.log(fileName);
}
