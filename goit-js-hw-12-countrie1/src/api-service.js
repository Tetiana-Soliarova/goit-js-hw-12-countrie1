function fetchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => {
            if (response.status === 404) {
                alert('Извените, по Вашему запросу ничего нету')

            };
            return response.json();
        });
}

export default { fetchCountries };