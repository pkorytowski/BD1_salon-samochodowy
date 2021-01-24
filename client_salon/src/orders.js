const showCurrentOrdersPage = async () => {
    let container = document.getElementById("content");
    let ordersStr = await getOrdersTable("/orders/getActiveOrders");
    let str = '';
    str += '<label for="checkActive">Pokaż wszystkie zamówienia</label><input type="checkbox" id="checkActive" name="checkActive">';
    str += ordersStr;
    container.innerHTML = str;

    let checkActive = document.querySelector("input[name=checkActive]");
    checkActive.addEventListener("change", function() {
        if (this.checked){
            showOrdersPage();
        }
    });

}

const showCustomerCurrentOrdersPage = async () => {
    let container = document.getElementById("content");
    let ordersStr = await getCustomerOrdersTable("/orders/getCustomerActiveOrders");
    let str = '';
    str += '<label for="checkActive">Pokaż wszystkie zamówienia</label><input type="checkbox" id="checkActive" name="checkActive">';
    str += ordersStr;
    container.innerHTML = str;

    let checkActive = document.querySelector("input[name=checkActive]");
    checkActive.addEventListener("change", function() {
        if (this.checked){
            showCustomerOrdersPage();
        }
    });
}

const showCustomerOrdersPage = async () => {
    let container = document.getElementById("content");
    let ordersStr = await getCustomerOrdersTable("/orders/getCustomerAll");
    let str = '';
    str += '<label for="checkActive">Pokaż wszystkie zamówienia</label><input type="checkbox" id="checkActive" name="checkActive" checked>';
    str += ordersStr;
    container.innerHTML = str;

    let checkActive = document.querySelector("input[name=checkActive]");
    checkActive.addEventListener("change", function() {
        if (!this.checked){
            showCustomerCurrentOrdersPage();
        }
    });
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
        
        <table id="registerTable">
        <form>
        <tr>
        <td><label for="units">Egzemplarz</label></td>
        <td><select class="form-control" id="units" name="units">`+units+`</select></td>
        </tr>
        <tr>
        <td><label for="employees">Pracownik</label></td>
        <td><select class="form-control" id="employees" name="employees">`+employees+`</select></td>
        </tr>
        <tr>
        <td><label for="discount">Rabat</label></td>
        <td><input class="form-control" type="text" id="discount" name="discount" value="0"/></td>
        </tr>
        <tr>
        <td colspan="2" style="text-align: center;"><button id="addOrderBtn">Utwórz</button></td>
        </tr>
        </form>
        </table>
  
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
        if(data[i].customer.firstName == null){
            name = '';
        }
        if(data[i].customer.surname == null){
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

const getCustomerOrdersTable = async (path) => {
    let params = new URLSearchParams({
        id_customer:sessionStorage.getItem("user")
    })
    let orders = await getDataWithParams(path, params);
    let str = '';
    if (orders.length!==0){
        str += '<table class="infoTable" style="width: 90%;">';
        str += '<tr><td>Id. zamów.</td><td>Status</td><td>Pracownik odpowiedzialny</td><td>Model</td><td>Silnik</td><td>Wer.wyposażenia</td><td>Rok modelowy</td><td>Rabat</td><td>Cena</td></tr>'
        for(let i=0; i<orders.length; i++){
            str += '<tr>';
            str += '<td>' + orders[i].id_order + '</td>';
            str += '<td>' + orders[i].status + '</td>';
            str += '<td>' + orders[i].employee.surname + ' ' + orders[i].employee.name +'</td>';
            str += '<td>' + orders[i].unit.car.model + '</td>';
            str += '<td>' + orders[i].unit.car.engine + '</td>';
            str += '<td>' + orders[i].unit.car.version + '</td>';
            str += '<td>' + orders[i].unit.car.year + '</td>';
            str += '<td>' + orders[i].discount + '</td>';
            str += '<td>' + orders[i].value + '</td>';
            str += '</tr>';
        }
        str += '</table>';
    }
    return str;
}

const getOrdersTable = async (path) => {
    let orders = await getData(path);
    let str = '';
    if (orders.length!==0){
        str += '<table class="infoTable" style="width: 90%;">';
        str += '<tr><td>Id. zamów.</td><td>Status zamówienia</td><td>Pracownik odpowiedzialny</td><td>Klient</td><td>Model</td><td>Silnik</td><td>Wer. wyposażenia</td><td>Rok modelowy</td><td>Rabat</td><td>Cena</td><td></td><td></td><td></td></tr>';
        for(let i=0; i<orders.length; i++){
            str += '<tr>';
            str += '<td>' + orders[i].id_order + '</td>';
            str += '<td>' + orders[i].status + '</td>';
            str += '<td>' + orders[i].employee.surname + ' ' + orders[i].employee.name + '</td>';
            str += '<td>' + orders[i].unit.customer.surname  + ' ' + orders[i].unit.customer.firstName + '</td>';
            str += '<td>' + orders[i].unit.car.model + '</td>';
            str += '<td>' + orders[i].unit.car.engine +'</td>';
            str += '<td>' + orders[i].unit.car.version + '</td>';
            str += '<td>' + orders[i].unit.car.year + '</td>';
            str += '<td>' + orders[i].discount + '</td>';
            str += '<td>' + orders[i].value + '</td>';
            str += '<td><button onclick="showChangeOrderStatus('+orders[i].id_order+')">Zmień status</button></td>';
            if(orders[i].status==="utworzono"){
                str += '<td><button onclick="showChangeDiscount('+orders[i].id_order+', '+orders[i].discount+')">Edytuj rabat</button></td>';
                str += '<td><button onclick="deleteOrder('+orders[i].id_order+');">Usuń</button></td>'
            }
            else{
                str += '<td></td><td></td>';
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

const deleteOrder = (id) => {
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