// Default currency and rates
let currentCurrency = "naira";
const currencyRates = {
  naira: 1,
  dollar: 0.0022, // Example rate for Dollar
  euro: 0.0020,   // Example rate for Euro
};

// Financial data
let data = {
  income: [],
  expenses: [],
  assets: [],
  liabilities: []
};

// Update financial summary
function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;
  let totalAssets = 0;
  let totalLiabilities = 0;

  // Calculate totals
  data.income.forEach(entry => totalIncome += entry.amount);
  data.expenses.forEach(entry => totalExpenses += entry.amount);
  data.assets.forEach(entry => totalAssets += entry.amount);
  data.liabilities.forEach(entry => totalLiabilities += entry.amount);

  // Update displayed totals
  const totalIncomeElement = document.getElementById("totalIncome");
  const totalExpensesElement = document.getElementById("totalExpenses");
  const totalAssetsElement = document.getElementById("totalAssets");
  const totalLiabilitiesElement = document.getElementById("totalLiabilities");
  const netWorthElement = document.getElementById("netWorth");

  totalIncomeElement.textContent = formatCurrency(totalIncome);
  totalExpensesElement.textContent = formatCurrency(totalExpenses);
  totalAssetsElement.textContent = formatCurrency(totalAssets);
  totalLiabilitiesElement.textContent = formatCurrency(totalLiabilities);
  netWorthElement.textContent = formatCurrency(totalIncome - totalExpenses + totalAssets - totalLiabilities);
}

// Format currency based on selected currency
function formatCurrency(amount) {
  switch (currentCurrency) {
    case "naira":
      return `₦${amount.toFixed(2)}`;
    case "dollar":
      return `$${(amount * currencyRates.dollar).toFixed(2)}`;
    case "euro":
      return `€${(amount * currencyRates.euro).toFixed(2)}`;
    default:
      return `₦${amount.toFixed(2)}`;
  }
}

// Update the currency on change
function updateCurrency() {
  const currencySelect = document.getElementById("currencySelect");
  currentCurrency = currencySelect.value;
  updateSummary();
}

// Add entry to appropriate data type (Income, Expense, Asset, Liability)
function addEntry(event, type) {
  event.preventDefault();

  const descriptionInput = document.getElementById(`${type}Desc`);
  const amountInput = document.getElementById(`${type}Amount`);

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    const entry = { description, amount };

    // Add entry to correct data array
    data[type].push(entry);

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";

    // Update financial summary
    updateSummary();

    // Display entries
    displayEntries();
  }
}

// Delete entry
function deleteEntry(type, index) {
  // Remove entry from the appropriate data array
  data[type].splice(index, 1);

  // Update financial summary
  updateSummary();

  // Display entries
  displayEntries();
}

// Display entries dynamically
function displayEntries() {
  const entriesContainer = document.getElementById("entriesContainer");
  entriesContainer.innerHTML = "";

  ["income", "expenses", "assets", "liabilities"].forEach(type => {
    const typeContainer = document.createElement("div");
    typeContainer.classList.add("entryTypeContainer");
    const typeHeader = document.createElement("h4");
    typeHeader.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeContainer.appendChild(typeHeader);

    const list = document.createElement("ul");

    data[type].forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${entry.description}: ${formatCurrency(entry.amount)} <button onclick="deleteEntry('${type}', ${index})">Delete</button>`;
      list.appendChild(listItem);
    });

    typeContainer.appendChild(list);
    entriesContainer.appendChild(typeContainer);
  });
}

// Logout Function
function logout() {
  // Here you could add actual logout functionality if needed, e.g., clearing session or redirecting
  alert("Logged out successfully!");
  // For now, just reload the page
  window.location.reload();
}

// Initial setup
window.onload = function() {
  updateSummary();
  displayEntries();
};
