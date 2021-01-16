const showActiveUnitsList = () => {
    let container = document.getElementById("content");
    let units = [];
    getData("/units/getActiveUnits").then(data => {
        for(let i=0;i<data.length;i++){
            units.push(data[i]);
        }
        let str = '';
        if (units.length!=0){
            str += '<label for="checkActive">Pokaż wszystkie egzemplarze</label><input type="checkbox" id="checkActive" name="checkActive">';
            str += '<table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td><td>'+units[i].customer.surname+'</td><td>'+units[i].customer.firstName+'</td></tr>';
            }
            str += '</table>';
            str += '<button id="deleteUnit">Usuń pojazd</button>';
            str += '<button id="changeUnitStatus">Zmień status</button>';
        }
        container.innerHTML = str;

        let checkActive = document.querySelector("input[name=checkActive]");
        checkActive.addEventListener("change", function() {
            if (this.checked){
                showUnitsList();
            }
        });

        let deleteBtn = document.getElementById("deleteUnit");
        deleteBtn.addEventListener("click", showDeleteUnit);

        let changeUnitStatusBtn = document.getElementById("changeUnitStatus");
        changeUnitStatusBtn.addEventListener("click", showChangeUnitStatus);
    });
}

const showUnitsList = () => {
    let container = document.getElementById("content");
    let units = [];
    getData("/units/getUnits").then(data => {
        for(let i=0;i<data.length;i++){
            units.push(data[i]);
        }
        let str = '';
        if (units.length!=0){
            str += '<label for="checkActive">Pokaż wszystkie egzemplarze</label><input type="checkbox" id="checkActive" name="checkActive" checked/>';
            str += '<table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td><td>'+units[i].customer.surname+'</td><td>'+units[i].customer.firstName+'</td></tr>';
            }
            str += '</table>';
            str += '<button id="deleteUnit">Usuń pojazd</button>';
            str += '<button id="changeUnitStatus">Zmień status</button>';
        }
        container.innerHTML = str;

        let checkActive = document.querySelector("input[name=checkActive]");
        checkActive.addEventListener("change", function() {
            if (!this.checked){
                showActiveUnitsList();
            }
        });

        let deleteBtn = document.getElementById("deleteUnit");
        deleteBtn.addEventListener("click", showDeleteUnit);

        let changeUnitStatusBtn = document.getElementById("changeUnitStatus");
        changeUnitStatusBtn.addEventListener("click", showChangeUnitStatus);
    });
}

const showDeleteUnit = () => {
    let container = document.getElementById("content");
    let units = [];
    getData("/units/getActiveUnits").then(data => {
        for(let i=0;i<data.length;i++){
            units.push(data[i]);
        }
        let str = '';
        if (units.length!=0){
            str += '<form id="deleteForm"><table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td><input type="radio" name="unit" value="'+units[i].id_unit+'"/></td><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td></tr>';
            }
            str += '</table></form>';
            str += '<button id="deleteUnit">Usuń</button></br>';
        }
        container.innerHTML = str;

        let deleteBtn = document.getElementById("deleteUnit");
        deleteBtn.addEventListener("click", deleteUnit);
    });
}

const showChangeUnitStatus = () => {
    let container = document.getElementById("content");
    let units = [];
    getData("/units/getUnits").then(data => {
        for(let i=0;i<data.length;i++){
            units.push(data[i]);
        }
        let str = '';
        if (units.length!=0){
            str += '<table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td><td>'+units[i].customer.surname+'</td><td>'+units[i].customer.firstName+'</td>';
                str += '<td><button onclick="changeUnit('+units[i].id_unit+');">Zmień</button></td></tr>';
            }
            str += '</table>';
        }
        container.innerHTML = str;
    });
}

const changeUnit = (id) => {
    let container = document.getElementById("content");
    container.innerHTML = `
    <select id="statusSelect">
    <option value="skonfigurowano" selected>utworzono</option>
    <option value="składnik zamowienia">w zamówieniu</option>
    <option value="na placu">na placu</option>
    <option value="transakcja zakonczona">transakcja zakończona</option>
    </select>
    <button id="changeBtn">Zatwierdź</button>
    `;

    let changeBtn = document.getElementById("changeBtn");
    changeBtn.addEventListener("click", function() {
        let status = document.getElementById("statusSelect").value;
        let data = {
            "id_unit": id,
            "status": status
        }
        postData('/units/update', data).then(response => {
            if(response.ok){
                alert("Zaktualizowano");
                showActiveUnitsList();
            }
            else{
                alert("Wystąpił problem z aktualizacją");
                showChangeUnitStatus();
            }
        });
    });
}

const deleteUnit = () => {
    let id = document.getElementById("deleteForm").elements["unit"].value;

    if (id != null){
        let data = {
            "id_unit":id
        }
        postData('/units/delete', data).then(response => {
            if(response.ok){
                alert("Usunięto pojazd");
                showUnitsList();
            }
            else{
                alert("Nie można usuwać pojazdów, które są częścią zamówienia lub są na placu");
            }
        });
    }
}

const getCustomersOptionList = async () => {
    let data = await getData('/customers/getAll')
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_customer+'">' + data[i].surname + ' ' + data[i].firstName + '</option>';
    }
    return str;
}

const showAddUnitPage = async () => {
    let container = document.getElementById("content");
    let cars = await getCarOptionList();
    let colors = await getColorOptionList();
    let customers = await getCustomersOptionList();
    container.innerHTML = `
        <label for="selectCar">Samochód</label>
        <select id="selectCar" name="selectCar">`+ cars +`</select></br>
        <label for="selectColor">Kolor</label>
        <select id="selectColor" name="selectColor">`+ colors +`</select></br>
        <label for="selectCustomers">Klient</label>
        <select id="selectCustomers" name="selectCustomers">`+customers+`</select></br>
        <button id="addNewUnitBtn">Dodaj</button>
    `;

    let addBtn = document.getElementById("addNewUnitBtn");
    addBtn.addEventListener("click", addNewUnit);
}

const addNewUnit = () =>{
    let user;
    if(sessionStorage.getItem("role")==="ROLE_CLIENT"){
        user = sessionStorage.getItem("user");
    }
    else{
        user = document.getElementById("selectCustomers").value;
    }
    let data = {
        "id_car": document.getElementById("selectCar").value,
        "id_customer": user,
        "id_color": document.getElementById("selectColor").value,
        "status": "skonfigurowano"
    };
    console.log(data);
    postData("/units/add", data).then(response => {
        if(response.ok){
            alert("Dodano pojazd!");
            showUnitsList();
        }
        else{
            alert("Wystąpił problem z dodaniem pojazdu");
        }
    })
}