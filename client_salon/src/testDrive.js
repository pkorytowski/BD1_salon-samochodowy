const showTestDrivePage = () => {
    let container = document.getElementById("content");
    let test_drives = [];
    getData('/testdrive/getAll').then(data => {
        for(let i=0; i<data.length;i++){
            test_drives.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday">';
        if(test_drives.length!==0){
            str += '<table>';
            for(let i=0; i<test_drives.length; i++){
                str += '<tr><td>'+test_drives[i].employeeSurname+'</td>';
                str += '<td>'+test_drives[i].employeeName+'</td>';
                str += '<td>'+test_drives[i].customerSurname+'</td>';
                str += '<td>'+test_drives[i].customerName+'</td>';
                str += '<td>'+test_drives[i].id_unit+'</td>';
                str += '<td>'+test_drives[i].date+'</td>';
                str += '<td><button onclick="deleteTestDrive('+test_drives[i].id_test_drive+');">Usuń</button></td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (this.checked){
                showFromTodayTestDrivePage();
            }
        });
    });
}

const showFromTodayTestDrivePage = () => {
    let container = document.getElementById("content");
    let test_drives = [];
    getData('/testdrive/getAllFromToday').then(data => {
        for(let i=0; i<data.length;i++){
            test_drives.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday" checked>';
        if(test_drives.length!==0){
            str += '<table>';
            for(let i=0; i<test_drives.length; i++){
                str += '<tr><td>'+test_drives[i].employeeSurname+'</td>';
                str += '<td>'+test_drives[i].employeeName+'</td>';
                str += '<td>'+test_drives[i].customerSurname+'</td>';
                str += '<td>'+test_drives[i].customerName+'</td>';
                str += '<td>'+test_drives[i].id_unit+'</td>';
                str += '<td>'+test_drives[i].date+'</td>';
                str += '<td><button onclick="deleteTestDrive('+test_drives[i].id_test_drive+');">Usuń</button></td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (!this.checked){
                showTestDrivePage();
            }
        });
    });
}

const deleteTestDrive = (id) => {
    let data = {
        "id_test_drive": id
    }
    postData('/testdrive/delete', data).then(response => {
        if(response.ok){
            alert("Usunięto");
            showTestDrivePage();
        }
        else{
            alert("Wystąpił błąd");
        }
    });
}

const getTestCarsOptionList = async () => {
    let data = await getData('/units/getTestCars');
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_unit+'">'+data[i].car.model + ' ' + data[i].car.version + ' | ' + data[i].car.engine + '</option>';
    }
    return str;
}

const showAddTestDrivePage = async () => {
    let employees = await getEmployeesOptionList();
    let units = await getTestCarsOptionList();
    let customers = await getCustomersOptionList();
    let container = document.getElementById("content");
    container.innerHTML = `
    <form>
    <label for="employees">Pracownik:</label>
    <select id="employees" name="employees">`+employees+`</select></br>
    <label for="customers">Klient:</label>
    <select id="customers" name="customers">`+customers+`</select></br>
    <label for="unit">Pojazd</label>
    <select id="unit" name="unit">`+units+`</select></br>
    <label for="date">Data</label>
    <input type="date" id="date" name="date" value="2021-01-01">
    <label for="time">Godzina</label>
    <select id="time" name="time">
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
    </select>
    </form>
    <button id="addTestDrive">Dodaj</button>
    `;

    let addTestDriveBtn = document.getElementById("addTestDrive");
    addTestDriveBtn.addEventListener("click", addTestDrive);
}

const addTestDrive = () => {
    let date = document.getElementById("date").value +'T'+ document.getElementById("time").value;
    let data = {
        "id_unit": document.getElementById("unit").value,
        "id_employee": document.getElementById("employees").value,
        "id_customer": document.getElementById("customers").value,
        "date": date
    }
    console.log(data);
    postData('/testdrive/add', data).then(response => {
        if(response.ok){
            alert("Dodano");
            showReleaseRoomPage();
        }
        else{
            alert("Wystąpił problem - podany pracownik o tej porze jest zajęty");
        }
    })

}