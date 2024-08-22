const apiUrl = "http://localhost:3000/monsterbash";

// READ METHOD: GET all monsters and log to console
async function getMonsters() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        const monsters = await response.json();
        console.log("Monsters fetched from the API:", monsters);
        renderMonsters(monsters);
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
    const name = document.getElementById('name').value;
    const origin_country = document.getElementById('origin_country').value;
    const species = document.getElementById('species').value;
    const weakness = document.getElementById('weakness').value;
    const year_of_appearance = document.getElementById('year_of_appearance').value;

    const newMonster = {
        name,
        origin_country,
        species,
        weakness,
        year_of_appearance
    };

    try {
        await fetch(apiUrl, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMonster)
        });
        getMonsters(); // Refresh the list after adding a new monster
    } catch (error) {
        console.error("Error creating monster:", error);
    }
}

// Function to render monsters in a table
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
            <td><button class="delete-button" onclick="deleteMonster(${monster.id})">Delete</button></td>
        `;
        monsterTbody.appendChild(row);
    });
}

// Initial call to load monsters and log them in the console
getMonsters();