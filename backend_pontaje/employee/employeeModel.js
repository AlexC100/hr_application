var mongoose = require('mongoose');

//schema
var employeeSchema = mongoose.Schema({
    name: {
      firstName: {
        type: String,
        required: false
      },
      lastName: {
        type: String,
        required: false
      }
    },
    salary: {
        type: Number,
        required: false
    },
    jobYears: {
      type: Number,
      required: false
    },
    position: {
      type: String,
      required: false
    },
    team: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    paysTax: {
        type: Boolean,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Bio Model
var Employee = module.exports = mongoose.model('employee', employeeSchema);

module.exports.get = function (callback, limit) {
   Employee.find(callback).limit(limit); 
}