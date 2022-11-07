const fs = require("fs");
const path = require("path");
class customFs {
  constructor(dir) {
    this.dir = dir;
  }

  readFile() {
     return fs.readFileSync(path.resolve(__dirname, this.dir), {
      encoding: "utf-8",
      flag: "r"
    });
  }

  WriteFile(data) {
    fs.writeFileSync(path.join(__dirname, this.dir), JSON.stringify(data, null,2), {
      encoding: "utf-8",
      flag: "w+",
    });
  }
}

module.exports = customFs;
