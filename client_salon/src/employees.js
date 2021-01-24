const showEmployeesPage = () => {
    let container = document.getElementById("content");
    let employees = [];
    getData('/employees/getAll').then(data => {
        for(let i=0;i<data.length;i++){
            employees.push(data[i]);
        }
        let str = '';
        if(employees.length!=0){

            str += '<table class="infoTable">';
            str += '<tr><td>Imię</td><td>Nazwisko</td><td>Stanowisko</td><td>Email</td><td></td></tr>';
            for(let i=0; i<employees.length; i++){
                str += '<tr>';
                str += '<td>'+employees[i].name+'</td>';
                str += '<td>'+employees[i].surname+'</td>';
                str += '<td>'+employees[i].position+'</td>';
                str += '<td>'+employees[i].email+'</td>';
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
        <table id="registerTable">
        <form>
        <tr>
        <td><label for="name">Imię:</label></td>
        <td><input class="form-control" type="text" id="name" name="name"/></td>
        </tr>
        <tr>
        <td><label for="surname">Nazwisko:</label></td>
        <td><input class="form-control" type="text" id="surname" name="surname"/></td>
        </tr>
        <tr>
        <td><label for="position">Stanowisko:</label></td>
        <td><select class="form-control" id="position" name="position">
            <option value="sprzedawca" selected>Sprzedawca</option>
            <option value="kierownik">Kierownik</option>
        </select></td>
        </tr>
        <tr>
        <td><label for="email">Email:</label></td>
        <td><input class="form-control" type="text" id="email" name="email"/></td>
        </tr>
        <tr>
        <td><label for="password">Hasło:</label></td>
        <td><input class="form-control" type="password" id="password" name="password"/></td>
        </tr>
        <tr>
        <td><label for="passwordConfirm">Powtórz hasło:</label></td>
        <td><input class="form-control" type="password" id="passwordConfirm" name="passwordConfirm"/></td>
        </tr>
        <tr>
        </form>
        <td colspan="2" style="text-align:center"><button onclick="addEmployee();">Dodaj pracownika</button></td>
        </tr>
        </table>
    `;
}

const addEmployee = () => {
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("passwordConfirm").value;
    if(password!=='' && password===passwordConfirm) {
        let data = {
            "name": document.getElementById("name").value,
            "surname": document.getElementById("surname").value,
            "position": document.getElementById("position").value,
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
    let position = employee.position;
    let position2='';
    if(position==='sprzedawca'){
        position2 = 'kierownik';
    }
    else {
        position2 = 'sprzedawca'
    }
    container.innerHTML = `
    <form>
    <label for="name">Imię:</label>
    <input id="name" name="name" value="`+ employee.name +`"/></br>
    <label for="surname">Nazwisko:</label>
    <input id="surname" name="surname" value="`+ employee.surname +`"/></br>
    <label for="position">Stanowisko:</label>
    <select id="position" name="position" value="`+ employee.position +`">
    <option value="`+position+`" selected>`+position+`</option>
    <option value="`+position2+`">`+position2+`</option>
    </select></br>
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