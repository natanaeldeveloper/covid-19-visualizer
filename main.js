
var selectElementPais = document.querySelector('#selectElementPais');
var btnElementBuscar = document.querySelector('#btnElementBuscar');
var tableRegioesElement = document.querySelector('#tableElementStates tbody');
var tableElementPais = document.querySelector('#tableElementPais');

btnElementBuscar.onclick = function () {
    searchPais(selectElementPais.value);
}

main();

function searchPais(pais) {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/' + pais)
        .then(function (response) {
            tableElementPais.setAttribute('style', 'opacity:1;');

            var pais = response.data.data;
            pais.updated_at = pais.updated_at.replace(/T/g, " ");
            var date = pais.updated_at.replace(/.000Z/g, "");
            var array = [
                pais.country,
                pais.cases,
                pais.confirmed,
                pais.deaths,
                pais.recovered,
                date
            ];
            var trElement = document.createElement('tr');
            for (data of array) {
                var celula = document.createElement('td');
                var textCelula = document.createTextNode(data);
                celula.setAttribute('class', 'text-uppercase');
                celula.appendChild(textCelula);
                trElement.appendChild(celula);
            }
            tableElementPais.appendChild(trElement);

        })
        .catch(function (error) {
            console.log(error);
        })
}

function main() {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
        .then(function (response) {
            for (regiao of response.data.data) {
                var trElement = document.createElement('tr');
                array = [
                    regiao.uf,
                    regiao.state,
                    regiao.cases,
                    regiao.deaths,
                ];
                for (data of array) {
                    if (data === array[0]) {
                        var celula = document.createElement('th');
                        var textCelula = document.createTextNode(' ' + data);
                        var icon = document.createElement('img');
                        icon.setAttribute('src', 'static/flags/' + data + '.png');
                        icon.setAttribute('width', '20px');
                        celula.appendChild(icon);
                    } else {
                        var celula = document.createElement('th');
                        var textCelula = document.createTextNode(data);
                        if (data === array[3]) {
                            celula.setAttribute('class', 'text-danger');
                        } else { }
                    }
                    celula.appendChild(textCelula);
                    trElement.appendChild(celula);

                }
                tableRegioesElement.appendChild(trElement);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/countries')
        .then(function (response) {
            for (pais of response.data.data) {
                optionElement = document.createElement('option');
                optionElement.setAttribute('value', pais.country);
                textElement = document.createTextNode(pais.country);
                optionElement.appendChild(textElement);
                selectElementPais.appendChild(optionElement);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
