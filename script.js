// Global Variables
let count = 0;
let charity = 0;

// Counter and Charity Functions
//--------------------------------------------

/**
 * Increments the counter and updates the UI.
 */
function incrementCounter() {
  count++;
  document.getElementById("counter").textContent = count;
  showFireworks();
}

/**
 * Donates to charity and updates the UI.
 */
function giveToCharity() { 
  charity += 20;
  document.getElementById('charitySummariser').textContent = charity + ' kr';
}

/**
 * Displays fireworks in random positions within the container for a duration.
 */
function showFireworks() {
  const fireworks = document.querySelectorAll(".firework");
  const container = document.getElementById("button-container");

  fireworks.forEach((firework, index) => {
    firework.style.left = Math.random() * container.offsetWidth + "px";
    firework.style.top = Math.random() * container.offsetHeight + "px";
    firework.style.display = "block";
  });

  setTimeout(() => {
    fireworks.forEach((firework) => {
      firework.style.display = "none";
    });
  }, 1000);
}

// Navbar and Sidebar Functions
//--------------------------------------------

/**
 * Toggles the visibility of the sidebar.
 */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Customer Management Functions
//--------------------------------------------

/**
 * Adds customer details to a table.
 * @param {string} name - Customer's name.
 * @param {string|number} kg - Weight of the customer.
 * @param {string} racket - Racket details.
 */
function addCustomerToTable(name, kg, racket) {
  const tableBody = document.getElementById("customer-table").querySelector("tbody");
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;

  const kgCell = document.createElement("td");
  kgCell.textContent = kg;

  const racketCell = document.createElement("td");
  racketCell.textContent = racket;

  row.appendChild(nameCell);
  row.appendChild(kgCell);
  row.appendChild(racketCell);

  tableBody.appendChild(row);
}

/**
 * Adds customer details to the sidebar.
 * @param {string} name - Customer's name.
 * @param {string|number} kg - Weight of the customer.
 * @param {string} rackets - Racket details.
 */
function addCustomerToSidebar(name, kg, rackets) {
  const customersList = document.getElementById("customers-list");
  const customer = document.createElement("li");
  customer.textContent = `${name}: ${kg} kg Rackets: ${rackets}`;
  customer.onclick = selectCustomer;
  customersList.appendChild(customer);
}

/**
 * Adds a customer, saves them to local storage, and updates the UI.
 * @param {string} name - Customer's name.
 * @param {string|number} kg - Weight of the customer.
 * @param {string} rackets - Racket details.
 */
function addCustomer(name, kg, rackets) {
  let customers = loadCustomers();
  customers.push({ name, kg, rackets });
  saveCustomers(customers);
  addCustomerToSidebar(name, kg, rackets);
  addCustomerToTable(name, kg, rackets);
}

/**
 * Removes a customer from storage and updates the UI.
 * @param {number} index - Index of the customer to remove.
 */
function removeCustomer(index) {
  let customers = loadCustomers();
  customers.splice(index, 1);
  saveCustomers(customers);
  
  const sidebarList = document.getElementById("customers-list");
  sidebarList.children[index].remove();

  const tableBody = document.getElementById("customer-table").querySelector("tbody");
  tableBody.children[index].remove();
}

/**
 * Highlights a customer when clicked.
 * @param {Event} e - The click event.
 */
function selectCustomer(e) {
  const selected = document.querySelector("#customers-list .selected");
  if (selected) selected.classList.remove("selected");
  e.currentTarget.classList.add("selected");
}

/**
 * Saves an array of customers to local storage.
 * @param {Array} customers - List of customers to save.
 */
function saveCustomers(customers) {
  localStorage.setItem("customers", JSON.stringify(customers));
}

/**
 * Loads and returns an array of customers from local storage.
 * @returns {Array} List of customers.
 */
function loadCustomers() {
  const customersJSON = localStorage.getItem("customers");
  return customersJSON ? JSON.parse(customersJSON) : [];
}

// Initialization and Event Listeners
//--------------------------------------------

window.onload = function () {
  const customers = loadCustomers();
  customers.forEach((customer) => {
    addCustomerToSidebar(customer.name, customer.kg, customer.rackets);
    addCustomerToTable(customer.name, customer.kg, customer.rackets);
  });
};

document.getElementById("customer-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("customer-name").value;
  const kg = document.getElementById("customer-kg").value;
  const rackets = document.getElementById("customer-rackets").value;
  addCustomer(name, kg, rackets);
  e.target.reset();
});

document.getElementById('search-input').addEventListener('keyup', function() {
  let query = this.value.toLowerCase();
  
  if(query === '') {
      displayAllRows();
      return;
  }

  let allRows = document.querySelectorAll('#customer-table tbody tr');
  let results = [];

  allRows.forEach(function(row) {
      let nameCell = row.querySelector('td:first-child');
      let nameText = nameCell.textContent;

      if (nameText.toLowerCase().includes(query)) {
          let highlightedText = nameText.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>');
          nameCell.innerHTML = highlightedText;
          results.push(row);
      } else {
          nameCell.innerHTML = nameText;
      }
  });

  displayResults(results, query);
});

function displayResults(results, query) {
  let tableBody = document.getElementById("customer-table").querySelector("tbody");
  while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
  results.forEach(row => tableBody.appendChild(row));
}

function displayAllRows() {
  let tableBody = document.getElementById("customer-table").querySelector("tbody");
  while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
  
  const customers = loadCustomers();
  customers.forEach((customer) => addCustomerToTable(customer.name, customer.kg, customer.rackets));
}
