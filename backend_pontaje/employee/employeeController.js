
//Import Employee Model
Employee = require('./employeeModel');

//For index
exports.index = function (req, res) {
    Employee.get(function (err, employee) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Employee Successfully!",
            data: employee       
        });
    });
};

//For creating new employee
exports.add = function (req, res) {
    console.log(req.body);
    var employee = new Employee();
    employee.name = req.body.name;
    employee.salary = req.body.salary;
    employee.jobYears = req.body.jobYears;
    employee.position = req.body.position;
    employee.team = req.body.team;
    employee.phone = req.body.phone;
    employee.email = req.body.email;
    employee.paysTax = req.body.paysTax;

    //Save and check error
    employee.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New Employee Added!",
            data: employee
        });
    });
};

// View Employee
exports.view = function (req, res) {
    Employee.findById(req.params.employee_id, function (err, employee) {
        if (err)
            res.send(err);
        res.json({
            message: 'Employee Details',
            data: employee
        });
    });
};

// Update Bio
exports.update = function (req, res) {
    Employee.findById(req.params.employee_id, function (err, employee) {
        if (err)
            res.send(err);
              employee.name = req.body.name;
              employee.salary = req.body.salary;
              employee.jobYears = req.body.jobYears;
              employee.position = req.body.position;
              employee.team = req.body.team;
              employee.phone = req.body.phone;
              employee.email = req.body.email;
              employee.paysTax = req.body.paysTax;

//save and check errors
        employee.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Employee Updated Successfully",
                data: employee
            });
        });
    });
};

// Delete Employee
exports.delete = function (req, res) {
    Employee.deleteOne({
        _id: req.params.employee_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Employee Deleted'
        })
    })
}