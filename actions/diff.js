const { readFileByLines } = require("../fsInterface");
const { biggerNumber } = require("../utils");

// uses readFileByLines to read file line by line.
// then compares both the files lines by line and outputs the results of the comparison
const diffTool = async (file1, file2) => {
  const file1Text = await readFileByLines(file1);
  const file2Text = await readFileByLines(file2);

  if (!file1Text || !file2Text) {
    return false;
  }

  const file1Arr = file1Text.split("\n");
  const file2Arr = file2Text.split("\n");

  const iteratorLimit = biggerNumber(file1Arr.length, file2Arr.length);
  let isDirty = false;
  for (let i = 0; i < iteratorLimit; i++) {
    let l1 = file1Arr[i];
    let l2 = file2Arr[i];
    let lNum = i + 1;
    if (!l1) {
      console.log(`"${file2}" has additional line at #${lNum}`);
      console.log(`>>> ${l2}`);
      isDirty = true;
    } else if (!l2) {
      console.log(`"${file1}" has additional line at #${lNum}`);
      console.log(`>>> ${l1}`);
      isDirty = true;
    } else if (l1 !== l2) {
      console.log(`Line ${lNum} is not equal`);
      console.log(`>>>${file1} line #${lNum} -- ${l1}`);
      console.log(`>>>${file2} line #${lNum} -- ${l2}`);
      isDirty = true;
    }
  }

  if (!isDirty) {
    console.log(`"${file1}" & "${file2}" has no difference`);
  }

  return true;
};

module.exports = diffTool;
