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
          <div className="p-4 col-span-1 rounded-md bg-base-100 text-center">
            <p>£2500</p>
            <p>Entertainment</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100 text-center">
            <p>£2500</p>
            <p>Car</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100 text-center">
            <p>£4500</p>
            <p>Loans</p>
          </div>{" "}
          <div className="p-4 col-span-1 rounded-md bg-base-100 text-center">
            <p>£640</p>
            <p>Subscriptions</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100 text-center">
            <p>£640</p>
            <p>Subscriptions</p>
          </div>
          <div className="p-4 col-span-1 rounded-md bg-base-100 text-center">
            <p>£640</p>
            <p>Subscriptions</p>
          </div>
        </div>
        <div className="expensesArrayDiv  w-[90%] mx-auto mt-5">
          <button className="absolute w-7 h-7 translate-y-[-10px] rounded-full bg-tahiti text-center text-white">
            +
          </button>
          <div className="bg-base-100/50  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £50 Netflix
          </div>
          <div className="bg-base-100/50  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £30 Amazon
          </div>{" "}
          <div className="bg-base-100/50  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £350 Car Loan
          </div>
          <div className="bg-base-100/50  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £350 Car Loan
          </div>{" "}
          <div className="bg-base-100/50  text-sm rounded-md px-4 py-2 mx-6 my-1">
            £350 Car Loan
          </div>
        </div>

        <div className=" mt-5 grid grid-cols-3 gap-2 px-10 ">
          <div className="col-span-2 bg-base-100 rounded-md">70%</div>
          <div className="col-span-1 bg-base-100 text-white text-center py-5 rounded-md">
            70%
          </div>
        </div>
      </div>
    </>
  );
}

export default Expenses;
