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
                if(customers[i].NIP==null){
                    customers[i].NIP = '';
                }
                str += '<tr><td>'+customers[i].surname+'</td><td>'+customers[i].firstName+'</td><td>'+customers[i].companyName+'</td><td>'+customers[i].NIP+'</td>';
                str += '<td>'+customers[i].street+'</td><td>'+customers[i].flatNumber+'</td><td>'+customers[i].postalCode+'</td><td>'+customers[i].city+'</td>';
                str += '<td>'+customers[i].phoneNumber+'</td><td>'+customers[i].email+'</td>';
                str += '<td><button onclick="showUpdateCustomer('+customers[i]+');">Edytuj</button></td>';
                str += '</tr>';
            }
            str += '</table>';
        }
        container.innerHTML = str;
    });
}

const showUpdateCustomer = (customer) => {
let container = document.getElementById("content");
//container.innerHTML = ``;
/*
    <form>
    <label for="name">Imię:</label>
    <input id="name" name="name" value="`+ customer.firstName +`"/></br>`;

    <label for="surname">Nazwisko:</label>
    <input id="surname" name="surname" value="`+ customer.surname +`"/></br>
    <label for="companyName">Nazwa firmy:</label>
    <input id="companyName" name="companyName" value="`+ customer.companyName +`"/></br>
    <label for="NIP">NIP:</label>
    <input id="NIP" name="NIP" value="`+ customer.NIP +`"/></br>
    <label for="street">Ulica:</label>
    <input id="street" name="street" value="`+ customer.street +`"/></br>
    <label for="flatNumber">Numer mieszkania:</label>
    <input id="flatNumber" name="flatNumber" value="`+ customer.flatNumber +`"/></br>
    <label for="postalCode">Kod pocztowy:</label>
    <input id="postalCode" name="postalCode" value="`+ customer.postalCode +`"/></br>
    <label for="city">Miasto:</label>
    <input id="city" name="city" value="`+ customer.city +`"/></br>
    <label for="phoneNumber">Imię:</label>
    <input id="phoneNumber" name="phoneNumber" value="`+ customer.phoneNumber +`"/></br>
    <label for="email">Email:</label>
    <input id="email" name="email" value="`+ customer.email +`"/></br>
    </form>
`;
*/
}