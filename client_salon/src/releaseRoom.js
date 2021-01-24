const showReleaseRoomPage = () => {
    let container = document.getElementById("content");
    let releases = [];
    getData('/release-room/getAll').then(data => {
        for(let i=0; i<data.length;i++){
            releases.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday">';

        if(releases.length!==0){
            str += '<table class="infoTable">';
            str += '<tr><td>Pracownik odpowiedzialny</td><td>Id. zamówienia</td><td>Data wydania</td><td></td></tr>';
            for(let i=0; i<releases.length; i++){
                str += '<tr>';
                str += '<td>'+releases[i].surname+' '+releases[i].name+'</td>';
                str += '<td>'+releases[i].id_order+'</td>';
                str += '<td>'+timeConverter(releases[i].date)+'</td>';
                str += '<td><button onclick="deleteRelease('+releases[i].id_release+');">Usuń</button></td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (this.checked){
                showFromTodayReleaseRoomPage();
            }
        });
    });
}

const showFromTodayReleaseRoomPage = () => {
    let container = document.getElementById("content");
    let releases = [];
    getData('/release-room/getAllFromToday').then(data => {
        for(let i=0; i<data.length;i++){
            releases.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday" checked>';
        if(releases.length!==0){
            str += '<table class="infoTable">';
            str += '<tr><td>Pracownik odpowiedzialny</td><td>Id. zamówienia</td><td>Data wydania</td><td></td></tr>';
            for(let i=0; i<releases.length; i++){
                str += '<tr><td>'+releases[i].surname+' '+releases[i].name+'</td>';
                str += '<td>'+releases[i].id_order+'</td>';
                str += '<td>'+timeConverter(releases[i].date)+'</td>';
                str += '<td><button onclick="deleteRelease('+releases[i].id_release+');">Usuń</button></td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (!this.checked){
                showReleaseRoomPage();
            }
        });
    });
}

const showCustomerReleaseRoomPage = () => {
    let container = document.getElementById("content");
    let releases = [];
    let params = new URLSearchParams({
        id_customer:sessionStorage.getItem("user")
    })
    getDataWithParams('/release-room/getCustomerAll', params).then(data => {
        for(let i=0; i<data.length;i++){
            releases.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday">';

        if(releases.length!==0){
            str += '<table class="infoTable">';
            str += '<tr><td>Osoba odpowiedzialna</td><td>Id. zamówienia</td><td>Data wydania</td></tr>';
            for(let i=0; i<releases.length; i++){
                str += '<tr><td>'+releases[i].surname+' '+releases[i].name+'</td>';
                str += '<td>'+releases[i].id_order+'</td>';
                str += '<td>'+timeConverter(releases[i].date)+'</td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (this.checked){
                showCustomerFromTodayReleaseRoomPage();
            }
        });
    });
}

const showCustomerFromTodayReleaseRoomPage = () => {
    let container = document.getElementById("content");
    let releases = [];
    let params = new URLSearchParams({
        id_customer:sessionStorage.getItem("user")
    })
    getDataWithParams('/release-room/getCustomerAllFromToday', params).then(data => {
        for(let i=0; i<data.length;i++){
            releases.push(data[i]);
        }
        let str = '';
        str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday" checked>';
        if(releases.length!==0){
            str += '<table class="infoTable">';
            str += '<tr><td>Osoba odpowiedzialna</td><td>Id. zamówienia</td><td>Data wydania</td></tr>';
            for(let i=0; i<releases.length; i++){
                str += '<tr><td>'+releases[i].surname+' '+releases[i].name+'</td>';
                str += '<td>'+releases[i].id_order+'</td>';
                str += '<td>'+timeConverter(releases[i].date)+'</td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
        let checkActive = document.querySelector("input[name=showFromToday]");
        checkActive.addEventListener("change", function() {
            if (!this.checked){
                showCustomerReleaseRoomPage();
            }
        });
    });
}

const deleteRelease = (id) => {
    let data = {
        "id_release": id
    }
    postData('/release-room/delete', data).then(response => {
        if(response.ok){
            alert("Usunięto");
            showReleaseRoomPage();
        }
        else{
            alert("Wystąpił błąd");
        }
    });
}

const getActiveOrdersOptionList = async () => {
    let data = await getData('/orders/getReadyOrders');
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_order+'">'+data[i].unit.customer.surname + ' ' + data[i].unit.customer.firstName + ' | ' + data[i].unit.car.model + ' | ' + data[i].unit.value + '</option>';
    }
    return str;
}

const showAddReleasePage = async () => {
    let employees = await getEmployeesOptionList();
    let orders = await getActiveOrdersOptionList();
    let container = document.getElementById("content");
    container.innerHTML = `
    <table id="registerTable">
    <form>
    <tr>
    <td><label for="employees">Pracownik:</label></td>
    <td><select class="form-control" id="employees" name="employees">`+employees+`</select></td>
    </tr>
    <tr>
    <td><label for="order">Zamówienie</label></td>
    <td><select class="form-control" id="order" name="order">`+orders+`</select></td>
    </tr>
    <tr>
    <td><label for="date">Data</label></td>
    <td><input class="form-control" type="date" id="date" name="date" value="2021-01-01"></td>
    </tr>
    <tr>
    <td><label for="time">Godzina</label></td>
    <td><select class="form-control" id="time" name="time">
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
    </select></td>
    </tr>
    </form>
    <tr>
    <td colspan="2" style="text-align: center;"><button id="addRelease">Dodaj</button></td>
    </tr>
    </table>
    `;

    let addReleaseBtn = document.getElementById("addRelease");
    addReleaseBtn.addEventListener("click", addRelease);
}

const addRelease = () => {
    let date = document.getElementById("date").value +'T'+ document.getElementById("time").value;
    let data = {
        "id_order": document.getElementById("order").value,
        "id_employee": document.getElementById("employees").value,
        "date": date
    }
    console.log(data);
    postData('/release-room/add', data).then(response => {
        if(response.ok){
            alert("Dodano");
            showReleaseRoomPage();
        }
        else{
            alert("Wystąpił problem - podany pracownik o tej porze jest zajęty");
        }
    })

}

function timeConverter(timestamp){
    let date = timestamp.split('T')[0];
    let time = timestamp.split('T')[1];
    let splitTime = time.split(':');
    let splitDate = date.split('-');
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = splitDate[0];
    let month = months[splitDate[1]-1];
    let day = splitDate[2];
    let hour = splitTime[0];
    let min = splitTime[1];

    let convertedDate = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return convertedDate;
}