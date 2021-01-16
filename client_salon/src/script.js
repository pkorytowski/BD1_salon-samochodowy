

const displayContent = () => {
    let container = document.getElementById("content");
    let role = sessionStorage.getItem("role");
    if(role==null){
        container.innerHTML = `
        <button onClick="loginPanel()">Zaloguj się</button>
        <br/>
        <button onClick="registerPanel()">Zarejestruj się</button>
        <br/>
        `;
    }
    else if (role==='ROLE_MANAGER'){
        displayManagerMenu();
    }
    else if (role==='ROLE_SELLER'){
        displaySellerMenu();
    }
    else if (role==='ROLE_CLIENT'){
        displayCustomerMenu();
    }
    else{
        container.innerHTML = `
        <ul>
        <li><a id="showCars">dupa</a></li>
        </ul>
        `;

    }
}

const displayManagerMenu = () => {
    let menu = document.getElementById("menu");
    menu.innerHTML = `
    <ol>
        <li><a href="#" id="showCars">Samochody</a>
        <ul>
            <li><a href="#" id="showAvailableCars">Dostępne typy pojazdów</a></li>
            <li><a href="#" id="addCar">Dodaj nowy typ pojazdu</a></li>
            <li><a href="#" id="showUnits">Dostępne egzemplarze</a></li>
            <li><a href="#" id="addUnit">Skonfiguruj auto</a></li>
        </ul>
        </li>
        <li><a href="#" id="showOrders">Zamowienia</a>
        <ul>
            <li><a href="#" id="showCurrentOrders">Pokaż aktualne zamówienia</a></li>
            <li><a href="#" id="showAddOrder">Utwórz nowe zamówienie</a></li>
        </ul>
        </li>
        <li><a href="#" id="showCustomers">Klienci</a>
        <ul>
            <li><a href="#" id="showCustomersList">Pokaż klientów</a></li>
        </ul>
        </li>
        <li><a href="#" id="showEmployees">Pracownicy</a></li>
        <li><a href="#" id="showReleaseRoom">Pokój wydań</a></li>
        <li><a href="#" id="showTestDrive">Jazda próbna</a></li>
    </ol>
    `;

    let showAvailableCars = document.getElementById("showAvailableCars");
    showAvailableCars.addEventListener("click", showAvailableCarsList);

    let addCar = document.getElementById("addCar");
    addCar.addEventListener("click", showAddCarPage);

    let showUnits = document.getElementById("showUnits");
    showUnits.addEventListener("click", showActiveUnitsList);

    let addUnit = document.getElementById("addUnit");
    addUnit.addEventListener("click", showAddUnitPage);

    let showCurrentOrders = document.getElementById("showCurrentOrders");
    showCurrentOrders.addEventListener("click", showCurrentOrdersPage);

    let showAddOrder = document.getElementById("showAddOrder");
    showAddOrder.addEventListener("click", showAddOrderPage);

    let showCustomersList = document.getElementById("showCustomersList");
    showCustomersList.addEventListener("click", showCustomersListPage);

    let container = document.getElementById("content");
    container.innerHTML = `
    <h3> Wybierz jedną z poniższych opcji</h3>
    `;

}




