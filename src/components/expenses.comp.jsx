import "../App.css";
import React, { useEffect, useRef, useState } from "react";

function Expenses({
  expensesArray,
  expensesCategoriesArray,
  onAddExpenseCategory,
  onAddExpense,
}) {
  const [isNewCategoryNameValid, setIsNewCategoryNameValid] = useState(false);
  const [showExpenseCategoriesComp, setShowExpenseCategoriesComp] =
    useState(true);
  const [showExpenseListComp, setShowExpenseListComp] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newIncomeName, setNewIncomeName] = useState("");
  const [newExpenseCategoryName, setNewExpenseCategoryName] = useState("");
  //new expense variables end
  const [showAddExpenseCategoryModal, setShowAddExpenseCategoryModal] =
    useState(false);

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
  const addNewExpenseCategoryHandler = () => {
    setShowAddExpenseCategoryModal(true);
  };
  const addModalClose = () => {
    setShowAddExpenseModal(false);
  };
  const addModalCloseCat = () => {
    setShowAddExpenseCategoryModal(false);
  };
  // Handler for input changes
  const handleInputChange = (e) => {
    console.log("====================================");
    console.log(e.target.value);
    const newCategory = e.target.value;
    setNewIncomeName(newCategory);
    console.log("====================================");
  };
  const handleSubmit = () => {
    console.log("====================================");
    console.log("boii");
    console.log("====================================");
  };
  const newExpenseCatgeryBtnHandler = () => {
    console.log("====================================");
    console.log("in expense btn hanlder");
    console.log("====================================");
    onAddExpenseCategory(newExpenseCategoryName);
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
        <button
          onClick={addNewExpenseCategoryHandler}
          className="absolute  right-[-15px] w-7 h-7 -translate-y-2.5 -translate-x-3.5 rounded-full bg-tahiti text-center text-white"
        >
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

  function AddExpenseCategory({ onClose }) {
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleInputChange = (e) => {
      setNewCategoryName(e.target.value);
    };

    const handleClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleAddCategory = () => {
      // Call a function here to handle adding the new category with newCategoryName
      console.log("New category name:", newCategoryName);
      setShowAddExpenseCategoryModal(false);
      // You can perform any further actions here, such as sending the new category to a parent component
      onAddExpenseCategory(newCategoryName);
      onClose();
    };

    return (
      <div
        className="absolute bg-base-200/95 cursor-pointer w-full h-full z-10 flex justify-center items-center"
        onClick={handleClick}
      >
        <div className="w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
          <div className="modal-box h-[80%]">
            <h3 className="font-bold text-lg">Add New Income</h3>
            <br></br>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="name"
                className="grow"
                placeholder="Category"
                value={newCategoryName}
                onChange={handleInputChange}
              />
            </label>
            <button
              // disabled={!isNewCategoryNameValid}
              className="btn mx-auto bg-purple text-center w-full mt-5"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  function AddExpenseModal() {
    //new expense variables
    const [newExpenseCategory, setNewExpenseCategory] = useState("");
    const [newExpenseAmount, setNewExpenseAmount] = useState("");
    const [newExpenseName, setNewExpenseName] = useState("");
    const newExpenseInoputChangeHandler = (e) => {
      if (e.target.name === "name") {
        setNewExpenseName(e.target.value);
      } else if (e.target.name === "category") {
        setNewExpenseCategory(e.target.value);
      } else if (e.target.name === "amount") {
        setNewExpenseAmount(e.target.value);
      }
    };

    const handleAddExpense = () => {
      // You can perform any further actions here, such as sending the new category to a parent component
      const newExpense = {
        name: newExpenseName,
        amount: newExpenseAmount,
        category: newExpenseCategory,
      };
      onAddExpense(newExpense);

      setShowAddExpenseModal(false);
      onClose();
    };
    return (
      <div
        className="absolute bg-base-200/95 cursor-pointer w-full h-full z-10 flex justify-center items-center"
        onClick={addModalClose}
      >
        <div className="w-full  max-w-xs" onClick={(e) => e.stopPropagation()}>
          <div className="cursor-auto py-5">
            <h3 className="mb-5 mx-auto text-center text-lg font-semibold">
              New Expense
            </h3>
            <label className="input input-bordered flex items-center gap-2 justify-center">
              <input
                onChange={newExpenseInoputChangeHandler}
                type="text"
                className="grow"
                placeholder="Name"
                name="name"
              />
            </label>
            <br />
            <select
              onChange={newExpenseInoputChangeHandler}
              className="select mb-5 select-bordered w-full max-w-xs"
              name="category"
            >
              <option disabled selected>
                Category
              </option>
              {expensesArray.map((expense) => {
                return (
                  <option
                    // name={"category"}

                    value={expense.name}
                  >
                    {expense.name}
                  </option>
                );
              })}
            </select>
            <br />
            <label className="input input-bordered flex items-center gap-2 justify-center">
              <input
                name="amount"
                onChange={newExpenseInoputChangeHandler}
                type="text"
                className="grow"
                placeholder="Amount"
              />
            </label>
            <br />
            <button
              onClick={handleAddExpense}
              className="btn btn-primary mx-auto flex items-center justify-center"
            >
              Add
            </button>
          </div>
        </div>
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
        {showAddExpenseModal && <AddExpenseModal onClose={addModalClose} />}
        {showAddExpenseCategoryModal && (
          <AddExpenseCategory onClose={addModalClose} />
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
          }  max-h-32 relative  overflow-auto  w-[90%] mx-auto mt-10`}
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
