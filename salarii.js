//////// UI Variables ////////
// Calculate Salary Variables
const inputSalary = document.querySelector('#salary-input');
const beforeTaxes = document.querySelector('#before-taxes');
const afterTaxes = document.querySelector('#after-taxes');
const paysTax = document.querySelector('#pays-tax');
const calculateSalary = document.querySelector('#calculate-salary');

// Calculate Employee Salary Variables
const selectEmployee = document.querySelector('#select-employee');
const newSalary = document.querySelector('#new-salary-input');
const changeSalary = document.querySelector('#change-employee-salary');

const list = document.querySelector('#list');
const alertMessage = document.querySelector('#alert-message');

// Calculate taxes
function cas(salary) {
  return salary * 0.25;
}

function cass(salary) {
  return salary * 0.1
}

function taxes(salary, tax) {
  if(paysTax.checked || tax === false) {
    return 0;
  } else {
    return ((salary - cas(salary) - cass(salary)) * 0.1);
  }
}

// Calculate Salary Before Taxes
function calculateBefore(salary) {
  if(afterTaxes.checked) {
    if(paysTax.checked) {
      return inputSalary.value * 0.65;
    } else {
      return inputSalary.value * 0.585;
    }
  } else {
    return parseInt(salary);
  }
}

// Calculate Salary After Taxes
function calculateAfter(salary, tax) {
  if(afterTaxes.checked) {
    return parseInt(inputSalary.value);
  } else {
    return salary - cas(salary) - cass(salary) - taxes(salary, tax);
  }
}

// Show results in table
function displayResults(salary, tax, name) {
  list.innerHTML = `
    <tr>
      <td>${name}</td>
      <td>${Math.ceil(calculateBefore(salary))}</td>
      <td>${Math.ceil(cas(salary))}</td>
      <td>${Math.ceil(cass(salary))}</td>
      <td>${Math.ceil(taxes(salary, tax))}</td>
      <td>${Math.ceil(calculateAfter(salary))}</td>
    </tr>
  `;
}

// Clear Fields After Success 
function clearFields() {
  inputSalary.value = '';
  beforeTaxes.checked = false;
  afterTaxes.checked = false;
  paysTax.checked = false;
  selectEmployee.value = '';
  newSalary.value = ''; 
}

// Show Alert Message
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

// Listen for Click Event on Calculate Button
calculateSalary.addEventListener('click', function(e) {
  if(inputSalary.value === '' || !beforeTaxes.checked || !afterTaxes.checked) {

    displayAlert('Completeaza campurile obligatorii!', 'alert-danger');

  } else {

    displayAlert('Salariu calculat cu succes!', 'alert-success');
    
    displayResults(calculateBefore());
  
    clearFields();
  
  }
  e.preventDefault();
});

let db = [];
// Populate Select List
axios.get('http://localhost:3000/api/employee/')
  .then(res => res.data.data)
  .catch(err => console.log(err))
  .then(data => {
    db = data;

    selectEmployee.innerHTML = `
      <option value="">Selecteaza Angajat</option>
    `;
    
    let output;
    db.forEach(function(employee) {
      output += `
        <option value="${employee._id}">${employee.name.firstName} ${employee.name.lastName}</option>
      `;
    });
    selectEmployee.innerHTML += output;
  });

// Listen for Change Event on Select
selectEmployee.addEventListener('change', function(e) {

  displayAlert('Salariu calculat cu succes!', 'alert-success');

  db.forEach(function(employee) {
    if(selectEmployee.value === employee._id) {

      displayResults(calculateBefore(employee.salary), employee.paysTax, `${employee.name.firstName} ${employee.name.lastName}`);

    }
  });
});

// Listen for Click Event On Change Salary
changeSalary.addEventListener('click', function(e) {
  if(newSalary.value === '' || selectEmployee.value === '') {

    displayAlert('Completeaza ambele campuri!', 'alert-danger');

  } else {

    db.forEach(function(employee) {
      if(selectEmployee.value === employee._id) {
        let salary = {
          name: {
            firstName: employee.name.firstName,
            lastName: employee.name.lastName
          },
          salary: parseInt(newSalary.value),
          jobYears: employee.jobYears,
          position: employee.position,
          team: employee.team,
          phone: employee.phone,
          email: employee.email,
          paysTax: employee.paysTax
          }

        axios.put(`http://localhost:3000/api/employee/${employee._id}`, salary)
          .then(res => res)
          .catch(err => console.log(err))
          .then(res => {
            displayResults(calculateBefore(parseInt(newSalary.value)), employee.paysTax, `${employee.name.firstName} ${employee.name.lastName}`);
        });
      }
    });
    displayAlert('Salariu modificat cu succes!', 'alert-success');
  }
});