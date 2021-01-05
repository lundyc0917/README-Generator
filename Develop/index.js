const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const createFile = util.promisify(fs.writeFile);

// array of questions for user to answer
const questions = () => {
  return inquirer.prompt([
    { 
      type: 'input', 
      name: 'title',
      message: 'Enter title for your README: ',
    },
    { 
      type: 'input', 
      name: 'description',
      message: 'Enter description: ',
    },
    { 
      type: 'input', 
      name: 'installation',
      message: 'Enter Installation instructions: ',
    },
    { 
      type: 'input', 
      name: 'usage',
      message: 'Enter usage information: ',
    },
    { 
      type: 'list', 
      name: 'license',
      message: 'Select License',
      choices: [
        'Apache-2.0',
        'GNU-General-v3.0', 
        'MIT', 
        'BSD-2-Clause',
        'BSD-3-Clause',
        'Boost',
        'Eclipse-2.0',
        'Mozilla-2.0',
        'Open',
      ],
    },
    { 
      type: 'input', 
      name: 'contributing',
      message: 'Enter contribution information: ',
    },
    { 
      type: 'input', 
      name: 'tests',
      message: 'Enter tests information: ',
    },
    { 
      type: 'input', 
      name: 'questions',
      message: 'Enter questions: ',
    },
  ]);
}

// write file based on responses
const writeToFile = (response) =>
  `# ${response.title}

  ## License
  ![badge](https://img.shields.io/static/v1?label=License&message=${response.license}&color=blue)
  
  ## Table of Contents
   - [Description](#description)
   - [Installation](#installation)
   - [Usage](#usage)
   - [Contributing](#contributing)
   - [Tests](#tests)
   - [Questions](#questions)

  
  ## Description 
  ${response.descritpion}
  
  ## Installation
  ${response.installation}

  ## Usage 
  ${response.usage}

  ## Contributing
  ${response.contributing}

  ## Tests
  ${response.tests}

  ## Questions
  ${response.questions}
  
  Made with README Generator`;

// initialize program
const init = async () => {
    try {
      const response = await questions();
      const makeFile = writeToFile(response);
      await createFile ('README.md', makeFile);
  
      console.log('Successful');
    } 
    catch (err) {
        console.log(err);
    }
  };

// function call to initialize program
init();
