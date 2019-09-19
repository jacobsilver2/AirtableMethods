const addEventQuestions = [{
  type: 'input',
  name: 'name',
  message: "Band Name:\n",
}, {
  type: 'input',
  name: 'date',
  message: "Date:\n",
}, {
  type: 'input',
  name: 'time',
  message: 'Time:\n',
},
{
  type: 'list',
  name: 'status',
  choices: ['Confirmed', 'Held', 'Cancelled', 'Note', 'Private Event']
}]

const addActPromptQuestion = [
  {
    type: 'list',
    name: 'response',
    choices: ['yes', 'no']
  }
];

const addActQuestions = [
{
  type: 'input',
  name: 'email',
  message: "Enter an email address for the act:\n"
}];

module.exports = {
  addEventQuestions,
  addActPromptQuestion,
  addActQuestions
}