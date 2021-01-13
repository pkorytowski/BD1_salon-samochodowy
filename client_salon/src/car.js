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

                str += '<tr><td>' + cars[i].model + '</td>' + '<td>' + cars[i].version + '</td>' + '<td>';
                str += cars[i].year + '</td>' + '<td>' + cars[i].value + '</td><td>' + status;
                str += '</td><td><button onclick="deleteCar('+cars[i].id_car+')">Usuń</button></td><td><button onclick="activateCar('+cars[i].id_car+','+cars[i].active+')">'+btnText+'</button></td></tr>';
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
            showCarsList();
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
            showCarsList();
        }
        else{
            alert("Nie można usuwać pojazdów, które są egzemplarze zostały utworzone. Sprobuj deaktywować pojazd.");
        }
    });
}

