console.log('Getting started');

const button = document.querySelector('#searchButton'); 
button.addEventListener('click', () => {
    const input = document.querySelector('#searchInput');
    const countryUrl = `https://restcountries.com/v3.1/name/${input.value}?fullText=true`;
    console.log(input.value);
    console.log(countryUrl);
    fetch(countryUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Country not found');
        }
        return response.json();
    })
        .then(data => {
            console.log(data);
            const country = data[0];
            if (country) {
                const countryName = country.name?.common || 'Unknown';
                const countryCapital = country.capital?.[0] || 'Unknown';
                const countryPopulation = country.population ? formatPopulation(country.population) : 'Unknown';
                const countryFlag = country.flags?.png || '';
                const countryCurrency = country.currencies ? Object.values(country.currencies)[0]?.name : 'Unknown';
                const countryLanguage = country.languages ? Object.values(country.languages).join(', ') : 'Unknown';
                const countryRegion = country.region || 'Unknown';
                const countrySubregion = country.subregion || 'Unknown';
                const countryInfo = document.querySelector('#countryInfo');
                const coatOfArmsUrl = country.coatOfArms?.png || '';
                countryInfo.innerHTML = `
                    <h2>${countryName}</h2>
                    <img src="${countryFlag}" alt="${countryName}" width="200">
                    <p>Capital: ${countryCapital}</p>
                    <p>Population: ${countryPopulation}</p>
                    <p>Currency: ${countryCurrency}</p>
                    <p>Language: ${countryLanguage}</p>
                    <p>Region: ${countryRegion}</p>
                    <p>Subregion: ${countrySubregion}</p>
                    <img src="${coatOfArmsUrl}" alt="${countryName} Coat of Arms" width="200">
                `;
            } else {
                console.error('Country data not found');
            }
            input.value = '';
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            alert('Error: Country not found or error fetching data');
        });        
        
});

function displayErrorMessage(message) {
    console.error('Error: ' + message);
    alert('Error: ' + message);
}




function formatPopulation(population) {
    return population.toLocaleString();
}
