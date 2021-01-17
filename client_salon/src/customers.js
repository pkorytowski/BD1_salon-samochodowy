const showCustomersListPage = () => {
    let container = document.getElementById("content");
    let customers = [];
    getData('/customers/getAll').then(data => {
        for(let i=0;i<data.length;i++){
            customers.push(data[i]);
        }
        let str = '';
        if(customers.length!=0){

            str += '<table>';
            for(let i=0; i<customers.length; i++){
                if(customers[i].companyName==null){
                    customers[i].companyName = '';
                }
                if(customers[i].nip==null){
                    customers[i].nip = '';
                }
                str += '<tr><td>'+customers[i].surname+'</td><td>'+customers[i].firstName+'</td><td>'+customers[i].companyName+'</td><td>'+customers[i].nip+'</td>';
                str += '<td>'+customers[i].street+'</td><td>'+customers[i].flatNumber+'</td><td>'+customers[i].postalCode+'</td><td>'+customers[i].city+'</td>';
                str += '<td>'+customers[i].phoneNumber+'</td><td>'+customers[i].email+'</td>';
                str += '<td><button id="'+customers[i].id_customer+'">Edytuj</button></td>';
                str += '<td><button onclick="deleteCustomer('+customers[i].id_customer+');">Usuń</button></td>';
                str += '</tr>';
            }
            str += '</table>';
            container.innerHTML = str;

            for(let i=0;i<customers.length;i++){
                let btn = document.getElementById(customers[i].id_customer);
                btn.addEventListener("click", function(){
                    showUpdateCustomer(customers[i]);
                });
            }
        }
    });
}

const deleteCustomer = (id) => {
    let confirmation = prompt('Jesli chcesz usunąć klienta przepisz jego id ('+id+') do pola poniżej');
    if(id==confirmation){
        let data = {
            "id_customer": id
        }
        postData('/customers/delete', data).then(response => {
            if(response.ok){
                alert("Usunięto");
                showCustomersListPage();
            }
            else{
                alert("Nie można usunąć użytkownika, który złożył zamówienie");
            }
        })
    }
    else {
        alert("Wprowadzono niepoprawne id");
    }
}
const showUpdateCustomer = (customer) => {
let container = document.getElementById("content");
container.innerHTML = `

    <form>
    <label for="name">Imię:</label>
    <input id="name" name="name" value="`+ customer.firstName +`"/></br>
    <label for="surname">Nazwisko:</label>
    <input id="surname" name="surname" value="`+ customer.surname +`"/></br>
    <label for="companyName">Nazwa firmy:</label>
    <input id="companyName" name="companyName" value="`+ customer.companyName +`"/></br>
    <label for="nip">NIP:</label>
    <input id="nip" name="nip" value="`+ customer.nip +`"/></br>
    <label for="street">Ulica:</label>
    <input id="street" name="street" value="`+ customer.street +`"/></br>
    <label for="flatNumber">Numer mieszkania:</label>
    <input id="flatNumber" name="flatNumber" value="`+ customer.flatNumber +`"/></br>
    <label for="postalCode">Kod pocztowy:</label>
    <input id="postalCode" name="postalCode" value="`+ customer.postalCode +`"/></br>
    <label for="city">Miasto:</label>
    <input id="city" name="city" value="`+ customer.city +`"/></br>
    <label for="phoneNumber">Numer telefonu:</label>
    <input id="phoneNumber" name="phoneNumber" value="`+ customer.phoneNumber +`"/></br>
    <label for="email">Email:</label>
    <input id="email" name="email" value="`+ customer.email +`"/></br>
    </form>
    
    <button id="updateCustomerBtn">Zmodyfikuj</button>
`;

let btn = document.getElementById("updateCustomerBtn");
btn.addEventListener("click", function(){
    updateCustomer(customer.id_customer);
});

}

const showAddCustomerPage = () => {
    let container = document.getElementById("content");
    container.innerHTML = `
    <form>
    <label for="email">Email:</label>
    <input id="email" name="email" required/></br>
    <label for="password">Hasło:</label>
    <input type="password" id="password" name="password" required/></br>
    <label for="passwordConfirm">Powtórz hasło:</label>
    <input type="password" id="passwordConfirm" name="passwordConfirm" required/></br>
    <label for="name">Imię:</label>
    <input id="name" name="name"/></br>
    <label for="surname">Nazwisko:</label>
    <input id="surname" name="surname"/></br>
    <label for="companyName">Nazwa firmy:</label>
    <input id="companyName" name="companyName"/></br>
    <label for="nip">NIP:</label>
    <input id="nip" name="nip"/></br>
    <label for="street">Ulica:</label>
    <input id="street" name="street"/></br>
    <label for="flatNumber">Numer mieszkania:</label>
    <input id="flatNumber" name="flatNumber"/></br>
    <label for="postalCode">Kod pocztowy:</label>
    <input id="postalCode" name="postalCode"/></br>
    <label for="city">Miasto:</label>
    <input id="city" name="city"/></br>
    <label for="phoneNumber">Numer telefonu:</label>
    <input id="phoneNumber" name="phoneNumber"/></br>
    </form>
    <button id="addCustomerBtn">Dodaj</button>
`;
    let btn = document.getElementById("addCustomerBtn");
    btn.addEventListener("click", addCustomer);
}

const addCustomer = () => {
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
                        alert("Dodano");
                        showCustomersListPage();
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

const updateCustomer = (id) => {
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
    if(nip==null || !isNan(nip)) {
        let phoneNumber = parseInt(document.getElementById("phoneNumber").value);
        if (isNaN(phoneNumber)) {
            alert("wprowadzono zły numer telefonu");
        } else {
            let data = {
                "id_customer": id,
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
            }
            postData('/customers/update', data).then(response => {
                if (response.ok) {
                    alert("Zmodyfikowano");
                    showCustomersListPage();
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