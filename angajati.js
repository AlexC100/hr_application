// UI Variables
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

let dbEmployees = [];
// Get data from database
axios.get('http://localhost:3000/api/employee/')
  .then(res => res.data.data)
  .catch(err => console.log(err))
  .then(data => {
    dbEmployees = data;

    data.forEach(function(employee) {
      rowData.push({
        nume: `${employee.name.firstName} ${employee.name.lastName}`,
        vechime: employee.jobYears,
        salariu: employee.salary,
        functie: `${employee.position}`,
        echipa: `${employee.team}`,
        telefon: `${employee.phone}`,
        email: `${employee.email}`,
        impozit: employee.paysTax
      });
    });

    gridOptions.api.setRowData(gridOptions.rowData);
  })

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

function tax() {
  if(paysTax.checked) {
    return true;
  } else {
    return false;
  }
}

// Get new employee
function addNewEmployee() {

  const newEmployee = {
    nume: {
      firstName: `${firstName.value}`,
      lastName: `${lastName.value}`
    },
    vechime: parseInt(jobYears.value),
    salariu: parseInt(salary.value),
    functie: `${position.value}`,
    echipa: `${team.value}`,
    telefon: `${phone.value}`,
    email: `${email.value}`,
    impozit: tax()
  }

  axios.post('http://localhost:3000/api/employee/', newEmployee)
    .then(res => res)
    .catch(err => console.log(err))
  
}
// Listen for click event on submit
submitBtn.addEventListener('click', function(e) {

  addNewEmployee();

  e.preventDefault();
});