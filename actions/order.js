const inquirer = require("inquirer");
const {
  generateQuestionsForCore,
  generateCoreSpecificQuestions,
  calculateCost
} = require("./orderHelper");

const order = async () => {
  //first let use select the base core
  const coreAnswer = await inquirer.prompt(generateQuestionsForCore());

  //based on selected core show core specific questions
  const selectedOptions = await inquirer.prompt(
    generateCoreSpecificQuestions(coreAnswer.core)
  );

  //calculate the final cost based on all the answers
  const totalCost = calculateCost({ ...coreAnswer, ...selectedOptions });

  console.log("--------");
  console.log(`Your total order value is ${totalCost}`);
};

module.exports = order;
