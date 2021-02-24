//Import Timesheet Model
Timesheet = require("./timesheetModel");

//For index
exports.index = function (req, res) {
  Timesheet.get(function (err, timesheet) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    res.json({
      status: "success",
      message: "Got Timesheet Successfully!",
      data: timesheet,
    });
  });
};

//For creating new Timesheet
exports.add = function (req, res) {
  console.log(req.body);
  var timesheet = new Timesheet();
  timesheet.hours = req.body.hours;
  timesheet.date = req.body.date;
  timesheet.employee = req.body.employee;

  //Save and check error
  timesheet.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New Timesheet Added!",
      data: timesheet,
    });
  });
};

// View Timesheet
exports.view = function (req, res) {
  Timesheet.findById(req.params.timesheet_id, function (err, timesheet) {
    if (err) res.send(err);
    res.json({
      message: "Timesheet Details",
      data: timesheet,
    });
  });
};

// Update Timesheet
exports.update = function (req, res) {
  Timesheet.findById(req.params.timesheet_id, function (err, timesheet) {
    if (err) res.send(err);
    timesheet.hours = req.body.hours;
    timesheet.date = req.body.date;
    timesheet.employee = req.body.employee;

    //save and check errors
    timesheet.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Timesheet Updated Successfully",
        data: timesheet,
      });
    });
  });
};

// Delete Employee
exports.delete = function (req, res) {
  Timesheet.deleteOne(
    {
      _id: req.params.timesheet_id,
    },
    function (err, contact) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Timesheet Deleted",
      });
    }
  );
};
