const searchQuestions = [{
  type: 'input',
  name: 'email',
  message: "Enter an email address:\n",
}, {
  type: 'input',
  name: 'name',
  message: "Enter the act name:\n"
}]

const blurbQuestions = [
  {
    type: 'input',
    name: 'blurb',
    message: 'Enter the blurb:\n'
  },
];

module.exports = {
  searchQuestions, blurbQuestions
}