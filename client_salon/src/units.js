const showUnitsList = () => {
    let container = document.getElementById("content2");
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

    let container3 = document.getElementById("content3");
    container3.innerHTML = `
    <button onclick="showAddCarPage();">Dodaj nowy samochod</button>
    `;
}