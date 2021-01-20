const showActiveUnitsList = () => {
    let container = document.getElementById("content");
    let units = [];
    getData("/units/getActiveUnits").then(data => {
        for(let i=0;i<data.length;i++){
            units.push(data[i]);
        }
        let str = '';
        str += '<label for="checkActive">Pokaż wszystkie egzemplarze</label><input type="checkbox" id="checkActive" name="checkActive">';
        if (units.length!==0){
            str += '<table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td>'+units[i].id_unit+'</td><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td><td>'+units[i].customer.surname+'</td><td>'+units[i].customer.firstName+'</td>';
                str += '<td><button onclick="changeUnit('+units[i].id_unit+');">Zmień status</button></td>';
                if(units[i].status==='skonfigurowano'){
                    str += '<td><button onclick="deleteUnit('+units[i].id_unit+');">Usuń pojazd</button></td>';
                }
                str += '</tr>';
            }
            str += '</table>';
        }
        container.innerHTML = str;

        let checkActive = document.querySelector("input[name=checkActive]");
        checkActive.addEventListener("change", function() {
            if (this.checked){
                showUnitsList();
            }
        });
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
        str += '<label for="checkActive">Pokaż wszystkie egzemplarze</label><input type="checkbox" id="checkActive" name="checkActive" checked/>';
        if (units.length!=0){
            str += '<table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td><td>'+units[i].customer.surname+'</td><td>'+units[i].customer.firstName+'</td>';
                str += '<td><button onclick="changeUnit('+units[i].id_unit+');">Zmień status</button></td>';
                if(units[i].status==='skonfigurowano'){
                    str += '<td><button onclick="deleteUnit('+units[i].id_unit+');">Usuń pojazd</button></td>';
                }
                str += '</tr>';
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
    });
}

const showCustomerUnitsList = () => {
    let container = document.getElementById("content");
    let units = [];
    let params = new URLSearchParams({
        id_customer:sessionStorage.getItem("user")
    })
    getDataWithParams("/units/getCustomerActiveUnits", params).then(data => {
        for(let i=0;i<data.length;i++){
            units.push(data[i]);
        }
        let str = '';
        if (units.length!==0){
            str += '<table>';
            for(let i=0; i<units.length; i++){
                str += '<tr><td>'+units[i].id_unit+'</td><td>' + units[i].status + '</td>' + '<td>' + units[i].car.model + '</td>' + '<td>';
                str += units[i].car.engine + '</td>' + '<td>' + units[i].car.version + '</td><td>' + units[i].color;
                str += '</td><td>'+units[i].value+'</td><td>'+units[i].customer.surname+'</td><td>'+units[i].customer.firstName+'</td>';
                if(units[i].status==='skonfigurowano'){
                    str += '<td><button onclick="deleteUnit('+units[i].id_unit+');">Usuń pojazd</button></td>';
                }
                str += '</tr>';
            }
            str += '</table>';

        }
        container.innerHTML = str;
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
    <option value="skonfigurowano" selected>skonfigurowano</option>
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

const deleteUnit = (id) => {
    let data = {
        "id_unit":id
    }
    postData('/units/delete', data).then(response => {
        if(response.ok){
            alert("Usunięto pojazd");
            if(sessionStorage.getItem("role")==="ROLE_CLIENT"){
                showCustomerUnitsList();
            }
            else{
                showUnitsList();
            }
        }
        else{
            alert("Nie można usuwać pojazdów, które są częścią zamówienia lub są na placu");
        }
    });
}

const getCustomersOptionList = async () => {
    let data = await getData('/customers/getAll')
    let str = '';
    str += '<option value="">brak</option>';
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

const showCustomerAddUnitPage = async () => {
    let container = document.getElementById("content");
    let cars = await getCarOptionList();
    let colors = await getColorOptionList();
    container.innerHTML = `
        <label for="selectCar">Samochód</label>
        <select id="selectCar" name="selectCar">`+ cars +`</select></br>
        <label for="selectColor">Kolor</label>
        <select id="selectColor" name="selectColor">`+ colors +`</select></br>
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
        if (user===''){
            user=null;
        }
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
            if(sessionStorage.getItem("role")==="ROLE_CLIENT"){
                showCustomerUnitsList();
            }
            else{
                showUnitsList();
            }
        }
        else{
            alert("Wystąpił problem z dodaniem pojazdu");
        }
    })
}