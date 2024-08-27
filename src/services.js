const apiUrl = "http://localhost:3000/monsterbash";

// READ METHOD: GET all monsters
async function getMonsters() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const monsters = await response.json();
        console.log("Monsters fetched from the API:", monsters);

        // Render all monsters initially
        renderMonsters(monsters);

        // Add event listener for the search bar
        const searchBar = document.getElementById('searchBar');
        searchBar.addEventListener('input', function(e) {
            const searchString = e.target.value.toLowerCase();

            const filteredMonsters = monsters.filter(monster =>
                monster.name.toLowerCase().includes(searchString)
            );

            renderMonsters(filteredMonsters);  // Render the filtered list
        });

    } catch (error) {
        console.error("Error fetching monsters:", error);
    }
}

// DELETE METHOD: DELETE a monster by ID
async function deleteMonster(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        });
        getMonsters(); // Refresh the list after deletion
    } catch (error) {
        console.error("Error deleting monster:", error);
    }
}

// CREATE METHOD: POST a new monster
async function createMonster() {
    try {
        // Fetch existing monsters to calculate the next ID as a string
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const monsters = await response.json();

        // Find the max ID in the current monsters list and convert to string
        const maxId = monsters.reduce((max, monster) => Math.max(max, parseInt(monster.id)), 0);

        // Create a new monster with the next ID as a string
        const newMonster = {
            id: (maxId + 1).toString(),  // Ensure ID is a string
            name: document.getElementById('name').value,
            origin_country: document.getElementById('origin_country').value,
            species: document.getElementById('species').value,
            weakness: document.getElementById('weakness').value,
            year_of_appearance: document.getElementById('year_of_appearance').value.toString()  // Ensure year is a string
        };

        await fetch(apiUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMonster)
        });

        resetForm(); // Clear the form
        getMonsters(); // Refresh the list after adding
    } catch (error) {
        console.error("Error creating monster:", error);
    }
}

//EDIT METHOD: Put a Modified Monster

async function updateMonster(id) {
    const updatedMonster = {
        id: id.toString(),  // Ensure ID is a string
        name: document.getElementById('name').value,
        origin_country: document.getElementById('origin_country').value,
        species: document.getElementById('species').value,
        weakness: document.getElementById('weakness').value,
        year_of_appearance: document.getElementById('year_of_appearance').value.toString()  // Ensure year is a string
    };

    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMonster)
        });

        resetForm(); // Reset the form after update
        getMonsters(); // Refresh the list after updating
    } catch (error) {
        console.error("Error updating monster:", error);
    }
}

// Function to render monsters on the page
function renderMonsters(monsters) {
    const monsterTbody = document.getElementById('monster-tbody');
    monsterTbody.innerHTML = '';
    monsters.forEach(monster => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${monster.id}</td>
            <td>${monster.name}</td>
            <td>${monster.origin_country}</td>
            <td>${monster.species}</td>
            <td>${monster.weakness}</td>
            <td>${monster.year_of_appearance}</td>
            <td>
                <button class="edit-button" onclick="loadMonsterData(${monster.id})">Edit</button>
                <button class="delete-button" onclick="deleteMonster(${monster.id})">Delete</button>
            </td>
        `;
        monsterTbody.appendChild(row);
    });
}

//Load data into editor
function loadMonsterData(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(monster => {
            document.getElementById('name').value = monster.name;
            document.getElementById('origin_country').value = monster.origin_country;
            document.getElementById('species').value = monster.species;
            document.getElementById('weakness').value = monster.weakness;
            document.getElementById('year_of_appearance').value = monster.year_of_appearance;

            const submitButton = document.getElementById('submit-button');
            submitButton.textContent = "Update Monster";
            submitButton.onclick = function () {
                updateMonster(id);
            };
        })
        .catch(error => console.error("Error loading monster data:", error));
}

// Function to reset the form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('origin_country').value = '';
    document.getElementById('species').value = '';
    document.getElementById('weakness').value = '';
    document.getElementById('year_of_appearance').value = '';

    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = "Add Monster";
    submitButton.onclick = createMonster;
}

// Initial call
getMonsters();