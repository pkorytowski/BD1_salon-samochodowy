const showCustomersListPage = () => {
    let container = document.getElementById("content");
    let customers = [];
    getData('/customers/getAll').then(data => {
        for(let i=0;i<data.length;i++){
            customers.push(data[i]);
        }
        let str = '';
        if(customers.length!=0){

            str += '<table class="infoTable" style="width: 80%;">';
            str += '<tr><td>Klient</td><td>Nazwa firmy</td><td>NIP</td><td>Ulica</td><td>Nr domu</td><td>Kod pocztowy</td><td>Miejscowość</td><td>Nr telefonu</td><td>Email</td><td></td><td></td></tr>';
            for(let i=0; i<customers.length; i++){
                if(customers[i].companyName==null){
                    customers[i].companyName = '';
                }
                if(customers[i].nip==null){
                    customers[i].nip = '';
                }
                str += '<tr><td>'+customers[i].surname+' '+customers[i].firstName+'</td>';
                str += '<td>'+customers[i].companyName+'</td>';
                str += '<td>'+customers[i].nip+'</td>';
                str += '<td>'+customers[i].street+'</td>';
                str += '<td>'+customers[i].flatNumber+'</td>';
                str += '<td>'+customers[i].postalCode+'</td>';
                str += '<td>'+customers[i].city+'</td>';
                str += '<td>'+customers[i].phoneNumber+'</td>';
                str += '<td>'+customers[i].email+'</td>';
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

const showUpdateCustomerProfile = async () => {
    let urldata = new URLSearchParams({
        id_customer: sessionStorage.getItem("user")
    })
    let customer = await getDataWithParams('/customers/getInfo', urldata);
    showUpdateCustomer(customer);
}

const showUpdateCustomer = (customer) => {
let container = document.getElementById("content");
container.innerHTML = `
    <table id="registerTable">
    <form>
    <tr>
    <td><label for="name">Imię:</label></td>
    <td><input class="form-control" id="name" name="name" value="`+ customer.firstName +`"/></td>
    </tr>
    <tr>
    <td><label for="surname">Nazwisko:</label></td>
    <td><input class="form-control" id="surname" name="surname" value="`+ customer.surname +`"/></td>
    </tr>
    <tr>
    <td><label for="companyName">Nazwa firmy:</label></td>
    <td><input class="form-control" id="companyName" name="companyName" value="`+ customer.companyName +`"/></td>
    </tr>
    <tr>
    <td><label for="nip">NIP:</label></td>
    <td><input class="form-control" id="nip" name="nip" value="`+ customer.nip +`"/></td>
    </tr>
    <tr>
    <td><label for="street">Ulica:</label></td>
    <td><input class="form-control" id="street" name="street" value="`+ customer.street +`"/></td>
    </tr>
    <tr>
    <td><label for="flatNumber">Numer mieszkania:</label></td>
    <td><input class="form-control" id="flatNumber" name="flatNumber" value="`+ customer.flatNumber +`"/></td>
    </tr>
    <tr>
    <td><label for="postalCode">Kod pocztowy:</label></td>
    <td><input class="form-control" id="postalCode" name="postalCode" value="`+ customer.postalCode +`"/></td>
    </tr>
    <tr>
    <td><label for="city">Miasto:</label></td>
    <td><input class="form-control" id="city" name="city" value="`+ customer.city +`"/></td>
    </tr>
    <tr>
    <td><label for="phoneNumber">Numer telefonu:</label></td>
    <td><input class="form-control" id="phoneNumber" name="phoneNumber" value="`+ customer.phoneNumber +`"/></td>
    </tr>
    <tr>
    <td><label for="email">Email:</label></td>
    <td><input class="form-control" id="email" name="email" value="`+ customer.email +`"/></td>
    </tr>
    </form>
    <tr>
    <td colspan="2" style="text-align: center"><button id="updateCustomerBtn">Zmodyfikuj</button></td>
    </tr>
`;

let btn = document.getElementById("updateCustomerBtn");
btn.addEventListener("click", function(){
    updateCustomer(customer.id_customer);
});

}

const showAddCustomerPage = () => {
    let container = document.getElementById("content");
    container.innerHTML = `
    <table id="registerTable">
    <form>
    <tr>
    <td><label for="email">Email:</label></td>
    <td><input class="form-control" id="email" name="email" required/></td>
    </tr>
    <tr>
    <td><label for="password">Hasło:</label></td>
    <td><input class="form-control" type="password" id="password" name="password" required/></td>
    </tr>
    <tr>
    <td><label for="passwordConfirm">Powtórz hasło:</label></td>
    <td><input class="form-control"  type="password" id="passwordConfirm" name="passwordConfirm" required/></td>
    </tr>
    <tr>
    <td><label for="name">Imię:</label></td>
    <td><input class="form-control" id="name" name="name"/></td>
    </tr>
    <tr>
    <td><label for="surname">Nazwisko:</label></td>
    <td><input class="form-control" id="surname" name="surname"/></td>
    </tr>
    <tr>
    <td><label for="companyName">Nazwa firmy:</label></td>
    <td><input class="form-control" id="companyName" name="companyName"/></td>
    </tr>
    <tr>
    <td><label for="nip">NIP:</label></td>
    <td><input class="form-control" id="nip" name="nip"/></td>
    </tr>
    <tr>
    <td><label for="street">Ulica:</label></td>
    <td><input class="form-control" id="street" name="street"/></td>
    </tr>
    <tr>
    <td><label for="flatNumber">Numer mieszkania:</label></td>
    <td><input class="form-control" id="flatNumber" name="flatNumber"/></td>
    </tr>
    <tr>
    <td><label for="postalCode">Kod pocztowy:</label></td>
    <td><input class="form-control" id="postalCode" name="postalCode"/></td>
    </tr>
    <tr>
    <td><label for="city">Miasto:</label></td>
    <td><input class="form-control" id="city" name="city"/></td>
    </tr>
    <tr>
    <td><label for="phoneNumber">Numer telefonu:</label></td>
    <td><input class="form-control" id="phoneNumber" name="phoneNumber"/></td>
    </tr>
    </form>
    <tr><td colspan="2" style="text-align: center"><button id="addCustomerBtn">Dodaj</button></td></tr>
    </table>
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
    if(nip==null || !isNaN(nip)) {
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
                    if(sessionStorage.getItem("role")!=="ROLE_CLIENT"){
                        showCustomersListPage();
                    }
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