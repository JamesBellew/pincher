import "../App.css";

function Expenses({ expensesArray, expensesCategoriesArray }) {
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

  // Output the totals for each category
  for (const [category, total] of Object.entries(totalsByCategory)) {
    console.log(`${category} = ${total}`);
  }

  return (
    <>
      <div className="md:h-[80vh] h-[85vh] dark:bg-base-200 bg-white col-span-2 md:col-span-2 rounded-md">
        <div class="grid grid-cols-1 pt-5 gap-4">
          <div className=" text-white text-lg text-center p-2">
            £6500 <br></br>
            {/* <select className=" absolute  p-1 rounded-md mt-1  shadow-sm cursor-pointer">
              <option disabled selected>
                Monthly
              </option>
              <option>Yearly</option>
              <option>Weekly</option>
            </select> */}
          </div>
        </div>
        <div class="grid grid-cols-3  gap-2 m-6">
          <button className="absolute w-7 h-7 translate-y-[-10px] translate-x-[-15px] rounded-full bg-tahiti text-center text-white">
            +
          </button>

          {expensesCategoriesArray.map((category) => {
            return (
              <>
                <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md  text-center">
                  <p className="text-sm">£{category.amount}</p>
                  <p className="text-xs">{category.name}</p>
                </div>
              </>
            );
          })}
        </div>
        <div className="expensesArrayDiv max-h-44  overflow-auto  w-[90%] mx-auto mt-10">
          <button className="absolute w-7 h-7 translate-y-[-10px] rounded-full bg-tahiti text-center text-white">
            +
          </button>

          {expensesArray.map((expense) => {
            return (
              <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
                £{expense.amount} {expense.name}
              </div>
            );
          })}
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
