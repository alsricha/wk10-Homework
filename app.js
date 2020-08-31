const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamMembers = []

function questionsManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your id number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
            validate: (answer) => {
                const emailValidation = answer.match(/\S+@\S+\.\S+/);
                if (emailValidation) {
                return true;
            }
                return "Please enter a valid email address";
            },
        },

        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?"
        },

     
    ]).then(function(answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        teamMembers.push(manager);

        buildTeam();
    });
    
};

function buildTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "teamMember",
                message: "Please select a team member to add",
                choices: ["Engineer", "Intern", "None"],
            },
        ])
        .then(function(answers) {
            switch(answers.teamMember) {
                case "Manager":
                    questionsManager();
                break;
                case "Engineer":
                    questionsEngineer();
                break;
                case  "Intern":
                    questionsIntern();
                break;

                default:
                    console.log("building team");
                    buildTeam();

        }
    })
};

function questionsEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the engineer?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
            validate: (answer) => {
                const emailValidation = answer.match(/\S+@\S+\.\S+/);
                if (emailValidation) {
              return true;
            }
            return "Please enter a valid email address";
          },
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is the engineer's github account?",
        },
    ]).then(function(answers) {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub)
        teamMembers.push(engineer);

        buildTeam();
    });
};

function questionsIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
            validate: (answer) => {
                const emailValidation = answer.match(/\S+@\S+\.\S+/);
                if (emailValidation) {
                    return true;
                }
                return "Please enter a valid email address.";
          },
        },
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?",
        },
    ]).then(function(answers) {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        teamMembers.push(intern);

        buildTeam();
    });
};


function buildTeam() {
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFile(outputPath, render(team), "utf-8")
    }

questionsManager();
    

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
