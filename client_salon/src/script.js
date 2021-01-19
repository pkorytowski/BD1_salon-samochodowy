

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
            <li><a href="#" id="showAddCustomer">Dodaj klienta</a></li>
        </ul>
        </li>
        <li><a href="#" id="showEmployees">Pracownicy</a>
        <ul>
            <li><a href="#" id="showEmployeesList">Pokaż pracowników</a></li>
            <li><a href="#" id="showAddEmployee">Dodaj pracownika</a></li>
        </ul>
        </li>
        <li><a href="#" id="showRelease">Pokój wydań</a>
        <ul>
            <li><a href="#" id="showReleaseRoom">Pokaż aktualne wydania</a></li>
            <li><a href="#" id="showAddRelease">Dodaj nowe wydanie</a></li>
        </ul>
        </li>
        <li><a href="#" id="showTest">Jazda próbna</a>
        <ul>
            <li><a href="#" id="showTestDrive">Pokaż aktualne jazdy próbne</a></li>
            <li><a href="#" id="showAddTestDrive">Dodaj jazdę próbną</a></li>
        </ul>
        </li>
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

    let showAddCustomer = document.getElementById("showAddCustomer");
    showAddCustomer.addEventListener("click", showAddCustomerPage);

    let showEmployeesList = document.getElementById("showEmployeesList");
    showEmployeesList.addEventListener("click", showEmployeesPage);

    let showAddEmployee = document.getElementById("showAddEmployee");
    showAddEmployee.addEventListener("click", showAddEmployeePage);

    let showReleaseRoom = document.getElementById("showReleaseRoom");
    showReleaseRoom.addEventListener("click", showReleaseRoomPage);

    let showAddRelease = document.getElementById("showAddRelease");
    showAddRelease.addEventListener("click", showAddReleasePage);

    let showTestDrive = document.getElementById("showTestDrive");
    showTestDrive.addEventListener("click", showTestDrivePage);

    let showAddTestDrive = document.getElementById("showAddTestDrive");
    showAddTestDrive.addEventListener("click", showAddTestDrivePage);


    let container = document.getElementById("content");
    container.innerHTML = `
    <h3> Wybierz jedną z poniższych opcji</h3>
    `;

}




