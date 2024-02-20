//Class
class Budget {
  constructor(budget) {
    this.totalBudget = budget;
    this.budget = budget;
  }

  leftBudget(amount) {
    if (this.budget <= 0 || amount > this.budget) {
      html.printMassage("you dont have budget! ", "danger");
      return this.budget;
    } else {
      html.printMassage("your price successful save", "green");
      html.showExpense(expens, amount);
      return (this.budget -= amount);
    }
  }

  addBudget(price) {
    return (this.budget += price);
  }
}

class HtmlUi {
  //show budget wich user enter
  showBudget(budget) {
    totalBudget.innerHTML = budget;
    amountLeft.innerHTML = budget;
  }

  //every massage
  printMassage(massage, color) {
    div.className = color;
    div.innerHTML = massage;
    const col = document.getElementById("col");
    col.insertBefore(div, addExpensForm);
    //remove massage after 3s
    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  //show all expense
  showExpense(expense, amount) {
    const li = document.createElement("li");
    li.id = "expense";
    //
    li.innerHTML = `
        ${expense}
        <span id="price">
          ${amount}
        </span>
      `;
    ul.appendChild(li);
  }

  //track budget
  trackBudget(amount) {
    let leftBudget = budget.leftBudget(amount);
    html.changeColor(budget.totalBudget, leftBudget);
    amountLeft.innerHTML = leftBudget;
  }

  addingBudget() {
    const allExpenses = document.querySelectorAll("#price");
    const lastExpenses = allExpenses[allExpenses.length - 1];
    let addBudget = budget.addBudget(Number(lastExpenses.textContent));
    amountLeft.innerHTML = addBudget;
    html.changeColor(budget.totalBudget, addBudget);
    html.printMassage("back successful save", "green");
    html.removeExpense();
  }

  removeExpense() {
    ul.removeChild(ul.lastElementChild);
  }

  //change color after use
  changeColor(totalBudget, leftBudget) {
    if (totalBudget / 4 >= leftBudget) {
      amountLeft.parentElement.style.backgroundColor = "rgb(223, 198, 203)";
      amountLeft.parentElement.style.color = " rgb(115, 24, 24)";
    } else if (totalBudget / 2 >= leftBudget) {
      amountLeft.parentElement.style.backgroundColor = "rgb(255, 255, 153)";
      amountLeft.parentElement.style.color = "rgb(107, 102, 31)";
    } else {
      amountLeft.parentElement.style.backgroundColor = "rgb(195, 230, 203)";
      amountLeft.parentElement.style.color = "rgb(21, 87, 36)";
    }
  }

  //delete All expenses
  deleteExpenses() {}
}

//Variable
const html = new HtmlUi(),
  pater = /^[0-9\W]+$/,
  div = document.createElement("div"),
  totalBudget = document.getElementById("total"),
  amountLeft = document.getElementById("left"),
  addExpensForm = document.querySelector(".add-expens"),
  ul = document.getElementById("list-group");

let expens = "",
  amount = "",
  budget;

//eventListener
eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", () => {
    const money = Number(prompt("Please enter your budget"));
    if (pater.test(money) == false || money == 0 || money == null) {
      location.reload();
    } else {
      budget = new Budget(money);
      html.showBudget(budget.budget);
    }
  });

  //function for submited Form
  addExpensForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //access to the value
    expens = document.querySelector("#expens").value;
    amount = Number(document.querySelector("#amount").value);
    //validate Form
    if (expens !== "" && amount !== 0) {
      if (pater.test(amount)) {
        html.trackBudget(amount);
      } else {
        html.printMassage(`please write number! `, "danger");
      }
    } else {
      html.printMassage("please complete every filed ", "danger");
    }
  });

  //
  document.getElementById("btnDelete").addEventListener("click", () => {
    if (document.querySelectorAll("#expense").length == 0) {
      html.printMassage("you dont have any expenses", "danger");
    } else {
      html.addingBudget(ul.lastElementChild);
    }
  });
}
