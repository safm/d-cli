const { readFile, readdir, stat, access } = require("fs").promises;
const path = require("path");

// first checks if file exists, if it exists returns the file content in string format
const readFileByLines = async filePath => {
  const relativeFilePath = path.join(__dirname, filePath);
  const isFileExists = await fileExists(relativeFilePath);

  if (!isFileExists) {
    console.log(`${filePath} does not exists`);
    return false;
  }

  const fileData = await readFile(relativeFilePath, { encoding: "utf8" });

  if (typeof fileData !== "string") {
    return false;
  }

  return fileData;
};

// get a list of files of folder for a given path
const getListForPath = async (dirPath = ".") => {
  const relativeDirPath = path.join(__dirname, dirPath);
  const fileList = await readdir(relativeDirPath, { encoding: "utf8" });
  if (fileList) {
    return fileList;
  } else {
    return false;
  }
};

// get information for a given path, like size and type (file/folder)
const getFileInfo = async path => {
  const fileStat = await stat(path);
  const info = { type: "unknown", size: fileStat.size };
  if (fileStat.isFile()) {
    info.type = "file";
  } else if (fileStat.isDirectory()) {
    info.type = "dir";
  }

  return info;
};

const pathJoin = (...args) => {
  return path.join(__dirname, ...args);
};

// uses access to determine is file exists or not.
// using access is recommended https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
const fileExists = async path => {
  try {
    const err = await access(path);
    // this is weird the promise would return undefined when file exists
    if (!err) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

module.exports = {
  readFileByLines,
  getListForPath,
  pathJoin,
  getFileInfo,
  fileExists
};
