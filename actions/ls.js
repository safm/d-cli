const { getListForPath, getFileInfo, pathJoin } = require("../fsInterface");
const { bytesToKb } = require("../utils");

// prints list of files with tab separator.
const printInLine = listOfFiles => {
  let stringToPrint = "";
  listOfFiles.forEach(fileName => {
    stringToPrint += `${fileName}\t`;
  });
  console.log(stringToPrint);
};

// uses getInfo to get more information about the file and then prints each file in it's own line with additional information
const printAsList = (listOfFiles, orgPath) => {
  listOfFiles.forEach(async fileName => {
    // because getFileInfo requires the whole path to the file, using pathJoin to combine filename and the path it belongs to
    const pathToFile = pathJoin(orgPath, fileName);
    const { type, size } = await getFileInfo(pathToFile);
    console.log(`${type}\t${bytesToKb(size)}kb\t${pathToFile}`);
  });
};

// uses getListForPath to get a list of files and folder
const listFiles = async (path = ".", cmdObj) => {
  const listOfFiles = await getListForPath(path);
  if (!Array.isArray(listOfFiles)) {
    console.log("Some error occurred");
    return false;
  }

  if (!cmdObj.list) {
    printInLine(listOfFiles);
  } else {
    printAsList(listOfFiles, path);
  }

  return true;
};

module.exports = listFiles;
