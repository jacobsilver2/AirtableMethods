const moment = require("moment");

function formatCalendarDate(date) {
  return moment.utc(date).format("MMMM Do (dddd)");
}

function formatCalendarTime(time) {
  return moment.utc(time).format("h:mma");
}

module.exports = {
  formatCalendarDate,
  formatCalendarTime
};
