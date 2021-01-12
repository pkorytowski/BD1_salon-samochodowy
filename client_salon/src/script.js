

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
    let container = document.getElementById("content");
    container.innerHTML = `
    <ul>
        <li><a href="#" id="showCars">Samochody</a></li>
        <li><a href="#" id="showOrders">Zamowienia</a></li>
        <li><a href="#" id="showCustomers">Klienci</a></li>
        <li><a href="#" id="showEmployees">Pracownicy</a></li>
        <li><a href="#" id="showReleaseRoom">Pokój wydań</a></li>
        <li><a href="#" id="showTestDrive">Jazda próbna</a></li>
    </ul>
    `;

    let showCars = document.getElementById("showCars");
    showCars.addEventListener("click", showCarsList);
}




