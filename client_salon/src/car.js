const showAvailableCarsList = () => {
    let container = document.getElementById("content");
    let cars = [];
    getData("/cars/getAll").then(data => {

        for(let i=0;i<data.length;i++){
            cars.push(data[i]);
        }

        let str = '';
        if (cars.length!=0){
            str += '<table>';
            let role = sessionStorage.getItem("role");
            str += '<tr><td>Model</td><td>Wersja wyposażenia</td><td>Rok modelowy</td><td>Cena bazowa</td><td>Status</td></tr>';
            for(let i=0; i<cars.length; i++){
                let status, btnText;
                if(cars[i].active==1){
                    status = 'aktywny';
                    btnText = 'deaktywuj';
                }
                else{
                    status = 'nieaktywny';
                    btnText = 'aktywuj';
                }
                str += '<tr>';
                str += '<td>' + cars[i].model + '</td>';
                str += '<td>' + cars[i].version + '</td>';
                str += '<td>' + cars[i].engine + '</td>';
                str += '<td>' + cars[i].year + '</td>';
                str += '<td>' + cars[i].value + '</td>';
                str += '<td>' + status + '</td>';
                if(role==='ROLE_MANAGER'){
                    str += '<td><button onclick="deleteCar('+cars[i].id_car+')">Usuń</button></td><td><button onclick="activateCar('+cars[i].id_car+','+cars[i].active+')">'+btnText+'</button></td>';
                }
                str += '</tr>'
            }
            str += '</table>';
        }
        container.innerHTML = str;
    });
}

const showAddCarPage = async () => {
    let container = document.getElementById("content");
    let models = await getModelsOptionList();
    let versions = await getActiveVersionsOptionsList();
    let engines = await getEnginesOptionsList();
    container.innerHTML = `
        <label for="model">Model</label>
        <select id="model" name="model">`+ models +`</select></br>
        <label for="version">Wersja wyposazenia</label>
        <select id="version" name="version">`+ versions +`</select></br>
        <label for="engine">Silnik</label>
        <select id="engine" name="engine">`+ engines +`</select></br>
        <label for="year">Rok modelowy</label>
        <input id="year" name="year" type="number" value="2021" size="4"/></br>
        <button id="addNewCarBtn">Dodaj</button>
    `;

    let addBtn = document.getElementById("addNewCarBtn");
    addBtn.addEventListener("click", addNewCar);
}

const addNewCar = () => {
    let data = {
        "id_engine": document.getElementById("engine").value,
        "id_version": document.getElementById("version").value,
        "id_model": document.getElementById("model").value,
        "year": document.getElementById("year").value
    }
    postData("/cars/add", data).then(response => {
        if(response.ok){
            alert("Dodano pojazd!");
            showAvailableCarsList();
        }
        else{
            alert("Wystąpił problem z dodaniem pojazdu");
        }
    })
}

const getEnginesList = async () => {
    let data= await getData("/engines/getAll");
    return data;
}

const getEnginesOptionsList = async () => {
    let data = await getEnginesList();
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_silnik+'">'+data[i].nazwa+'</option>';
    }
    return str;
}

const getModelsList = async () => {
    let data = await getData("/models/getAll");
    return data;
};

const getModelsOptionList = async () => {
    let data = await getModelsList();
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_modelu+'">'+data[i].nazwa+'</option>';
    }
    return str;
}

const getActiveVersions = async () => {
    let data = await getData("/equipment/getActiveVersions");
    return data;
}

const getActiveVersionsOptionsList = async () => {
    let data = await getActiveVersions();
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_wersje_wyposazenia+'">'+data[i].nazwa+'</option>';
    }
    return str;
}


const getActiveCarList = async () => {
    let data = await getData('/cars/getActive');
    return data;
}

const getCarOptionList = async () => {
    let data = await getActiveCarList();
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_car+'">'+data[i].model+' | '+data[i].version+' | ' +data[i].engine+'</option>';
    }
    return str;
}

const getColorList = async () => {
    let data = await getData('/cars/getColors');
    return data;
}

const getColorOptionList = async () => {
    let data = await getColorList();
    let str = '';
    for(let i=0; i<data.length; i++){
        str += '<option value="'+data[i].id_color+'">'+data[i].name+' | '+data[i].type+' | ' +data[i].value+'zł</option>';
    }
    return str;
}

const activateCar = (id, state) => {
    if(state=='1'){
        state='0';
    }
    else{
        state='1';
    }

    let data = {
        "id_car": id,
        "state": state
    }
    postData("/cars/activate", data).then(response => {
        if (response.ok){
            alert("Zmieniono status");
            showAvailableCarsList();
        }
        else{
            alert("Wsystąpił problem ze zmianą statusu.");
        }
    });
}

const deleteCar = (id) => {

    let data = {
        "id_car": id
    }
    postData("/cars/delete", data).then(response => {
        if (response.ok){
            alert("Usunięto pojazd");
            showAvailableCarsList();
        }
        else{
            alert("Nie można usuwać pojazdów, które są egzemplarze zostały utworzone. Sprobuj deaktywować pojazd.");
        }
    });
}

const showCarsFullInfoList = () => {
    let container = document.getElementById("content");
    let cars = [];
    getData("/cars/getFullInfo").then(data => {
        for(let i=0;i<data.length;i++){
            cars.push(data[i]);
        }
        let str = '';
        if (cars.length!=0){
            str += '<table class="infoTable">';
            str += '<tr><td>Model</td><td>Rodzaj nadwozia</td><td>Wersja wyposażenia</td><td>Silnik</td><td>Rok modelowy</td><td>Cena bazowa</td></tr>';
            for(let i=0; i<cars.length; i++){
                str += '<tr class="visibleRow" onclick="toggleRow('+cars[i].id_car+');">';
                str += '<td>' + cars[i].model.name + '</td>';
                str += '<td>' + cars[i].model.chassis + '</td>';
                str += '<td>' + cars[i].version + '</td>';
                str += '<td>' + cars[i].engine.name + '</td>';
                str += '<td>' + cars[i].year + '</td>';
                str += '<td>' + cars[i].value + '</td>';
                str += '</tr>'
                str += '<tr class="hiddenRow" id="'+cars[i].id_car+'" style="display: none;">';
                str += '<td colspan="6"><table>';
                str += '<tr>';
                str += '<td>Opis:</td>'
                str += '<td>' + cars[i].model.description + '</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>Wymiary (dł x szer x wys) [mm]:</td>'
                str += '<td>' + cars[i].model.length + 'x' + cars[i].model.width + 'x' + cars[i].model.height + '</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>Pojemność bagażnika [l]:</td>'
                str += '<td>' + cars[i].model.boot_size + '</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>Moc:</td>'
                str += '<td>' + cars[i].engine.power + '</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>Pojemność skokowa:</td>'
                str += '<td>' + cars[i].engine.displacement + '</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>Rodzaj paliwa:</td>'
                str += '<td>' + cars[i].engine.fuel + '</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>Liczba cylindrów:</td>'
                str += '<td>' + cars[i].engine.cylinders + '</td>';
                str += '</tr>';
                str += '</table></td>';
                str += '</tr>';
            }
            str += '</table>';
        }
        container.innerHTML = str;
    });
}

const toggleRow = (id) => {

    if (document.getElementById(id).style.display==='none') {
        document.getElementById(id).style.display = 'table-row';
    }
    else {
        document.getElementById(id).style.display='none';
    }
}

const showVersionsPage = () => {
    let container = document.getElementById("content");
    let versions = [];
    getData("/equipment/getActiveVersions").then(data => {
        for(let i=0;i<data.length;i++){
            versions.push(data[i]);
        }
        let str = '';
        if (versions.length!=0){
            str += '<table class="infoTable">';
            str += '<tr><td>Nazwa wersji</td><td>Cena</td></tr>';
            for(let i=0; i<versions.length; i++){
                str += '<tr class="visibleRow" onclick="toggleRow('+versions[i].id_version+');">';
                str += '<td>' + versions[i].name + '</td>';
                str += '<td>' + versions[i].value + '</td>';
                str += '</tr>';
                str += '<tr class="hiddenRow" id="' + versions[i].id_version + '" style="display: none;">';
                str += '<td colspan="2"><table>';
                str += '<tr>';
                str += '<td>Nazwa:</td>';
                str += '<td>Opis:</td>'
                str += '</tr>'
                for(let j=0; j<versions[i].equipmentList.length; j++) {
                    str += '<tr>';
                    str += '<td>' + versions[i].equipmentList[j].name + '</td>';
                    str += '<td>' + versions[i].equipmentList[j].description + '</td>';
                    str += '</tr>';
                }
                str += '</table></td>';
                str += '</tr>';
            }
            str += '</table>';
        }
        container.innerHTML = str;
    });
}

