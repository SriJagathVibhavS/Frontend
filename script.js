const loginPage = document.getElementById('loginPage');
const dataPage = document.getElementById('dataPage');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const dataForm = document.getElementById('dataForm');
const dataList = document.getElementById('dataList');
const dataInput = document.getElementById('dataInput');


loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === 'admin' && password === 'admin') {
        loginPage.classList.add('hidden');
        dataPage.classList.remove('hidden');
        loadData(); 
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});


function loadData() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    dataList.innerHTML = ''; 
    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            editData(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            deleteData(index);
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        dataList.appendChild(li);
    });
}


dataForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newData = dataInput.value.trim();
    if (newData) {
        const data = JSON.parse(localStorage.getItem('data')) || [];
        data.push(newData);
        localStorage.setItem('data', JSON.stringify(data));
        dataInput.value = ''; 
        loadData(); 
    }
});


function editData(index) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const updatedData = prompt('Edit your data:', data[index]);
    if (updatedData !== null) {
        data[index] = updatedData.trim();
        localStorage.setItem('data', JSON.stringify(data));
        loadData(); 
    }
}


function deleteData(index) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    loadData(); 
}


if (!loginPage.classList.contains('hidden')) {
    loadData();
}
