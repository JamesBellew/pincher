import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Income from "./components/Income.comp";
import Expenses from "./components/expenses.comp";
import Graph from "./components/Graph.comp";

function App() {
  //Income Arrays
  const [income, setIncome] = useState([
    {
      id: 0,
      name: "Bank Account (Current Account)",
      amount: 2500,
      color: "#3ab7bf",
      icon: "coffee",
      date: "01/05/2024",
    },
    {
      id: 1,
      name: "Trading 212 (Stocks)",
      amount: 2500,
      color: "#8182ff",
      icon: "computer",
      date: "15/05/2024",
    },
    {
      id: 2,
      name: "Credit Union (Main Account)",
      amount: 3500,
      color: "#3ab7bf",
      icon: "coffee",
      date: "20/05/2024",
    },
  ]);
  const [incomeHistory, setIncomeHistory] = useState([
    {
      id: 0,
      incomeName: "Bank Account (Current)",
      date: "12/05/2024",
      figureChange: 500,
    },
    {
      id: 1,
      incomeName: "Bank Account (Current)",
      date: "25/05/2024",
      figureChange: -50,
    },
  ]);
  //test
  const [monthlyIncomeHistory, setMonthlyIncomeHistory] = useState([
    {
      id: 0,
      month: "January",
      amount: 500,
    },
    {
      id: 1,
      month: "February",
      amount: 1500,
    },
    {
      id: 2,
      month: "March",
      amount: 3500,
    },
    {
      id: 3,
      month: "April",
      amount: 8500,
    },
  ]);
  //expenses Arrays
  const [expenses, setExpenses] = useState([
    {
      id: 0,
      name: "Car Loan",
      amount: 450,
      category: "Loans",
      color: "#3ab7bf",
      icon: "coffee",
    },
    {
      id: 1,
      name: "Spotify",
      amount: 5.5,
      category: "subs",
      color: "#3ab7bf",
      icon: "computer",
    },
    {
      id: 2,
      name: "Deisal",
      amount: 405,
      category: "Travel",
      color: "#3ab7bf",
      icon: "computer",
    },
    {
      id: 3,
      name: "Netflix",
      amount: 15.5,
      category: "subs",
      color: "#3ab7bf",
      icon: "computer",
    },
    {
      id: 4,
      name: "Groceries",
      amount: 75,
      category: "Everyday",
      color: "#3ab7bf",
      icon: "computer",
    },
  ]);
  const [expensesCategories, setExpensesCategories] = useState([
    {
      id: 0,
      name: "subs",
      amount: 0,
    },
    {
      id: 1,
      name: "Loans",
      amount: 0,
    },
    {
      id: 2,
      name: "Travel",
      amount: 0,
    },
    {
      id: 3,
      name: "Everyday",
      amount: 0,
    },
  ]);

  //usestates Consts
  const [isNotifMenuActive, setIsNotifMenuActive] = useState(false);
  const [isShowExpenseNotif, setShowExpenseNotif] = useState(false);
  const [notificationMesage, setNotificationMessage] = useState(
    "Whoops, something went wrong here xD"
  );
  //this below usestate is used to visually indicate the most recently added history item, I will do the same for the income once working
  const [newlyAddedHistoryId, setNewlyAddedHistoryId] = useState(null);
  let highlightTimeout = null;

  const showNotif = (message) => {
    setIsNotifMenuActive(true);
    setNotificationMessage(message);

    // Set a timeout to run after 2 seconds
    setTimeout(() => {
      // This code runs after a 2-second delay
      setIsNotifMenuActive(false); // Set the notification menu state to false
    }, 4000); // 2000 milliseconds delay
  };

  const editIncomeItem = (incomeId, newAmount) => {
    setIncome((currentIncome) =>
      currentIncome.map((item) =>
        item.id === incomeId ? { ...item, amount: newAmount } : item
      )
    );
  };

  const addIncomeHistory = (newIncomeHistoryData) => {
    const newId =
      incomeHistory.length > 0
        ? incomeHistory[incomeHistory.length - 1].id + 1
        : 1;
    const newIncomeHistory = { id: newId, ...newIncomeHistoryData };
    setIncomeHistory((incomeHistory) => [...incomeHistory, newIncomeHistory]);
    setNewlyAddedHistoryId(newId);
    console.log("==================================== parent");
    console.log(+newId);
    console.log("====================================");
    //now I want to reset the id to something that doesn't exists like minus 1
    if (highlightTimeout !== null) {
      clearTimeout(highlightTimeout);
    }
    highlightTimeout = setTimeout(() => {
      setNewlyAddedHistoryId(null);
      highlightTimeout = null; // Reset the timeout reference
    }, 2000);
  };

  const addNewExpenseCategory = (newExpenseCategoryData) => {
    // Create a new expense category object
    const newCategory = {
      id: expensesCategories.length, // Assign a unique ID based on the array length (you might want a more robust ID generation in a real-world scenario)
      name: newExpenseCategoryData, // Use the provided category name
      amount: 0, // Set the initial amount to 0 or any default value
    };

    // Update the expensesCategories state by appending the new category
    setExpensesCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  const editExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? { ...expense, amount: updatedExpense.amount }
          : expense
      )
    );

    //show the notification abotu edited expense
    setShowExpenseNotif(true);
    setTimeout(() => {
      setShowExpenseNotif(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const addNewExpense = (newExpenseData) => {
    const newExpense = {
      id: expenses.length,
      name: newExpenseData.name,
      amount: newExpenseData.amount,
      category: newExpenseData.category,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  function ExpenseNotification({ message }) {
    return (
      <>
        <div
          role="alert"
          className="alert absolute w-1/4 mr-28 top-3 z-20 right-0 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">{message.message}</h3>
            <div className="text-xs">{message.change}</div>
          </div>
          <button className="btn btn-sm">see more</button>
        </div>
      </>
    );
  }
  // Function to add a new income to the array
  const addNewIncome = (newIncomeData) => {
    // Calculate the new ID based on existing incomes
    const newId = income.length > 0 ? income[income.length - 1].id + 1 : 1;
    // Create a new income object with the new ID and the data passed from the child
    const newIncome = { id: newId, ...newIncomeData };
    // Use the spread operator to clone the existing income array and add the newIncome
    setIncome((income) => [...income, newIncome]);
  };
  return (
    <>
      {isShowExpenseNotif && (
        <ExpenseNotification
          message={{ message: "xpense updated !", change: "£500 -> £950" }}
        />
      )}
      {isNotifMenuActive && (
        <div className="absolute w-2/4 left-1/4 top-[85%] h-auto z-50 bg-purple rounded-md centerPlz p-5">
          <p>{notificationMesage.title}</p>
          <p>{notificationMesage.message}</p>
        </div>
      )}

      <div className="container mx-auto ">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6  navbar mx-auto w-full mb-2">
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl">Pincher</a>
                <a className="  text-md">Home</a>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      <span className="font-bold text-lg">8 Items</span>
                      <span className="text-info">Subtotal: $999</span>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">
                          View cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Income
            incomeArray={income}
            onAddIncome={addNewIncome}
            onEditIncome={editIncomeItem}
            onNotif={showNotif}
            incomeHistoryArray={incomeHistory}
            onAddIncomeHistory={addIncomeHistory}
            newlyAddedId={newlyAddedHistoryId}
          />
          <Expenses
            expensesArray={expenses}
            expensesCategoriesArray={expensesCategories}
            onAddExpenseCategory={addNewExpenseCategory}
            onAddExpense={addNewExpense}
            onEditExpense={editExpense}
          />

          <Graph />
        </div>
      </div>
    </>
  );
}

export default App;
