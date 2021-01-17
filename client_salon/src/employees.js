const showEmployeesPage = () => {
    let container = document.getElementById("content");
    let employees = [];
    getData('/employees/getAll').then(data => {
        for(let i=0;i<data.length;i++){
            employees.push(data[i]);
        }
        let str = '';
        if(employees.length!=0){

            str += '<table>';
            for(let i=0; i<employees.length; i++){
                str += '<tr><td>'+employees[i].surname+'</td><td>'+employees[i].name+'</td><td>'+employees[i].position+'</td><td>'+employees[i].email+'</td>';
                str += '<td><button id="'+employees[i].id_employee+'">Edytuj</button></td>';
                str += '</tr>';
            }
            str += '</table>';
            container.innerHTML = str;

            for(let i=0;i<employees.length;i++){
                let btn = document.getElementById(employees[i].id_employee);
                btn.addEventListener("click", function(){
                    showUpdateEmployee(employees[i]);
                });
            }
        }
    });
}

const showAddEmployeePage = () => {
    let container = document.getElementById("content");
    container.innerHTML = `
        <form xmlns="http://www.w3.org/1999/html">
        <label for="name">Imię:</label>
        <input type="text" id="name" name="name"/></br>
        <label for="surname">Nazwisko:</label>
        <input type="text" id="surname" name="surname"/></br>
        <label for="position">Stanowisko:</label>
        <select id="position" name="position">
        <option value="sprzedawca" selected>Sprzedawca</option>
        <option value="kierownik">Kierownik</option>
        </select></br>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email"/></br>
        <label for="password">Hasło:</label>
        <input type="password" id="password" name="password"/></br>
        <label for="passwordConfirm">Powtórz hasło:</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm"/></br>
        </form>
        <button onclick="addEmployee();">Dodaj pracownika</button>
    `;
}

const addEmployee = () => {
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("passwordConfirm").value;
    if(password!=='' && password===passwordConfirm) {
        let data = {
            "name": document.getElementById("name").value,
            "surname": document.getElementById("surname").value,
            "position": document.getElementById("surname").value,
            "email": document.getElementById("email").value,
            "password": password
        }
        postData('/employees/add', data).then(response => {
            if(response.ok){
                alert("Dodano");
                showEmployeesPage();
            }
            else{
                alert("Wystąpił błąd");
            }
        })
    }
}

const showUpdateEmployee = (employee) => {
    let container = document.getElementById("content");
    container.innerHTML = `
    <form>
    <label for="name">Imię:</label>
    <input id="name" name="name" value="`+ employee.name +`"/></br>
    <label for="surname">Nazwisko:</label>
    <input id="surname" name="surname" value="`+ employee.surname +`"/></br>
    <label for="position">Stanowisko:</label>
    <input id="position" name="position" value="`+ employee.position +`"/></br>
    <label for="email">Email:</label>
    <input id="email" name="email" value="`+ employee.email +`"/></br>
    </form>
    <button id="updateEmployeeBtn">Zmodyfikuj</button>
    `;

    let btn = document.getElementById("updateEmployeeBtn");
    btn.addEventListener("click", function(){
        updateEmployee(employee.id_employee);
    });

}

const updateEmployee = (id) => {

    let data = {
        "id_employee": id,
        "name": document.getElementById("name").value,
        "surname": document.getElementById("surname").value,
        "position": document.getElementById("position").value,
        "email": document.getElementById("email").value
    }

    postData('/employees/update', data).then(response => {
        if(response.ok){
            alert("Zaktualizowano");
            showEmployeesPage();
        }
        else{
            alert("Wystąpił problem");
        }
    });

}