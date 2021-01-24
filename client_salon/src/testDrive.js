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
            str += '<table class="infoTable">';
            str += '<tr><td>Pracownik odpowiedzialny</td><td>Klient</td><td>Id. egzemplarza</td><td>Data</td><td></td></tr>';
            for(let i=0; i<test_drives.length; i++){
                str += '<tr><td>'+test_drives[i].employeeSurname+' '+test_drives[i].employeeName+'</td>';
                str += '<td>'+test_drives[i].customerSurname+' '+test_drives[i].customerName+'</td>';
                str += '<td>'+test_drives[i].id_unit+'</td>';
                str += '<td>'+timeConverter(test_drives[i].date)+'</td>';
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
            str += '<table class="infoTable">';
            str += '<tr><td>Pracownik odpowiedzialny</td><td>Klient</td><td>Id. egzemplarza</td><td>Data</td><td></td></tr>';
            for(let i=0; i<test_drives.length; i++){
                str += '<tr><td>'+test_drives[i].employeeSurname+' '+test_drives[i].employeeName+'</td>';
                str += '<td>'+test_drives[i].customerSurname+' '+test_drives[i].customerName+'</td>';
                str += '<td>'+test_drives[i].id_unit+'</td>';
                str += '<td>'+timeConverter(test_drives[i].date)+'</td>';
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

const showCustomerTestDrivePage = () => {
    let container = document.getElementById("content");
    let test_drives = [];
    let urldata = new URLSearchParams({
        id_customer:sessionStorage.getItem("user")
    })
    getDataWithParams('/testdrive/getCustomerAll', urldata).then(data => {
        for(let i=0; i<data.length;i++){
            test_drives.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday">';
        if(test_drives.length!==0){
            str += '<table class="infoTable">';
            str += '<tr><td>Pracownik odpowiedzialny</td><td>Id egzemplarza</td><td>Data</td></tr>';
            for(let i=0; i<test_drives.length; i++){
                str += '<tr><td>'+test_drives[i].employeeSurname+ ' ' +test_drives[i].employeeName+'</td>';
                str += '<td>'+test_drives[i].id_unit+'</td>';
                str += '<td>'+timeConverter(test_drives[i].date)+'</td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (this.checked){
                showCustomerFromTodayTestDrivePage();
            }
        });
    });
}

const showCustomerFromTodayTestDrivePage = () => {
    let container = document.getElementById("content");
    let test_drives = [];
    let urldata = new URLSearchParams({
        id_customer:sessionStorage.getItem("user")
    })
    getDataWithParams('/testdrive/getCustomerAllFromToday', urldata).then(data => {
        for(let i=0; i<data.length;i++){
            test_drives.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday" checked>';
        if(test_drives.length!==0){
            str += '<table class="infoTable">';
            str += '<tr><td>Pracownik odpowiedzialny</td><td>Id egzemplarza</td><td>Data</td></tr>'
            for(let i=0; i<test_drives.length; i++){
                str += '<tr><td>'+test_drives[i].employeeSurname+ ' ' +test_drives[i].employeeName+'</td>';
                str += '<td>'+test_drives[i].id_unit+'</td>';
                str += '<td>'+timeConverter(test_drives[i].date)+'</td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (!this.checked){
                showCustomerTestDrivePage();
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
    <table id="registerTable">
    <form>
    <tr>
    <td><label for="employees">Pracownik:</label></td>
    <td><select class="form-control" id="employees" name="employees">`+employees+`</select></td>
    </tr>
    <tr>
    <td><label for="customers">Klient:</label></td>
    <td><select class="form-control" id="customers" name="customers">`+customers+`</select></td>
    </tr>
    <tr>
    <td><label for="unit">Pojazd</label></td>
    <td><select class="form-control" id="unit" name="unit">`+units+`</select></td>
    </tr>
    <tr>
    <td><label for="date">Data</label></td>
    <td><input class="form-control" type="date" id="date" name="date" value="2021-01-01"></td>
    </tr>
    <tr>
    <td><label for="time">Godzina</label></td>
    <td><select class="form-control" id="time" name="time">
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
    </select></td>
    </tr>
    </form>
    <tr>
    <td colspan="2" style="text-align: center"><button id="addTestDrive">Dodaj</button></td>
    </tr>
    </table>
    `;

    let addTestDriveBtn = document.getElementById("addTestDrive");
    addTestDriveBtn.addEventListener("click", addTestDrive);
}

const showCustomerAddTestDrivePage = async () => {
    let employees = await getEmployeesOptionList();
    let units = await getTestCarsOptionList();
    let container = document.getElementById("content");
    container.innerHTML = `
    <table id="registerTable">
    <form>
    <tr>
    <td><label for="employees">Pracownik:</label></td>
    <td><select class="form-control" id="employees" name="employees">`+employees+`</select></td>
    </tr>
    <tr>
    <td><label for="unit">Pojazd</label></td>
    <td><select class="form-control" id="unit" name="unit">`+units+`</select></td>
    </tr>
    <tr>
    <td><label for="date">Data</label></td>
    <td><input class="form-control" type="date" id="date" name="date" value="2021-01-01"></td>
    </tr>
    <tr>
    <td><label for="time">Godzina</label></td>
    <td><select class="form-control" id="time" name="time">
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
    </select></td>
    </tr>
    </form>
    <tr>
    <td colspan="2" style="text-align: center"><button id="addTestDrive">Dodaj</button></td>
    </tr>
    </table>
    `;

    let addTestDriveBtn = document.getElementById("addTestDrive");
    addTestDriveBtn.addEventListener("click", addTestDrive);
}

const addTestDrive = () => {
    let date = document.getElementById("date").value +'T'+ document.getElementById("time").value;
    let id;
    if(sessionStorage.getItem("role")==='ROLE_CLIENT'){
        id = sessionStorage.getItem("user");
    }
    else{
        id = document.getElementById("customers").value;
    }
    let data = {
        "id_unit": document.getElementById("unit").value,
        "id_employee": document.getElementById("employees").value,
        "id_customer": id,
        "date": date
    }
    postData('/testdrive/add', data).then(response => {
        if(response.ok){
            alert("Dodano");
            if(sessionStorage.getItem("role")==='ROLE_CLIENT'){
                showCustomerTestDrivePage();
            }
            else{
                showTestDrivePage();
            }
        }
        else{
            alert("Wystąpił problem - podany pracownik o tej porze jest zajęty");
        }
    })

}