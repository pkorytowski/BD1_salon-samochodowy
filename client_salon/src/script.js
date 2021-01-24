const displayContent = () => {
    let container = document.getElementById("content");
    let role = sessionStorage.getItem("role");
    if(role===null){
        container.innerHTML = `
        <button class="loginButtons" onclick="loginPanel();">Zaloguj</button>
        <br/>
        <button class="loginButtons" onclick="registerPanel();">Zarejestruj</button>
        <br/>
        `;
    }
    else if (role==='ROLE_MANAGER'){
        window.location.href="manager.html";
    }
    else if (role==='ROLE_SELLER'){
        window.location.href="seller.html";
    }
    else if (role==='ROLE_CLIENT'){
        window.location.href="customer.html";
    }

}

const displayCustomerMenu = () => {

    let showAvailableCars = document.getElementById("showAvailableCars");
    showAvailableCars.addEventListener("click", showCarsFullInfoList);

    let showVersions = document.getElementById("showVersions");
    showVersions.addEventListener("click", showVersionsPage);

    let showUnits = document.getElementById("showUnits");
    showUnits.addEventListener("click", showCustomerUnitsList);

    let addUnit = document.getElementById("addUnit");
    addUnit.addEventListener("click", showCustomerAddUnitPage);

    let showCurrentOrders = document.getElementById("showCurrentOrders");
    showCurrentOrders.addEventListener("click", showCustomerCurrentOrdersPage);

    let showReleaseRoom = document.getElementById("showReleaseRoom");
    showReleaseRoom.addEventListener("click", showCustomerReleaseRoomPage);

    let showTestDrive = document.getElementById("showTestDrive");
    showTestDrive.addEventListener("click", showCustomerTestDrivePage);

    let showAddTestDrive = document.getElementById("showAddTestDrive");
    showAddTestDrive.addEventListener("click", showCustomerAddTestDrivePage);

    let updateProfile = document.getElementById("showUpdateProfile");
    updateProfile.addEventListener("click", showUpdateCustomerProfile);

    let logout = document.getElementById("logout");
    logout.addEventListener("click", performLogout);

    let container = document.getElementById("content");
    container.innerHTML = `
    <h3> Wybierz jedną z powyższych opcji</h3>
    `;

}

const displaySellerMenu = () => {

    let showAvailableCars = document.getElementById("showAvailableCars");
    showAvailableCars.addEventListener("click", showAvailableCarsList);

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

    let showReleaseRoom = document.getElementById("showReleaseRoom");
    showReleaseRoom.addEventListener("click", showReleaseRoomPage);

    let showTestDrive = document.getElementById("showTestDrive");
    showTestDrive.addEventListener("click", showTestDrivePage);

    let showAddTestDrive = document.getElementById("showAddTestDrive");
    showAddTestDrive.addEventListener("click", showAddTestDrivePage);

    let logout = document.getElementById("logout");
    logout.addEventListener("click", performLogout);

    let container = document.getElementById("content");
    container.innerHTML = `
    <h3> Wybierz jedną z powyższych opcji</h3>
    `;

}

const displayManagerMenu = () => {

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

    let logout = document.getElementById("logout");
    logout.addEventListener("click", performLogout);

    let container = document.getElementById("content");
    container.innerHTML = `
    <h3> Wybierz jedną z powyższych opcji</h3>
    `;

}




