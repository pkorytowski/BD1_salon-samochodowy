const loginPanel = () => {
    let container = document.getElementById("content");
    container.innerHTML = `
    <label for="login">Login</label>
    <input type="text" id="login" name="login"/><br/>
    <label for="password">Hasło</label>
    <input type="password" id="password" name="password"/><br/>
    <br/>
    <label for="type_login">Zaloguj się jako</label>
        <select name="type_login" id="type_login">
        <option value="customer" selected >Klient</option>
        <option value="seller">Sprzedawca</option>
        <option value="manager">Kierownik</option>
    </select>
    <button id="loginBtn">Zaloguj się</button>
    `;

    let btn = document.getElementById("loginBtn");
    btn.addEventListener("click", login);
}


const login = () => {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let option = document.getElementById("type_login").value;

    let data =
        {
            "user": login,
            "password": password
        }

    postData("/login/" + option, data)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem("user", data.user);
            sessionStorage.setItem("auth", data.token);
            sessionStorage.setItem("role", data.role);

            if(data.token == null){
                alert("Niepoprawne dane logowania");
            }
            else{
                displayContent();
            }
        });
}

const registerPanel = () => {

    let container = document.getElementById("content");
    container.innerHTML = `
    <form>
    <table style="margin:auto" id="registerTable">
    <tr>
    <td><label for="email">Email:</label></td>
    <td><input id="email" name="email" required/></td>
    </tr>
    <tr>
    <td><label for="password">Hasło:</label></td>
    <td><input type="password" id="password" name="password" required/></td>
    </tr>
    <tr>
    <td><label for="passwordConfirm">Powtórz hasło:</label></td>
    <td><input type="password" id="passwordConfirm" name="passwordConfirm" required/></td>
    </tr>
    <tr>
    <td><label for="name">Imię:</label></td>
    <td><input id="name" name="name"/></td>
    </tr>
    <tr>
    <td><label for="surname">Nazwisko:</label></td>
    <td><input id="surname" name="surname"/></td>
    </tr>
    <tr>
    <td><label for="companyName">Nazwa firmy:</label></td>
    <td><input id="companyName" name="companyName"/></td>
    </tr>
    <tr>
    <td><label for="nip">NIP:</label></td>
    <td><input id="nip" name="nip"/></td>
    </tr>
    <tr>
    <td><label for="street">Ulica:</label></td>
    <td><input id="street" name="street"/></td>
    </tr>
    <tr>
    <td><label for="flatNumber">Numer mieszkania:</label></td>
    <td><input id="flatNumber" name="flatNumber"/></td>
    </tr>
    <tr>
    <td><label for="postalCode">Kod pocztowy:</label></td>
    <td><input id="postalCode" name="postalCode"/></td>
    </tr>
    <tr>
    <td><label for="city">Miasto:</label></td>
    <td><input id="city" name="city"/></td>
    </tr>
    <tr>
    <td><label for="phoneNumber">Numer telefonu:</label></td>
    <td><input id="phoneNumber" name="phoneNumber"/></td>
    </tr>
    </table>
    </form>
    <button id="addCustomerBtn">Dodaj</button>
    `;
    let btn = document.getElementById("addCustomerBtn");
    btn.addEventListener("click", registerCustomer);
}

const registerCustomer = () => {
    let pass = document.getElementById("password").value;
    let passConf = document.getElementById("passwordConfirm").value;
    if(pass===passConf){
        let companyName = document.getElementById("companyName").value;
        if (companyName===''){
            companyName=null;
        }
        let nip = document.getElementById("nip").value;
        if(nip===''){
            nip=null;
        }
        else{
            nip = parseInt(nip);
        }
        if(nip==null || !isNaN(nip)) {
            let phoneNumber = parseInt(document.getElementById("phoneNumber").value);
            if (isNaN(phoneNumber)) {
                alert("wprowadzono zły numer telefonu");
                showAddCustomerPage();
            }
            else {
                let data = {
                    "firstName": document.getElementById("name").value,
                    "surname": document.getElementById("surname").value,
                    "companyName": companyName,
                    "NIP": nip,
                    "street": document.getElementById("street").value,
                    "flatNumber": document.getElementById("flatNumber").value,
                    "postalCode": document.getElementById("postalCode").value,
                    "city": document.getElementById("city").value,
                    "phoneNumber": phoneNumber,
                    "email": document.getElementById("email").value,
                    "password": pass
                }
                postData('/customers/add', data).then(response => {
                    if (response.ok) {
                        alert("Udało się! Teraz możesz zalogować się jako klient.");
                        loginPanel();
                    } else {
                        alert("Wystąpił problem");
                    }
                });
            }
        }
        else{
            alert("Podano zły nip");
        }
    }
    else{
        alert("Hasła nie pasują");
    }

}

const performLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    displayContent();
}


