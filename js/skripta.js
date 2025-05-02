function showPage(pageId) {
  let pages = document.querySelectorAll('.page');
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.add('hidden');
  }
  document.getElementById(pageId).classList.remove('hidden');
}


function loadajSuspecta() {
  let data = localStorage.getItem('suspects');
  if (data) {
    return JSON.parse(data);
  } 
  else {
    return [];
  }
}


function saveajSuspecta(suspects) {
  localStorage.setItem('suspects', JSON.stringify(suspects));
}


function displayajSuspecta() {
  let list = document.getElementById('suspectList');
  list.innerHTML = '';
  let suspects = loadajSuspecta();
  for (let i = 0; i < suspects.length; i++) {
    let s = suspects[i];
    let div = document.createElement('div');
    div.className = 'suspect-card';
    div.innerHTML = `
      <p><strong>${s.firstName} ${s.lastName}</strong></p>
      <p>DoB: ${s.dob}</p>
      <p>Phone: ${s.phone}</p>
      <p>Country: ${s.country}</p>
      <p>Gender: ${s.gender}</p>
      <button onclick="editSuspect(${i})">Edit</button>
      <button onclick="deletajSuspecta(${i})">Delete</button>
    `;
    list.appendChild(div);
  }
}


let form = document.getElementById('suspectForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  let suspect = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    height: document.getElementById('height').value,
    weight: document.getElementById('weight').value,
    phone: document.getElementById('phone').value,
    dob: document.getElementById('dob').value,
    address: document.getElementById('address').value,
    country: document.getElementById('country').value,
    race: document.getElementById('race').value,
    gender: document.getElementById('gender').value,
    social: document.getElementById('social').value,
    notes: document.getElementById('notes').value
  };

  let suspects = loadajSuspecta();
  suspects.push(suspect);
  saveajSuspecta(suspects);
  form.reset();
  showPage('database');
  displayajSuspecta();
});


function deletajSuspecta(index) {
  let suspects = loadajSuspecta();
  suspects.splice(index, 1);
  saveajSuspecta(suspects);
  displayajSuspecta();
}


function editSuspect(index) {
  let suspects = loadajSuspecta();
  let s = suspects[index];
  showPage('report');

  document.getElementById('firstName').value = s.firstName;
  document.getElementById('lastName').value = s.lastName;
  document.getElementById('height').value = s.height;
  document.getElementById('weight').value = s.weight;
  document.getElementById('phone').value = s.phone;
  document.getElementById('dob').value = s.dob;
  document.getElementById('address').value = s.address;
  document.getElementById('country').value = s.country;
  document.getElementById('race').value = s.race;
  document.getElementById('gender').value = s.gender;
  document.getElementById('social').value = s.social;
  document.getElementById('notes').value = s.notes;

  suspects.splice(index, 1);
  saveajSuspecta(suspects);
}


let searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function () {
  let value = searchBar.value.toLowerCase();
  let cards = document.querySelectorAll('.suspect-card');
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].innerText.toLowerCase().includes(value)) {
      cards[i].style.display = 'block';
    } 
    else {
      cards[i].style.display = 'none';
    }
  }
});

window.onload = function () {
  displayajSuspecta();
  showPage('home');
};

