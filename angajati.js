// UI Variables
const alertMessage = document.querySelector('#alert-message');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const jobYears = document.querySelector('#job-years');
const salary = document.querySelector('#salary');
const position = document.querySelector('#position');
const team = document.querySelector('#team');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const paysTax = document.querySelector('#pays-tax');
const submitBtn = document.querySelector('#submit');

// Get data from database
function populateList() {
  axios.get('http://localhost:3000/api/employee/')
    .then(res => res.data.data)
    .catch(err => console.log(err))
    .then(data => {
      
      let tax;
      data.forEach(function(employee) {
        if(employee.paysTax === true) {
          tax = 'NU';
        } else {
          tax = 'DA';
        }
        rowData.push({
          nume: `${employee.name.firstName} ${employee.name.lastName}`,
          vechime: employee.jobYears,
          salariu: employee.salary,
          functie: `${employee.position}`,
          echipa: `${employee.team}`,
          telefon: `${employee.phone}`,
          email: `${employee.email}`,
          impozit: tax
        });
      });
      gridOptions.api.setRowData(gridOptions.rowData);
    });
}

// Populate list on load
populateList();

//// ag-Grid table setup ////
// Specify columns for the table
const columnDefs = [
  {field: "nume", sortable: true, filter: true},
  {field: "vechime", sortable: true, filter: true},
  {field: "salariu", sortable: true, filter: true},
  {field: "functie", sortable: true, filter: true},
  {field: "echipa", sortable: true, filter: true},
  {field: "telefon", sortable: true, filter: true},
  {field: "email", sortable: true, filter: true},
  {field: "impozit", sortable: true, filter: true}
]

// Specify data
const rowData = [];

// Let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData
}

// Select the UI variable for the grid table
const eGridDiv = document.querySelector('#myGrid');

// Create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);

// Set paysTax to boolean
function tax() {
  if(paysTax.checked) {
    return true;
  } else {
    return false;
  }
}

// Get new employee to database
function addEmployeeToDb() {
  const newEmployee = {
    name: {
      firstName: `${firstName.value}`,
      lastName: `${lastName.value}`
    },
    jobYears: parseInt(jobYears.value),
    salary: parseInt(salary.value),
    position: `${position.value}`,
    team: `${team.value}`,
    phone: `${phone.value}`,
    email: `${email.value}`,
    paysTax: tax()
  }

  axios.post('http://localhost:3000/api/employee/', newEmployee)
    .then(res => {
      populateList();
    })
    .catch(err => console.log(err))
}

// Clear fields after success
function clearFields() {
  firstName.value = '';
  lastName.value = '';
  jobYears.value = '';
  salary.value = '';
  position.value = '';
  team.value = '';
  phone.value = '';
  email.value = '';
  paysTax.checked = false;
}

// Show alert on event
function displayAlert(message, className) {
  alertMessage.classList.add(className);
  alertMessage.textContent = message;
  alertMessage.classList.remove('d-none');
  setTimeout(function() {
    alertMessage.classList.remove(className);
    alertMessage.text = message;
    alertMessage.classList.add('d-none'); 
  }, 3000);
}

// Listen for click event on submit
submitBtn.addEventListener('click', function(e) {
  if(firstName.value === '' || lastName.value === '' || jobYears.value === '' || salary.value === '' || position.value === '' || team.value === '' || phone.value === '' || email.value === '') {

    displayAlert('Completeaza toate campurile obligatorii!', 'alert-danger');

  } else {

    addEmployeeToDb();

    displayAlert('Angajat adaugat cu succes!', 'alert-success'); 

  }
  e.preventDefault();
});