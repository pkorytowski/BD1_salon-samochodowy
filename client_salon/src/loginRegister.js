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
                displayManagerMenu();
            }
        });
}

const registerPanel = () => {
    let container = document.getElementById("content");
    container.innerHTML = `
    `;
}