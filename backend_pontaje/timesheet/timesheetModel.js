var mongoose = require('mongoose');

//schema
var timesheetSchema = mongoose.Schema({
  hours: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  employee: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export Bio Model
var Timesheet = module.exports = mongoose.model('timesheet', timesheetSchema);

module.exports.get = function (callback, limit) {
   Timesheet.find(callback).limit(limit); 
}