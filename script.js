let count = 0;
let charity = 0;
function incrementCounter() {
  count++;
  document.getElementById("counter").textContent = count;
  showFireworks();
}

function giveToCharity() { 
  charity += 20; 
  document.getElementById('charitySummariser').textContent = charity;
}

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

// NAVBAR Functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// add customer to table
function addCustomerToTable(name, kg, racket) {
  const tableBody = document
    .getElementById("customer-table")
    .querySelector("tbody");
  const row = document.createElement("tr"); // Create a new row element

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

function addCustomerToSidebar(name, kg, rackets) {
  const customersList = document.getElementById("customers-list");
  const customer = document.createElement("li");
  customer.textContent = `${name}: ${kg} kg Rackets: ${rackets}`;
  customer.onclick = selectCustomer;
  customersList.appendChild(customer);
}

// Existing addCustomer function modified:
function addCustomer(name, kg, rackets) {
  // Adding to local storage
  let customers = loadCustomers();
  customers.push({ name, kg, rackets });
  saveCustomers(customers);

  // Adding to sidebar and table
  addCustomerToSidebar(name, kg, rackets);
  addCustomerToTable(name, kg, rackets);
}

// New function to select a customer:
function selectCustomer(e) {
  const selected = document.querySelector("#customers-list .selected");
  if (selected) selected.classList.remove("selected");
  e.currentTarget.classList.add("selected");
}

function removeCustomer(index) {
  // Loading customers, removing a specific customer, and saving back to local storage
  let customers = loadCustomers();
  customers.splice(index, 1);
  saveCustomers(customers);

  // Remove customer from sidebar
  const sidebarList = document.getElementById("customers-list");
  sidebarList.children[index].remove();

  // Remove customer from table
  const tableBody = document
    .getElementById("customer-table")
    .querySelector("tbody");
  tableBody.children[index].remove();
}

// ... existing code ...

document
  .getElementById("customer-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("customer-name").value;
    const kg = document.getElementById("customer-kg").value;
    const rackets = document.getElementById("customer-rackets").value;
    addCustomer(name, kg, rackets); // Adding to sidebar
    e.target.reset(); // Clear the input fields
  });

// Function to save customers to local storage
function saveCustomers(customers) {
  localStorage.setItem("customers", JSON.stringify(customers));
}

// Function to load customers from local storage
function loadCustomers() {
  const customersJSON = localStorage.getItem("customers");
  return customersJSON ? JSON.parse(customersJSON) : [];
}

// Existing customers loaded from local storage
const customers = loadCustomers();

// Function to add a customer
function addCustomer(name, kg, rackets) {
  // Adding to local array
  customers.push({ name, kg, rackets });
  saveCustomers(customers); // Saving to local storage

  // Adding to sidebar and table
  addCustomerToSidebar(name, kg, rackets);
  addCustomerToTable(name, kg, rackets);
}

// Function to remove a customer
function removeCustomer(index) {
  // Removing from local array
  customers.splice(index, 1);
  saveCustomers(customers); // Saving to local storage

  // Remove customer from sidebar
  const sidebarList = document.getElementById("customers-list");
  sidebarList.children[index].remove();

  // Remove customer from table
  const tableBody = document
    .getElementById("customer-table")
    .querySelector("tbody");
  tableBody.children[index].remove();
}

// Load existing customers when the page loads
window.onload = function () {
  customers.forEach((customer) => {
    addCustomerToSidebar(customer.name, customer.kg, customer.rackets);
    addCustomerToTable(customer.name, customer.kg, customer.rackets);
  });
};
