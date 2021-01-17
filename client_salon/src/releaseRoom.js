const showReleaseRoomPage = () => {
    let container = document.getElementById("content");
    let releases = [];
    getData('/release-room/getAll').then(data => {
        for(let i=0; i<data.length;i++){
            releases.push(data[i]);
        }
        let str = '';
        if(releases.length!==0){
            str += '<label for="showFromToday">Pokaż od dzisiaj</label><input type="checkbox" id="showFromToday" name="showFromToday">';
            str += '<table>';
            for(let i=0; i<releases.length; i++){
                str += '<tr><td>'+releases[i].surname+'</td>';
                str += '<td>'+releases[i].name+'</td>';
                str += '<td>'+releases[i].id_order+'</td>';
                str += '<td>'+releases[i].date+'</td>';
                str += '</tr>';
            }
        }
        container.innerHTML = str;
    });
}

const getActiveOrdersOptionList = async () => {
    let data = await getData('/orders/getActiveOrders');
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
    <form>
    <label for="employees">Pracownik:</label>
    <select id="employees" name="employees">`+employees+`</select></br>
    <label for="order">Zamówienie</label>
    <select id="order" name="order">`+orders+`</select></br>
    <label for="date">Data</label>
    <input type="datetime-local" id="date" name="date" value="2021-01-01T11:11">
    </form>
    <button id="addRelease">Dodaj</button>
    `;

    let addReleaseBtn = document.getElementById("addRelease");
    addReleaseBtn.addEventListener("click", addRelease);
}

const addRelease = () => {
    let data = {
        "id_order": document.getElementById("order").value,
        "id_employee": document.getElementById("employees").value,
        "date": document.getElementById("date").value
    }
    console.log(data);
    postData('/release-room/add', data).then(response => {
        if(response.ok){
            alert("Dodano");
            showReleaseRoomPage();
        }
        else{
            alert("Wystąpił problem");
        }
    })

}