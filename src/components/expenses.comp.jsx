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
  const [expenseListCategoryFilter, setExpenseListCategoryFilter] = useState(
    []
  );
  //new expense variables end
  const [showAddExpenseCategoryModal, setShowAddExpenseCategoryModal] =
    useState(false);
  function PriceDisplay({ price }) {
    return <h1 className="text-xl font-bold text-[#9FA7B5]">£{price}</h1>;
  }
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
  const expenseFilterClearHandler = (filter) => {
    setExpenseListCategoryFilter(
      expenseListCategoryFilter.filter((name) => name !== filter)
    );
    // setExpenseListCategoryFilter(
    //   currentFilter.filter((name) => name !== filter)
    // );
    console.log("clicked");
  };
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
          className="absolute w-7 h-7  top-[-15px] right-3 rounded-full bg-tahiti text-center text-white"
        >
          +
        </button>
        <div className="grid grid-cols-2 mx-3">
          {expensesArray.map((expense) => {
            return (
              <div className="shadow-md cursor-pointer hover:bg-base-200 text-sm rounded-md bg-base-100 px-2 py-2 mx-1 my-1">
                £{expense.amount} {expense.name}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  function ExpensesCategoriesComp() {
    const categoryTileClickHandler = (expenseName) => {
      setExpenseListCategoryFilter((currentFilter) => {
        // Check if the expenseName is already included in the array
        if (currentFilter.includes(expenseName)) {
          // If it's included, return a new array without that expenseName
          return currentFilter.filter((name) => name !== expenseName);
        } else {
          // If it's not included, add the expenseName to the array
          return [...currentFilter, expenseName];
        }
      });
      console.log(expenseName);
    };

    return (
      <>
        <button
          onClick={addNewExpenseCategoryHandler}
          className="absolute  right-5 z-10 w-7 h-7 -translate-y-2.5 -translate-x-3.5 rounded-full bg-tahiti text-center text-white"
        >
          +
        </button>
        <div className="grid   overflow-x-hidden overflow-auto max-h-36 grid-cols-3 gap-2 relative ">
          {expensesCategoriesArray.map((category) => {
            return (
              <div
                onClick={() => categoryTileClickHandler(category.name)}
                className={`p-4 
                ${
                  expenseListCategoryFilter.includes(category.name)
                    ? "shadow-tahiti/50 shadow-md" // Applied if category.name is in the expenseListCategoryFilter array
                    : ""
                }
                cursor-pointer hover:bg-base-200 col-span-1 rounded-md bg-base-100/50 shadow-md text-center`}
              >
                <p className="text-sm">
                  £{totalsByCategory[category.name] || 0}
                </p>
                <p className="text-xs">{category.name}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  function AddExpenseCategory({ onClose }) {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isNewCategoryInputValid, setIsNewCategoryInputValid] =
      useState(false);

    useEffect(() => {
      if (newCategoryName.length > 1) {
        setIsNewCategoryInputValid(true);
      } else {
        setIsNewCategoryInputValid(false);
      }
    }, [newCategoryName]);
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
        onClick={addModalCloseCat}
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
              disabled={!isNewCategoryInputValid}
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
    // form validation consts
    const [isNameValid, setIsNameValid] = useState(false);
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const newExpenseInoputChangeHandler = (e) => {
      if (e.target.name === "name") {
        setNewExpenseName(e.target.value);
        if (e.target.value.length > 1) {
          setIsNameValid(true);
        } else {
          setIsNameValid(false);
        }
      } else if (e.target.name === "category") {
        setNewExpenseCategory(e.target.value);
      } else if (e.target.name === "amount") {
        setNewExpenseAmount(e.target.value);
        if (e.target.value > 0) {
          setIsAmountValid(true);
        } else {
          setIsAmountValid(false);
        }
      }

      //form validation
    };

    useEffect(() => {
      if (isNameValid === true && isAmountValid === true) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }, [isNameValid, isAmountValid]);
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
        className="absolute bg-base-200/95 z-20 cursor-pointer w-full h-full  flex justify-center items-center"
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
              {expensesCategoriesArray.map((expense) => {
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
              disabled={!isFormValid}
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
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  //use effect for total expense figure
  useEffect(() => {
    let total = 0; // Initialize total as a let variable to allow modification
    expensesArray.forEach((expense) => {
      total += expense.amount; // Add each expense's amount to the total
    });
    setTotalExpenseAmount(total); // Update the state with the new total
  }, [expensesArray]); // Depend on expensesArray to recalculate when it changes

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
            {/* £ {totalExpenseAmount} */}
            <PriceDisplay price={totalExpenseAmount} />
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
            {expenseListCategoryFilter.length > 0 &&
              showExpenseCategoriesComp &&
              expenseListCategoryFilter.map((filter) => {
                return (
                  <span
                    onClick={() => expenseFilterClearHandler(filter)}
                    className="text-xs my-auto hover:bg-bubble-gum w-auto hover:text-base-200 cursor-pointer font-thin bg-base-100 px-2 py-1 rounded-md"
                  >
                    {filter}
                  </span>
                );
              })}
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
          } relative  max-h-36 relative  overflow-auto  w-[90%] mx-auto mt-5`}
        >
          <div className="w-4/5 mx-5 relative  mb-1 rounded-md flex justify-start">
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
          <div className="relative ">
            {showExpenseListComp && <ExpensesListComp />}
          </div>
        </div>
        <div className="  mt-6 grid grid-cols-3 gap-2 px-8 ">
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
