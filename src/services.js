const apiUrl = "http://localhost:3000/monsterbash";

// READ METHOD: GET all monsters
async function getMonsters() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
        const monsters = await response.json();
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

    const newMonster = {
        name,
        origin_country,
        species,
        weakness
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

// Function to render monsters on the page
function renderMonsters(monsters) {
    const monsterList = document.getElementById('monster-list');
    monsterList.innerHTML = '';
    monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.className = 'monster';
        monsterDiv.innerHTML = `
            <strong>${monster.name}</strong><br>
            Species: ${monster.species}<br>
            Origin: ${monster.origin_country}<br>
            Weakness: ${monster.weakness}<br>
            <button onclick="deleteMonster(${monster.id})">Delete</button>
        `;
        monsterList.appendChild(monsterDiv);
    });
}

        // Initial call to load monsters
        getMonsters();