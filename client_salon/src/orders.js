const showCurrentOrdersPage = async () => {
    let container = document.getElementById("content");
    let ordersStr = await getOrdersTable("/orders/getActiveOrders");
    let str = '';
    str += '<label for="checkActive">Pokaż wszystkie zamówienia</label><input type="checkbox" id="checkActive" name="checkActive">';
    str += ordersStr;
    str += '<button id="deleteOrder">Usuń zamówienie</button>';
    container.innerHTML = str;

    let checkActive = document.querySelector("input[name=checkActive]");
    checkActive.addEventListener("change", function() {
        if (this.checked){
            showOrdersPage();
        }
    });

    let deleteBtn = document.getElementById("deleteOrder");
    deleteBtn.addEventListener("click", showDeleteOrder);

}

const showOrdersPage = async () => {
    let container = document.getElementById("content");
    let ordersStr = await getOrdersTable("/orders/getAll");
    let str = '';
    str += '<label for="checkActive">Pokaż wszystkie zamówienia</label><input type="checkbox" id="checkActive" name="checkActive" checked>';
    str += ordersStr;
    container.innerHTML = str;

    let checkActive = document.querySelector("input[name=checkActive]");
    checkActive.addEventListener("change", function() {
        if (!this.checked){
            showCurrentOrdersPage();
        }
    });
}

const showAddOrderPage = async () =>{
    let units = await getUnitsOptionList();
    let employees = await getEmployeesOptionList();
    let container = document.getElementById("content");
    container.innerHTML = `
        <label for="units">Egzemplarz</label>
        <select id="units" name="units">`+units+`</select>
        <label for="employees">Pracownik</label>
        <select id="employees" name="employees">`+employees+`</select>
        <label for="discount">Rabat</label>
        <input type="text" id="discount" name="discount"/>
        <button id="addOrderBtn">Utwórz</button>
    `;

    let addOrderBtn = document.getElementById("addOrderBtn");
    addOrderBtn.addEventListener("click", addOrder);
}

const addOrder = () => {
    let discount = parseFloat(document.getElementById("discount").value);
    if(isNaN(discount)){
        alert("Wprowadź poprawną wartość rabatu");
    }
    else{
        let unit = document.getElementById("units").value;
        let employee = document.getElementById("employees").value;
        let data = {
            "id_unit": unit,
            "id_employee": employee,
            "status": "utworzono",
            "discount": discount
        }
        postData('/orders/add', data).then(response => {
            if(response.ok){
                alert("Dodano zamówienie!");
                showCurrentOrdersPage();
            }
            else{
                alert("Wystąpił problem z dodaniem zamówienia");
            }
        })
    }
}


const getUnitsOptionList = async () => {
    let data = await getData('/units/getConfiguredUnits');
    let name = '';
    let surname = '';
    let str = '';
    for(let i=0; i<data.length; i++){
        if(data[i].customer == null){
            name = '';
            surname = '';
        }
        else{
            name = data[i].customer.firstName;
            surname = data[i].customer.surname;
        }
        str += '<option value="'+data[i].id_unit+'">'+data[i].car.model+' | '+data[i].car.version+' | ' +data[i].car.engine+' | ' + data[i].value +' | ' + surname + ' ' + name +'</option>';
    }
    return str;
}

const getEmployeesOptionList = async () => {
    let data = await getData('/employees/getSellers')
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_employee+'">' + data[i].surname + ' ' + data[i].name + '</option>';
    }
    return str;
}

const getOrdersTable = async (path) => {
    let orders = await getData(path);
    let str = '';
    if (orders.length!==0){
        str += '<table>';
        for(let i=0; i<orders.length; i++){
            str += '<tr><td>' + orders[i].status + '</td>' + '<td>' + orders[i].employee.surname + '</td>' + '<td>';
            str += orders[i].unit.customer.surname + '</td>' + '<td>' + orders[i].unit.customer.firstName + '</td><td>' + orders[i].unit.car.model;
            str += '</td><td>'+orders[i].unit.car.engine+'</td><td>'+orders[i].unit.car.version+ '</td>';
            str += '<td>'+orders[i].unit.car.year+'</td><td>'+orders[i].discount+'</td><td>'+orders[i].value+'</td>';
            str += '<td><button onclick="showChangeOrderStatus('+orders[i].id_order+')">Zmień status</button></td>';
            if(orders[i].status==="utworzono"){
                str += '<td><button onclick="showChangeDiscount('+orders[i].id_order+', '+orders[i].discount+')">Edytuj rabat</button></td>';
            }
            str += '</tr>';
        }
        str += '</table>';
    }
    return str;
}

const showChangeDiscount = (id, value) => {
    let container = document.getElementById("content");
    container.innerHTML = `
    <label for="discount">Wartość rabatu</label>
    <input type="text" id="discount" name="discount" value="`+value+`"/></br>
    <button id="changeDiscountBtn">Zaktualizuj</button>
    `;

    let changeDiscountBtn = document.getElementById("changeDiscountBtn");
    changeDiscountBtn.addEventListener("click", function () {
        changeDiscount(id)
    });
}

const changeDiscount = (id) => {
    let discount = parseFloat(document.getElementById("discount").value);
    if(isNaN(discount)){
        alert("Wprowadź prawidłową wartość rabatu");
    }
    else{
        let data = {
            "id_order": id,
            "discount": discount
        }
        console.log(data);
        postData('/orders/discount', data).then(response => {
            if(response.ok){
                alert("Zaktualizowano");
                showCurrentOrdersPage();
            }
            else{
                alert("Wystąpił błąd");
            }
        });
    }
}

const showChangeOrderStatus = (id) => {
    let container = document.getElementById("content");
    container.innerHTML = `
        <select id="orderStatus">
            <option value="utworzono" selected>utworzono</option>
            <option value="zamowienie zlozone">zamówienie złożone</option>
            <option value="wplacona zaliczka">wpłacona zaliczka</option>
            <option value="gotowe do odbioru">gotowe do odbioru</option>
            <option value="transakcja zakonczona">transakcja zakończona</option>
        </select>
        <button id="changeStatus">Zmień status</button>
    `;
    let btn = document.getElementById("changeStatus");
    btn.addEventListener("click", function () {
        changeOrderStatus(id, document.getElementById("orderStatus").value);
    });
}

const changeOrderStatus = (id, status) => {
    let data = {
        "id_order": id,
        "status": status
    }

    postData("/orders/changeStatus", data).then(response => {
        if (response.ok){
            alert("Zmieniono status");
            showCurrentOrdersPage();
        }
        else{
            alert("Wsystąpił problem ze zmianą statusu.");
        }
    });
}

const showDeleteOrder = () => {
    let container = document.getElementById("content");
    let orders = [];
    getData("/orders/getActiveOrders").then(data => {
        for(let i=0;i<data.length;i++){
            orders.push(data[i]);
        }
        let str = '';
        if (orders.length!=0){
            str += '<form id="deleteForm"><table>';
            for(let i=0; i<orders.length; i++){
                str += '<tr><td><input type="radio" name="order" value="'+orders[i].id_order+'"/></td><td>' + orders[i].status + '</td>' + '<td>' + orders[i].employee.surname + '</td>' + '<td>';
                str += orders[i].unit.customer.surname + '</td>' + '<td>' + orders[i].unit.customer.firstName + '</td><td>' + orders[i].unit.car.model;
                str += '</td><td>'+orders[i].unit.car.engine+'</td><td>'+orders[i].unit.car.version+'</td>';
                str += '<td>'+orders[i].unit.car.year+'</td><td>'+orders[i].discount+'</td><td>'+orders[i].value+'</td></tr>';
            }
            str += '</table></form>';
        }
        str += '<button id="deleteOrder">Usuń</button></br>';
        container.innerHTML = str;

        let deleteBtn = document.getElementById("deleteOrder");
        deleteBtn.addEventListener("click", deleteOrder);
    });
}

const deleteOrder = () => {
    let id = document.getElementById("deleteForm").elements["order"].value;

    if (id != null){
        let data = {
            "id_order":id
        }
        postData('/orders/delete', data).then(response => {
            if(response.ok){
                alert("Usunięto zamowienie");
                showOrdersPage();
            }
            else{
                alert("Nie można usuwać zamówień, które są realizowane");
            }
        });
    }
}