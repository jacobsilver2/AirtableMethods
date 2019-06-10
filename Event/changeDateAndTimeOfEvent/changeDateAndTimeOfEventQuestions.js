const findByName = [
  {
    type: "input",
    name: "name",
    message: "Search for a band name:\n"
  }
];

const newDateAndTime = [
  {
    type: "input",
    name: "date",
    message: "Date:\n"
  },
  {
    type: "input",
    name: "time",
    message: "Time\n"
  }
];

module.exports = {
  findByName,
  newDateAndTime
};
