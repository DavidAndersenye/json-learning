document.addEventListener("DOMContentLoaded", function() {
    const displayDataBtn = document.getElementById('displayDataBtn');

    displayDataBtn.addEventListener('click', function() {
        fetch('minDatabase.json') // Replace 'path_to_your_json_file.json' with the actual path to your JSON file
            .then(response => response.json())
            .then(data => {
                const jsonDataContainer = document.getElementById('jsonData');
                jsonDataContainer.innerHTML = ''; // Clear previous data

                if (data && Array.isArray(data.users) && Array.isArray(data.companies)) {
                    // Displaying users
                    const usersDiv = document.createElement('div');
                    usersDiv.innerHTML = '<h2>Users</h2>';
                    data.users.forEach(user => {
                        const userPara = document.createElement('p');
                        userPara.textContent = `Name: ${user.firstName} ${user.lastName}, Email: ${user.email}, Age: ${user.age}, Company: ${getCompanyName(data.companies, user.companyId)}`;
                        usersDiv.appendChild(userPara);
                    });
                    jsonDataContainer.appendChild(usersDiv);

                    // Displaying companies
                    const companiesDiv = document.createElement('div');
                    companiesDiv.innerHTML = '<h2>Companies</h2>';
                    data.companies.forEach(company => {
                        const companyPara = document.createElement('p');
                        companyPara.textContent = `Name: ${company.name}, Description: ${company.description}`;
                        companiesDiv.appendChild(companyPara);
                    });
                    jsonDataContainer.appendChild(companiesDiv);
                } else {
                    jsonDataContainer.textContent = 'Data format is incorrect or empty.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

    // Function to get company name by ID
    function getCompanyName(companies, companyId) {
        const company = companies.find(company => company.id === companyId);
        return company ? company.name : 'Company not found';
    }
});
