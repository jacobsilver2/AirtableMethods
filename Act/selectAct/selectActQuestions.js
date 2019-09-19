const nameOrEmail = [
  {
    type: "list",
    name: "searchBy",
    choices: ["Name", "Email"]
  }
];

const searchQuestions = [
  {
    type: "input",
    name: "search",
    message: "Enter The Search:\n"
  }
  // {
  //   type: "input",
  //   name: "name",
  //   message: "Enter the act name:\n"
  // }
];

const blurbQuestions = [
  {
    type: "input",
    name: "blurb",
    message: "Enter the blurb:\n"
  }
];

module.exports = {
  searchQuestions,
  blurbQuestions,
  nameOrEmail
};
