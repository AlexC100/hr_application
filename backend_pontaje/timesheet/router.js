//initialize express router
let router = require("express").Router();

//set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Works",
    message: "Welcome to FirstRest API",
  });
});

//Import Bio Controller
var timesheetController = require("./timesheetController");

// Bio routes
router
  .route("/timesheet")
  .get(timesheetController.index)
  .post(timesheetController.add);
router
  .route("/timesheet/:timesheet_id")
  .get(timesheetController.view)
  .put(timesheetController.update)
  .delete(timesheetController.delete);

//Export API routes
module.exports = router;
