// UI Variables
const selectEmployee = document.querySelector('#select-employee');
const hours = document.querySelector('#hours-input');
const date = document.querySelector('#date-input');
const addTimesheetBtn = document.querySelector('#add-timesheet');
const tableList = document.querySelector('#list');

// Populate select list and table
function populateLists() {
  axios.get('http://localhost:3000/api/timesheet/')
    .then(res => res.data.data)
    .catch(err => console.log(err))
    .then(data => {
      selectEmployee.innerHTML = `
        <option value="">Selecteaza Angajat</option>
      `;

      let output = '';
      data.forEach(function(timesheet) {
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