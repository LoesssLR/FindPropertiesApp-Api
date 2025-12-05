'use strict';

const fs = require('fs');
const path = require('path');

// write data to file (string or object)
exports.writeFile = async function (data, filePath) {
  try {
    const dir = path.dirname(filePath);

    // create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const content = typeof data === 'object'
      ? JSON.stringify(data, null, 2)
      : data;

    await fs.promises.writeFile(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing file:', error.message);
    return false;
  }
};

// read file content as string
exports.readFile = async function (filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Error reading file:', error.message);
    return null;
  }
};

// read JSON file and parse it
exports.readJson = async function (filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading/parsing JSON:', error.message);
    return null;
  }
};

// check if file exists
exports.exists = function (filePath) {
  return fs.existsSync(filePath);
};
