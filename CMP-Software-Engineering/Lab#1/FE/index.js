function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

// TODO
// add event listener to delete button

document.addEventListener('DOMContentLoaded', () => {
  // Add event listener to submit button
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission
    createEmployee();
  });

  // Add event listener to delete button
  const dataTable = document.getElementById('dataTable');
  dataTable.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('btn-danger')) {
      const row = event.target.closest('tr');
      const id = row.querySelector('td:first-child').textContent;
      deleteEmployee(id);
    }
  });
});


// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees

  const name = document.getElementById('name').value;
  const id= document.getElementById('id').value;

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })

  .then(response => response.json())
  .then(() => fetchEmployees())
  .catch(error => console.error(error));
}

// TODO
function deleteEmployee (){
  // get id
  // send id to BE
  // call fetchEmployees
  const idToDelete = document.getElementById('id').value;

  fetch(`http://localhost:3000/api/v1/employee/${idToDelete}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
      .then(data => {
        fetchEmployees();
      })
      .catch(error => console.error(error));
}

fetchEmployees()
