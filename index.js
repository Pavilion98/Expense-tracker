const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");


//Access Browser's local Storage
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];



//Add a new transaction
function addTransaction(e) {
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === "") {
        text.placeholder = "please add a text";
        text.style.backgroundColor = "#ccc";
        amount.placeholder = "please add amount";
        amount.style.backgroundColor = "#ccc";
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDom(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}


//Generate a Random Id
const generateId = () => {
    return Math.floor(Math.random() * 100000000);
}



//Add transaction to DOM list
const addTransactionDom = (transaction) => {
    const sign = transaction.amount < 0 ? "-" : "+";
    const newItem = document.createElement("li");

    //add class for new item based on its value
    newItem.classList.add(transaction.amount < 0 ? "minus" : "plus");
    newItem.innerHTML = 
    `${transaction.text}<span>${sign} $${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" onclick="removeTransation(${transaction.id})">x</button>`;
    list.appendChild(newItem);
}



//Update the balance
const updateValues = () => {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce( (acc, item) => ( acc += item), 0).toFixed(2);

    const income = amounts
    .filter((item) => item > 0)
    .reduce( (acc, item ) => (acc += item), 0)
    .toFixed(2);

    const expense = (amounts.filter( (item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}



//Update Local storage
const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}



//Delete a transaction
const removeTransation = (id) => {
    transactions = transactions.filter( (transaction) => transaction.id !== id);
    updateLocalStorage();
    init();
}

const init = () => {
    list.innerHTML = "";
    transactions.forEach(addTransactionDom);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);

