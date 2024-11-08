let xp = 0;
let health = 100;
let gold = 50;
let currentWeopon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStatus = document.querySelector("#monsterStatus");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const sceneImage = document.getElementById("sceneImage");
const monsterImage = document.getElementById("monsterImage");

const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];

const monster = [
    { name:'slime', level: 2, health: 15 },
    { name: 'fanged_beast', level: 8, health: 60},
    { name: 'dragon', level: 20, health: 300}
];

const goTown = () => {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

const goCave = () => {
    update(locations[2]);
}

const fightSlime = () => {
    fighting = 0;
    starFight();
}

const fightBeast = () => {
    fighting = 1;
    starFight();
}

const fightDragon = () => {
    fighting = 2;
    starFight();
}

const buyHealth = () => {
    if (gold >= 10) {
        gold -= 10;
        health +10; 
        updateStatus();
    } else {
        text.innerText = "Not enough gold to buy health."
    }
}

const buyWeapon = () => {
    if (currentWeopon < weapons.length -1 && gold >= 30) {
        gold -= 30;
        currentWeopon++;
        inventory.push(weapons[currentWeopon].name);
        text.innerText = "You now have a " + weapons[currentWeopon].name; 
        updateStatus();
    }
}

const attack = () => {
    health -= monster[fighting].level * 5;
    if (Math.random() > 0.5) {
        monsterHealth -= weapons[currentWeopon].power;
    } else {
        text.innerText = "You miss!"
    }
    updateStatus();
    checkEndCondition();
}

const dodge = () => {
    text.innerText = "You dodge the attack from " + monster[fighting].name;
}

const restart = () => {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeopon = 0;
    inventory = ["stick"];
    updateStatus();
    goTown();
}


const locations = [
    { name: 'town square',
      buttons: ['Go to store', 'Go to cave', 'Fight dragon'],
      functions: [goStore, goCave, fightDragon],
      text: "You are in the town square. You see a sign that says 'Store'.",
      image: "./images/town_square.jpg"
     },

     {
        name: 'store',
        buttons: ['Buy 10 Health (10 gold)', 'Buy Weapon (30 gold)', 'Go to town square'],
        functions: [buyHealth, buyWeapon, goTown],
        text: "You enter the store.",
        image: "./images/store.jpg"
     },

     {
        name: 'cave',
        buttons: ['Fight slime', 'Fight fanged beast', 'Go to town square'],
        functions: [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters.",
        image: "./images/cave.jpg"
     },

     {
        name: 'fight',
        buttons: ['Attack', 'Dodge', 'Run'],
        functions: [attack, dodge, goTown],
        text: "You are fighting a monster."
     },

     {
        name: 'kill monster',
        buttons: ['Go to town square', 'Go to town square', 'Go to town square'],
        functions: [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
     },

     {
        name: 'lose',
        buttons: ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        functions: [restart, restart, restart],
        text: "You died."
     },

     {
        name: 'win',
        buttons: ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        functions: [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
     }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const update = (location) => {
    monsterStatus.style.dispaly = "none";
    button1.innerText = location.buttons[0];
    button2.innerText = location.buttons[1];
    button3.innerText = location.buttons[2];
    button1.onclick = location.functions[0];
    button2.onclick = location.functions[1];
    button3.onclick = location.functions[2];
    text.innerHTML = location.text;

    if (location.name === "fight") {
        sceneImage.style.display = "none";
        monsterImage.style.display = "block";
        monsterImage.src = `./images/${monster[fighting].name}.jpg`;
    } else {
        sceneImage.style.display = "block";
        monsterImage.style.display = "none";
        if (location.image) {
            sceneImage.src = location.image;
        }
    }
}

const starFight = () => {
    update(locations[3]);
    monsterHealth = monster[fighting].health;
    monsterStatus.style.display = "block";
    monsterName.innerText = monster[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

const checkEndCondition = () => {
    if (health <= 0) {
        update(locations[5]);
    } else if (monsterHealth <= 0) {
        xp += monster[fighting].level;
        gold += monster[fighting].level * 5;
        update(locations[4]);
        updateStatus()
    }
}

const updateStatus = () => {
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
}