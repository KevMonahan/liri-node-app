require("dotenv").config();

var keys = require("./keys.js");

var command = process.argv[2];

if (!command) {
    command = "my-tweets";
}

