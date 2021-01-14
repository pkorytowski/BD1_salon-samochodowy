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
    str += '<label for="checkActive">Pokaż tylko aktywne zamówienia</label><input type="checkbox" id="checkActive" name="checkActive">';
    str += ordersStr;
    container.innerHTML = str;

    let checkActive = document.querySelector("input[name=checkActive]");
    checkActive.addEventListener("change", function() {
        if (this.checked){
            showCurrentOrdersPage();
        }
    });
}

const showAddOrdersPage = async () =>{
    let container = document.getElementById("content");
    container.innerHTML = `
        <label for="units">Egzemplarz</label>
        <select id="units" name="units"></select>
        <label for="employees">Pracownik</label>
        <select id="employees" name="employees"></select>
        <label for="customers">Klient</label>
        <select id="customers" name="customers"></select>
        <label for="discount">Rabat</label>
        <input type="text" id="discount" name="discount"/>
    `;
}

const getUnitsOptionList = async () => {
    let data = await getData('/units/')
}

const getOrdersTable = async (path) => {
    let orders = await getData(path);
    let str = '';
    if (orders.length!=0){
        str += '<table>';
        for(let i=0; i<orders.length; i++){
            str += '<tr><td>' + orders[i].status + '</td>' + '<td>' + orders[i].employee.surname + '</td>' + '<td>';
            str += orders[i].unit.customer.surname + '</td>' + '<td>' + orders[i].unit.customer.firstName + '</td><td>' + orders[i].unit.car.model;
            str += '</td><td>'+orders[i].unit.car.engine+'</td><td>'+orders[i].unit.car.version+ '</td>';
            str += '<td>'+orders[i].unit.car.year+'</td><td>'+orders[i].discount+'</td><td>'+orders[i].value+'</td>';
            str += '<td><button onclick="showChangeOrderStatus('+orders[i].id_order+')">Zmień status</button></td></tr>';
        }
        str += '</table>';
    }
    return str;
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