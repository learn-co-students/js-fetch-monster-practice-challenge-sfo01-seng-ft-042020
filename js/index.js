const ROOT_URL = 'http://localhost:3000';
let currentPage = 1;



const fetchMonsters = a => {
  fetch(`${ROOT_URL}/monsters/?_limit=50&_page=${a}`)
  .then(res => res.json())
  .then(obj => renderMonsters(obj))
  .catch(err => {
    console.log(err);
    return alert(err);
  })
}

function addNavigationListeners() {
  console.log("LISTENING")
  let b = document.querySelector('#back')
  let f = document.querySelector('#forward');
  console.log(f)
  b.addEventListener('click', () => { 
    return pageBack()
  }), f.addEventListener('click', () => {
    return pageForward()
  })
}

const pageForward = () => {
  let container = document.getElementById('monster-container')
  currentPage += 1;
  container.innerHTML = "";
  document.getElementById('back').disabled = false;
  fetchMonsters(currentPage);

}

const pageBack = () => {
  1 < currentPage ? (currentPage--, fetchMonsters(currentPage)) : alert('Aint no monsters here')
}
 

function listenForSubmit() {
  document.querySelector('#create-monster').addEventListener('submit', e => {
    e.preventDefault();
    createMonster(getFormData())
    clearForm();
  })
}

const getFormData = () => {
  let name = document.getElementById('monster-name').value,
    age = document.getElementById('monster-age').value,
    description = document.getElementById('monster-description').value;
  return {
    name,
    age,
    description
  }
}

function createMonster(monster) {
  console.log(monster)
  fetch(`${ROOT_URL}/monsters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(monster)
  }).then(res => res.json())
  .then(() => fetchMonsters(currentPage))
}

const clearForm = () => {
  document.querySelector('#monster-form').reset()
}
function renderMonsters(monsters) {
  
  const container = document.getElementById('monster-container');
  container.innerHTML = ""
  monsters.forEach(monster => {
    createMonsterCard(monster)
  })
}

const createMonsterCard = (monster) => {
  const container = document.getElementById('monster-container');
  const card = document.createElement('div')
  card.className = "card"
  const name = document.createElement('div')
  name.className = 'card-header';
  name.innerText = monster.name
  card.appendChild(name)

  const cardBody = document.createElement('div')
  cardBody.className = "card-body"
  card.appendChild(cardBody)

  const age = document.createElement('h4');
  age.innerText = monster.age
  cardBody.appendChild(age)

  const description = document.createElement('p');
  description.innerText = monster.description
  cardBody.appendChild(description)

  
  container.appendChild(card)

}

const init = () => {
  fetchMonsters();
  listenForSubmit();
  addNavigationListeners();
}

document.addEventListener('DOMContentLoaded', init)