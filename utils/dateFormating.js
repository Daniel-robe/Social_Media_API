const moment = require("moment/moment");

module.exports = (date) => {
    return moment().format('MMM Do YYYY, h:mm:ss a');
}
