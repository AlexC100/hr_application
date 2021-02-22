// UI Variables
const alertMessage = document.querySelector("#alert-message");
const selectEmployee = document.querySelector("#select-employee");
const hours = document.querySelector("#hours-input");
const date = document.querySelector("#date-input");
const addTimesheetBtn = document.querySelector("#add-timesheet");
const tableList = document.querySelector("#list");

let timesheetDb = "";
// Populate select list and table
function populateLists() {
  axios
    .get("http://localhost:3000/api/timesheet/")
    .then((res) => res.data.data)
    .catch((err) => console.log(err))
    .then((data) => {
      timesheetDb = data;
      selectEmployee.innerHTML = `
        <option value="">Selecteaza Angajat</option>
      `;
      let output = "";
      data.forEach(function (timesheet) {
        selectEmployee.innerHTML += `
          <option value="${timesheet._id}">${timesheet.employee}</option>
        `;
        output += `
          <tr>
            <td>${timesheet.employee}</td>
            <td>${timesheet.date}</td>
            <td>${timesheet.hours}</td>
          </tr>
        `;
      });
      tableList.innerHTML = output;
    });
}

// Call the function to populate lists on load
populateLists();

// Add new timesheet it database
function addTimesheetToDb() {
  timesheetDb.forEach(function (timesheet) {
    if (selectEmployee.value === timesheet._id) {
      const newTimesheet = {
        hours: parseInt(hours.value),
        date: date.value,
        employee: timesheet.employee,
      };
      axios
        .post("http://localhost:3000/api/timesheet/", newTimesheet)
        .then((res) => {
          populateLists();
        })
        .catch((err) => console.log(err));
    }
  });
}

// Clear fields on success
function clearFields() {
  selectEmployee.value = "";
  hours.value = "";
  date.value = "";
}

// Show alert on event
function displayAlert(message, className) {
  alertMessage.classList.add(className);
  alertMessage.textContent = message;
  alertMessage.classList.remove("d-none");
  setTimeout(function () {
    alertMessage.classList.remove(className);
    alertMessage.text = message;
    alertMessage.classList.add("d-none");
  }, 3000);
}

// Listen for click event on add timesheet
addTimesheetBtn.addEventListener("click", function (e) {
  if (selectEmployee.value === "" || hours.value === "" || date.value === "") {
    displayAlert("Completeaza toate campurile!", "alert-danger");
  } else {
    displayAlert("Pontaj adaugat cu succes!", "alert-success");

    addTimesheetToDb();

    clearFields();
  }
  e.preventDefault();
});
