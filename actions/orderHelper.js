const data = {
  core: [
    {
      name: "2.6GHz 6-Core Processor 512GB Storage AMD Radeon Pro 5300M",
      value: 6,
      priceDelta: 2399
    },
    {
      name: "2.3GHz 8-Core Processor 1TB Storage AMD Radeon Pro 5500M",
      value: 8,
      priceDelta: 2799
    }
  ],
  processor: [
    {
      name:
        "2.6GHz 6‑core 9th‑generation Intel Core i7 processor, Turbo Boost up to 4.5GHz",
      value: "i7",
      allowed6Core: true,
      allowed8Core: false,
      priceDelta: {
        for6Core: 0,
        for8Core: 0
      }
    },
    {
      name:
        "2.4GHz 8‑core 9th‑generation Intel Core i9 processor, Turbo Boost up to 5.0GHz",
      value: "i9",
      allowed6Core: true,
      allowed8Core: false,
      priceDelta: {
        for6Core: 300,
        for8Core: 0
      }
    },
    {
      name:
        "2.3GHz 8‑core 9th‑generation Intel Core i9 processor, Turbo Boost up to 4.8GHz",
      value: "i7",
      allowed6Core: false,
      allowed8Core: true,
      priceDelta: {
        for6Core: 0,
        for8Core: 0
      }
    },
    {
      name:
        "2.4GHz 8‑core 9th‑generation Intel Core i9 processor, Turbo Boost up to 5.0GHz",
      value: "i9",
      allowed6Core: false,
      allowed8Core: true,
      priceDelta: {
        for6Core: 0,
        for8Core: 200
      }
    }
  ],
  memory: [
    {
      name: "16GB 2666MHz DDR4 memory",
      value: 16,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 0,
        for8Core: 0
      }
    },
    {
      name: "32GB 2666MHz DDR4 memory",
      value: 32,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 400,
        for8Core: 400
      }
    },
    {
      name: "64GB 2666MHz DDR4 memory",
      value: 64,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 800,
        for8Core: 800
      }
    }
  ],
  graphics: [
    {
      name: "AMD Radeon Pro 5300M with 4GB of GDDR6 memory",
      value: 534,
      allowed6Core: true,
      allowed8Core: false,
      priceDelta: {
        for6Core: 0,
        for8Core: 0
      }
    },
    {
      name: "AMD Radeon Pro 5500M with 4GB of GDDR6 memory",
      value: 554,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 100,
        for8Core: 0
      }
    },
    {
      name: "AMD Radeon Pro 5500M with 4GB of GDDR8 memory",
      value: 558,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 200,
        for8Core: 100
      }
    }
  ],
  storage: [
    {
      name: "512 GB SSD Storage",
      value: 512,
      allowed6Core: true,
      allowed8Core: false,
      priceDelta: {
        for6Core: 0,
        for8Core: 0
      }
    },
    {
      name: "1TB GB SSD Storage",
      value: 1,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 200,
        for8Core: 0
      }
    },
    {
      name: "2TB GB SSD Storage",
      value: 2,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 600,
        for8Core: 400
      }
    },
    {
      name: "4TB GB SSD Storage",
      value: 4,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 1200,
        for8Core: 1000
      }
    },
    {
      name: "8TB GB SSD Storage",
      value: 8,
      allowed6Core: true,
      allowed8Core: true,
      priceDelta: {
        for6Core: 2400,
        for8Core: 2200
      }
    }
  ]
};

const getChoices = (hardware, coreFlag) => {
  const hardwareOptions = data[hardware];
  return hardwareOptions.reduce((acc, curr) => {
    if (curr[coreFlag]) {
      acc.push({
        name: curr.name,
        value: curr.value
      });
    }
    return acc;
  }, []);
};

const generateQuestionsForCore = () => {
  return {
    type: "list",
    name: "core",
    message: "Choose a MacBook Pro 16 model",
    choices: data.core
  };
};

const generateCoreSpecificQuestions = core => {
  const questions = [];
  const coreFlag = core === 6 ? "allowed6Core" : "allowed8Core";

  // TODO: code is repeated multiple times
  // get processor questions
  questions.push({
    type: "list",
    name: "processor",
    message: "Which processor is right for you?",
    choices: getChoices("processor", coreFlag)
  });

  // get memory questions
  questions.push({
    type: "list",
    name: "memory",
    message: "Which memory is right for you?",
    choices: getChoices("memory", coreFlag)
  });

  // get graphics questions
  questions.push({
    type: "list",
    name: "graphics",
    message: "Which graphics is right for you?",
    choices: getChoices("graphics", coreFlag)
  });

  // get storage questions
  questions.push({
    type: "list",
    name: "storage",
    message: "Which storage is right for you?",
    choices: getChoices("storage", coreFlag)
  });

  return questions;
};

const calculateCost = answers => {
  const coreFlag = answers.core === 6 ? "for6Core" : "for8Core";
  return Object.keys(answers).reduce((acc, curr) => {
    const hardwareObj = data[curr];
    const selectedHardware = hardwareObj.find(
      obj => obj.value === answers[curr]
    );
    return (acc +=
      typeof selectedHardware.priceDelta === "number"
        ? selectedHardware.priceDelta
        : selectedHardware.priceDelta[coreFlag]);
  }, 0);
};

module.exports = {
  generateQuestionsForCore,
  generateCoreSpecificQuestions,
  calculateCost
};
