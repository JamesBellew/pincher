import "../App.css";

function Expenses() {
  return (
    <>
      <div className="md:h-[80vh] h-[85vh] dark:bg-base-200 bg-white col-span-2 md:col-span-2 rounded-md">
        <div class="grid grid-cols-1 pt-5 gap-4">
          <div className=" text-white text-lg text-center p-2">
            £6500 <br></br>
            <select className=" p-1 rounded-md mt-1  shadow-sm cursor-pointer">
              <option disabled selected>
                Monthly
              </option>
              <option>Yearly</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3  gap-2 m-4">
          <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md  text-center">
            <p>£2500</p>
            <p>Entertainment</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md  text-center">
            <p>£2500</p>
            <p>Car</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md  text-center">
            <p>£4500</p>
            <p>Loans</p>
          </div>{" "}
          <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md  text-center">
            <p>£640</p>
            <p>Subscriptions</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md  text-center">
            <p>£640</p>
            <p>Subscriptions</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100/50 shadow-md text-center">
            <p>£640</p>
            <p>Subscriptions</p>
          </div>
        </div>
        <div className="expensesArrayDiv  w-[90%] mx-auto mt-10">
          <button className="absolute w-7 h-7 translate-y-[-10px] rounded-full bg-tahiti text-center text-white">
            +
          </button>
          <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £50 Netflix
          </div>
          <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £30 Amazon
          </div>{" "}
          <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £350 Car Loan
          </div>
          <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £350 Car Loan
          </div>{" "}
          <div className="shadow-md  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £350 Car Loan
          </div>
        </div>

        <div className=" mt-6 grid grid-cols-3 gap-2 px-8 ">
          <div className="col-span-2 rounded-md  p-3 shadow-md text-center flex flex-col items-center justify-center ">
            <h2 className="text-tahiti">
              <progress
                className="progress text-tahiti bg-tahiti w-40"
                value="30"
                max="100"
              ></progress>
            </h2>
            <p className="text-xs mt-2">Savings Over Expenses</p>
          </div>

          <div className="col-span-1 cursor-pointer hover:bg-base-100/50 shadow-md text-white text-center py-5 rounded-md">
            <h1>5</h1>
            <p>Expenses</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expenses;
