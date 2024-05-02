import "../App.css";
import React, { useEffect, useRef, useState } from "react";

function Expenses({ expensesArray, expensesCategoriesArray }) {
  const [showExpenseCategoriesComp, setShowExpenseCategoriesComp] =
    useState(true);
  const [showExpenseListComp, setShowExpenseListComp] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  //want to get the total figures for the categories somehow :L
  // Using .reduce() to sum expenses by category
  const totalsByCategory = expensesArray.reduce((acc, expense) => {
    // Initialize the category in the accumulator if it doesn't already exist
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    // Add the expense amount to the category total
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const expenseCategoryBtnHandler = () => {
    setShowExpenseCategoriesComp(!showExpenseCategoriesComp);
  };
  const expenseListBtnHandler = () => {
    setShowExpenseListComp(!showExpenseListComp);
  };
  const addNewExpenseHandler = () => {
    setShowAddExpenseModal(true);
  };
  const addModalClose = () => {
    setShowAddExpenseModal(false);
  };
  function ExpensesListComp() {
    return (
      <>
        <button
          onClick={addNewExpenseHandler}
          className="absolute w-7 h-7  top-2 right-5 rounded-full bg-tahiti text-center text-white"
        >
          +
        </button>
        {expensesArray.map((expense) => {
          return (
            <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
              £{expense.amount} {expense.name}
            </div>
          );
        })}
      </>
    );
  }

  function ExpensesCategoriesComp() {
    return (
      <div className="grid grid-cols-3 gap-2 relative ">
        <button className="absolute  right-[-15px] w-7 h-7 -translate-y-2.5 -translate-x-3.5 rounded-full bg-tahiti text-center text-white">
          +
        </button>
        {expensesCategoriesArray.map((category) => {
          return (
            <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md text-center">
              <p className="text-sm">£{totalsByCategory[category.name] || 0}</p>
              <p className="text-xs">{category.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
  // Output the totals for each category
  for (const [category, total] of Object.entries(totalsByCategory)) {
    console.log(`${category} = ${total}`);
  }

  return (
    <>
      <div className="md:h-[80vh] h-[85vh] dark:bg-base-200 bg-white relative  col-span-2 md:col-span-2 rounded-md">
        {/* add new expense Modal */}
        {showAddExpenseModal && (
          <div
            className="absolute bg-base-200/95 cursor-pointer w-full h-full z-10 flex justify-center items-center"
            onClick={addModalClose}
          >
            <div
              className="w-full  max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <form className="cursor-auto py-5">
                <h3 className="mb-5 mx-auto text-center text-lg font-semibold">
                  New Expense
                </h3>
                <label className="input input-bordered flex items-center gap-2 justify-center">
                  <input type="text" className="grow" placeholder="Name" />
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2 justify-center">
                  <input type="text" className="grow" placeholder="Category" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2 justify-center">
                  <input type="text" className="grow" placeholder="Amount" />
                </label>
                <br />
                <button className="btn btn-primary mx-auto flex items-center justify-center">
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        <div class="grid grid-cols-1 pt-5 gap-4">
          <div className=" text-white text-lg text-center p-2">
            £6500 <br></br>
          </div>
        </div>
        <div
          className={`
        ${!showExpenseCategoriesComp ? "shadow-lg" : " "}
        
        border-base-100 p-2 rounded-md  mx-8 `}
        >
          <div className="w-4/5   mb-1 rounded-md flex justify-start">
            <button
              onClick={expenseCategoryBtnHandler}
              className="bg-tahiti/10 px-2 text-xs mr-1 font-bold p-1 rounded-md"
            >
              {showExpenseCategoriesComp ? "-" : "+"}
            </button>
            {!showExpenseCategoriesComp && (
              <span className=" text-left"> Expenses Categories</span>
            )}
          </div>
          {showExpenseCategoriesComp && (
            <ExpensesCategoriesComp></ExpensesCategoriesComp>
          )}
        </div>
        <div
          className={`expensesArrayDiv ${
            !showExpenseListComp ? "shadow-lg p-1" : " "
          }  max-h-44 relative  overflow-auto  w-[90%] mx-auto mt-10`}
        >
          <div className="w-4/5 mx-5  mb-1 rounded-md flex justify-start">
            <button
              onClick={expenseListBtnHandler}
              className="bg-tahiti/10 px-2 text-xs mr-1 font-bold p-1 rounded-md"
            >
              {showExpenseListComp ? "-" : "+"}
            </button>
            {!showExpenseListComp && (
              <span className=" text-left"> Expenses</span>
            )}
          </div>
          {showExpenseListComp && <ExpensesListComp />}
        </div>
        <div className=" mt-6 grid grid-cols-3 gap-2 px-8 ">
          <div className="col-span-1 cursor-pointer hover:bg-base-100/50 shadow-md text-white text-center py-5 rounded-md">
            <h1>5</h1>
            <p>categories</p>
          </div>
          <div className="col-span-1 cursor-pointer hover:bg-base-100/50 shadow-md text-white text-center py-5 rounded-md">
            <h1>15</h1>
            <p>Expenses</p>
          </div>
          <div className="col-span-1 cursor-pointer hover:bg-base-100/50 shadow-md text-white text-center py-5 rounded-md">
            <h1>15</h1>
            <p>Expenses</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expenses;
