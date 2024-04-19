import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencil,
  faCoffee,
  faMoneyBillWave,
  faBolt,
  faGamepad,
  faPiggyBank,
  faArrowTrendUp,
  faCartShopping,
  faComputer,
  faArrowLeft,
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, LineElement, PointElement } from "chart.js";
import Select from "react-select";
import { library } from "@fortawesome/fontawesome-svg-core";
import "../App.css";
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

Chart.register(PieController, ArcElement, Tooltip, Legend);
Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// Add all icons to the library for easy reference
library.add(faMoneyBillWave, faCoffee, faComputer);

function Income({
  incomeArray,
  onAddIncome,
  onEditIncome,
  onNotif,
  incomeHistoryArray,
  onAddIncomeHistory,
  newlyAddedId,
}) {
  const chartRef = useRef(null);
  const [totalIncomeFigure, setTotalIncomeFigure] = useState(0);
  const [totalIncomeStreams, setTotalIncomeStreams] = useState(0);
  const [legendItems, setLegendItems] = useState([]);
  const chartInstance = useRef(null); // Use this ref to keep track of the chart instance
  const [incomeSectionNav, setIncomeSectionNav] = useState("overview"); //this the usestate for the navigation for the income right hand side grid, it navigates between the overview and the history components. the two key words for valeus are overview and history
  const [newIncomeName, setNewIncomeName] = useState("");
  const [newIncomeAmount, setNewIncomeAmount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [originalIncomeEditAmountFigure, setOriginalIncomeEditAmountFigure] =
    useState(0);
  const [updatedIncomeEditAmountFigure, setUpdatedIncomeEditAmountFigure] =
    useState(0);
  const [isEditValueTouched, setIsEditValueTouched] = useState(false);
  const [isEditIncomeModalActive, setIsEditIncomeModalActive] = useState(false);
  const [newIncomeIcon, setNewIncomeIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isEditIncomeFormBtnValid, setIsEditIncomeFormBtnValid] =
    useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  // Define your options with icons
  const options = [
    {
      value: "money-bill-wave",
      label: (
        <span>
          <FontAwesomeIcon icon={faMoneyBillWave} />
        </span>
      ),
    },
    {
      value: "coffee",
      label: (
        <span>
          <FontAwesomeIcon icon={faCoffee} />
        </span>
      ),
    },
    {
      value: "computer",
      label: (
        <span>
          <FontAwesomeIcon icon={faComputer} />
        </span>
      ),
    },
    {
      value: "piggyBank",
      label: (
        <span>
          <FontAwesomeIcon icon={faPiggyBank} />
        </span>
      ),
    },
    {
      value: "arrowTrendUp",
      label: (
        <span>
          <FontAwesomeIcon icon={faArrowTrendUp} />
        </span>
      ),
    },
    {
      value: "shoppingCart",
      label: (
        <span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
      ),
    },
    {
      value: "bolt",
      label: (
        <span>
          <FontAwesomeIcon icon={faBolt} />
        </span>
      ),
    },
    {
      value: "controller",
      label: (
        <span>
          <FontAwesomeIcon icon={faGamepad} />
        </span>
      ),
    },
    // Add more options as needed
  ];

  const colorOptions = [
    {
      value: "#3ab7bf",
      label: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#3ab7bf" }}
        ></div>
      ),
      title: "Green",
    },
    {
      value: "#8182ff",
      label: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#8182ff" }}
        ></div>
      ),
      title: "#8182ff",
    },
    {
      value: "yellow",
      label: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}
        ></div>
      ),
      title: "Yellow",
    },
    // Add more colors as needed
  ];

  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption);
    console.log(
      "Selected color:",
      selectedOption ? selectedOption.value : "none"
    );
  };
  const colorcustomStyles = {
    menuList: (provided, state) => ({
      ...provided,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "start",
    }),
    option: (provided, state) => ({
      ...provided,
      flex: "1 1 20%", // Adjust based on desired width of each color block
      height: 40, // Set a fixed height for each color option
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 2,
      backgroundColor: state.isSelected ? "#ccc" : "transparent", // Highlight if selected
      ":hover": {
        backgroundColor: "#eee", // Highlight on hover
      },
    }),
  };

  const customStyles = {
    menuList: (provided, state) => ({
      ...provided,
      display: "flex",
      flexWrap: "wrap", // Allow options to wrap onto the next line
      backgroundColor: "#1d232a",
      justifyContent: "start", // Align items to the start of the menu
      color: "#3ab7bf",
    }),
    option: (provided, state) => ({
      ...provided,
      flex: "1 1 20%", // Give each option a flex basis of 20%, adjust as needed
      display: "flex",
      justifyContent: "center",
      backgroundColor: state.isSelected ? "#1d232a" : "#1d232a",
      alignItems: "center",
      margin: 5, // Add some margin between icons
      height: "auto",
      color: "#3ab7bf",
    }),
    control: (provided, state) => ({
      ...provided,
      minWidth: 300, // Set a minimum width for the control
      backgroundColor: "#1d232a",
      borderRadius: "10px",
      borderWidth: "1px",
      padding: "5px",
      border: state.isFocused ? "1px solid #1d232a" : "1px solid #373f47", // thinner border, changing color on focus
      color: "#3ab7bf",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      backgroundColor: "#1d232a",
      justifyContent: "center",
      alignItems: "center",
      color: "#3ab7bf",
    }),
  };

  const [incomeSelectedForEdit, setIncomeSelectedForEdit] = useState({
    id: null,
    name: "",
    amount: 12500, // Assuming this is your initial amount
  });
  const [highlight, setHighlight] = useState(false);

  // Toggle modal visibility
  const toggleModal = () =>
    setIsEditIncomeModalActive(!isEditIncomeModalActive);

  const [IncomeEditValue, setIncomeSelectedEditValue] = useState(12500); // Set the initial value

  const handleChange = (e, orginalFigure) => {
    const updatedIncome = { ...incomeSelectedForEdit, amount: e.target.value };
    setIncomeSelectedForEdit(updatedIncome); // Update the nested state
    //want to set the is edit value to true so that the figure shows up when enetrgin the new value

    //this is to update the new income edit usetstae amount
    setUpdatedIncomeEditAmountFigure(e.target.value);

    //! now to do some validation to see if valid and if so I will enable the button to submit
    if (+orginalFigure === +e.target.value) {
      setIsEditIncomeFormBtnValid(false);
      setIsEditValueTouched(false);
    } else {
      setIsEditIncomeFormBtnValid(true);
      setIsEditValueTouched(true);
    }
  };
  // Validation check function
  const validateForm = () => {
    return newIncomeName.trim() !== "" && parseFloat(newIncomeAmount) > 0;
  };

  const closeEditIncomeModal = () => {
    //close incoem edit modal
    setIsEditIncomeModalActive(!isEditIncomeModalActive);
    //get rid of the edit figure section for next time the user goes to edit a income
    setIsEditValueTouched(false); // Sets the state to false
    outerModalClickHanlder();
  };
  const incomeClickHandler = (income) => {
    setIncomeSelectedForEdit(income);
    setIncomeSelectedEditValue(income.amount);
    setIsEditIncomeModalActive(!isEditIncomeModalActive);
    //this below is to show the original figure on top of the input when entering the new figure
    setOriginalIncomeEditAmountFigure(income.amount);
  };
  const saveIncomeEditHandler = () => {
    setIsEditIncomeModalActive(!isEditIncomeModalActive);
    onNotif({
      title: "Income Changed",
      message:
        "Changed the figure of " +
        incomeSelectedForEdit.name +
        " from £" +
        incomeSelectedForEdit.amount +
        " to £" +
        IncomeEditValue,
    });
    onEditIncome(incomeSelectedForEdit.id, +incomeSelectedForEdit.amount);
    onAddIncomeHistory({
      incomeName: incomeSelectedForEdit.name,
      date: "17/05/2024",
      figureChange: +IncomeEditValue - incomeSelectedForEdit.amount,
    });
    //get rid of the edit figure section for next time the user goes to edit a income
    setIsEditValueTouched(false); // Sets the state to false
    //put the save button state back to disabled since the user submitted the update
    setIsEditIncomeFormBtnValid(false);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setNewIncomeName(value);
    } else if (name === "amount") {
      setNewIncomeAmount(value);
    }
    // Check if form is valid after the update
    setIsFormValid(validateForm());
  };

  const outerModalClickHanlder = () => {
    e.stopPropagation(); // Prevents the click event from bubbling up to parent elements
  };

  const handleSubmit = () => {
    const newIncomeData = {
      name: newIncomeName,
      // Convert amount to a number to ensure correct addition
      amount: +newIncomeAmount,
      color: selectedColor.value,
      icon: newIncomeIcon,
    };
    const modal = document.getElementById("my_modal_1");
    if (modal) modal.close(); // This will close the modal

    // Call the onAddIncome function passed down as prop, without an id
    onAddIncome(newIncomeData);
    onNotif({
      title: "New Income Added",
      message: "Name : " + newIncomeName + " Amount : £" + newIncomeAmount,
    });
  };

  useEffect(() => {
    console.log("==================================== child");
    console.log(newlyAddedId);
    console.log("====================================");
  }, [newlyAddedId]);

  useEffect(() => {
    const totalAmount = incomeArray.reduce(
      (accumulator, currentItem) => accumulator + currentItem.amount,
      0
    );
    setTotalIncomeFigure(totalAmount);
  }, [incomeArray]);

  useEffect(() => {
    const totalStreams = incomeArray.length;
    if (totalStreams !== totalIncomeStreams) {
      setTotalIncomeStreams(totalStreams);
      setHighlight(true); // Activate highlight when number of streams changes
      setTimeout(() => {
        setHighlight(false); // Remove highlight after 2 seconds
      }, 2000);
    }
  }, [incomeArray]);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const incomeLabels = incomeArray.map((income) => income.name);
    const incomeAmounts = incomeArray.map((income) => income.amount);
    const colors = incomeArray.map(
      () => `hsl(${Math.random() * 360}, 100%, 75%)`
    );

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: incomeLabels,
        datasets: [
          {
            data: incomeAmounts,
            backgroundColor: colors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Disable the default legend
          },
        },
      },
    });

    // Generate custom legend items
    const newLegendItems = chart.data.labels.map((label, index) => ({
      text: label,
      color: chart.data.datasets[0].backgroundColor[index],
      value: chart.data.datasets[0].data[index], // Include the value
    }));
    setLegendItems(newLegendItems);

    return () => chart.destroy();
  }, [incomeArray]);

  const editIncomeItem = (income) => {};

  //the below if the handler for selecting a incon when adding a new incom
  const handleIconChange = (selectedOption) => {
    setNewIncomeIcon(selectedOption.value);
    console.log("====================================");
    console.log(selectedOption);
    console.log("====================================");
    console.log(
      "Selected icon:",
      selectedOption ? selectedOption.value : "none"
    );
  };

  //this belkow components is the legend for the barcart/ the overview components which has a brewakdown of everythign withn the income array.
  function OverviewComponent() {
    return (
      <ul className="text-xs ps-2 p-3">
        {legendItems.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: item.color,
                marginRight: "10px",
                borderRadius: "10px",
              }}
            ></span>
            £{`${item.value}: ${item.text}`} {/* Display name and value */}
          </li>
        ))}
      </ul>
    );
  }
  function OverallComponent() {
    const data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Savings",
          data: [1000, 2500, 3200, 5000, 6500],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          borderRadius: 20, // Enhanced border radius
          borderSkipped: false,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Monthly Savings Data",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={data} options={options} />;
  }

  function LineChartComponent() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Growth",
          data: [2500, 2950, 3200, 4250, 5000, 5500, 8500],
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          tension: 0.4, // Adjust this value for different interpolation (0 for straight lines)
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Line data={data} options={options} />;
  }

  const modalNavClickHandlerPrev = () => {
    //first I need to check if the user is on the first index to avoid hittin the array out of bounds error. I will throw them back to the last index if on the first idnex of the array

    //grabbing the length of thw array. Must minus 1 because of the way array work by startying by 0 instead of 1
    const lastIndexValue = incomeArray.length - 1;

    if (incomeSelectedForEdit.id === 0) {
      //push it to the last index value of array
      setIncomeSelectedForEdit(incomeArray[lastIndexValue]);
    } else {
      setIncomeSelectedForEdit(incomeArray[incomeSelectedForEdit.id - 1]);
    }
  };
  const modalTopNavBtnClickHandler = (navIndex) => {
    setIncomeSelectedForEdit(incomeArray[navIndex]);
  };
  const modalNavClickHandlerNext = () => {
    //first I need to check if the user is on the last index to avoid hittin the array out of bounds error. I will thwo them back to the first index if on the last idnex of the array

    //grabbing the length of thw array. Must minus 1 because of the way array work by startying by 0 instead of 1
    const lastIndexValue = incomeArray.length - 1;

    if (incomeSelectedForEdit.id === lastIndexValue) {
      //push it to the start value of array
      setIncomeSelectedForEdit(incomeArray[0]);
    } else {
      setIncomeSelectedForEdit(incomeArray[incomeSelectedForEdit.id + 1]);
    }
  };
  function OverallComponent() {
    const data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Savings",
          data: [1000, 2500, 3200, 5000, 6500],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          borderRadius: 5, // Set border radius here
          borderSkipped: false,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Monthly Sales Data",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={data} options={options} />;
  }

  //this belkow components is the History for the user/ the overview components which has a brewakdown of recent activity within the income/expenses array.
  function ActivityComponent() {
    return (
      <ul>
        {incomeHistoryArray.map((historyItem, index) => (
          // Use curly braces to evaluate and display JavaScript expressions within JSX
          <li
            className={`text-xs px-2 transition-all transition-opacity duration-700 ease-in-out ${
              historyItem.id === newlyAddedId
                ? "bg-white/10 rounded-md p-1"
                : ""
            }`} // Apply text-purple if this is the newly added item
            key={index}
          >
            {historyItem.date + ": "}
            <span
              className={
                historyItem.figureChange >= 0 ? "text-purple" : "text-tahiti"
              }
            >
              {historyItem.figureChange >= 0
                ? ` £${historyItem.figureChange}`
                : ` -£${Math.abs(historyItem.figureChange)}`}
            </span>
            <span className="text-center"> {historyItem.incomeName}</span>
          </li>
        ))}
      </ul>
    );
  }

  const renderComponent = () => {
    if (incomeSectionNav === "overview") {
      return <OverviewComponent />;
    } else if (incomeSectionNav === "overall") {
      return <OverallComponent />;
    } else if (incomeSectionNav === "chart") {
      return <LineChartComponent />;
    } else {
      return <ActivityComponent />;
    }
  };
  const incomeNavClickHandler = (section) => {
    setIncomeSectionNav(section);
  };
  return (
    <>
      <div className="md:h-[80vh] h-[85vh] px-4 bg-base-200 shadow-md col-span-4 md:col-span-4 rounded-md">
        <div className="grid grid-cols-2 mx-auto gap-1 h-full grid-rows-8 ">
          <div className="relative col-span-2  row-span-1">
            {/* <span className='absolute text-xl font-bold mt-2 text-navy-dark-1'>Income</span> */}
            <div className="mx-auto text-center ">
              <br></br>
              <span className="text-center text-xl font-bold mt-5    light:text-navy-dark-1 relative ">
                £{totalIncomeFigure}
              </span>
            </div>
          </div>
          <div className="dark:bg-base-200 bg-white row-span-4 m-4 mx-auto rounded-md">
            {/* Chart.js Graph will be rendered inside this canvas */}
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="dark:bg-base-200 bg-white row-span-4  m-4 rounded-md overflow-auto">
            <div className="overflow-x-auto overflow-y-scroll always-show-scrollbar ">
              <div className="grid grid-cols-4 grid-rows-1 p-4">
                <button
                  onClick={() => {
                    incomeNavClickHandler("overview");
                  }}
                  className={`col-span-1 btn  ${
                    incomeSectionNav === "overview"
                      ? "btn-neutral"
                      : "btn-ghost"
                  } btn-xs `}
                >
                  Overview
                </button>
                <button
                  onClick={() => {
                    incomeNavClickHandler("overall");
                  }}
                  className={`col-span-1 btn  ${
                    incomeSectionNav === "overall" ? "btn-neutral" : "btn-ghost"
                  } btn-xs `}
                >
                  Overall
                </button>
                <button
                  onClick={() => {
                    incomeNavClickHandler("chart");
                  }}
                  className={`col-span-1 btn  ${
                    incomeSectionNav === "chart" ? "btn-neutral" : "btn-ghost"
                  } btn-xs `}
                >
                  Chart
                </button>
                <button
                  onClick={() => {
                    incomeNavClickHandler("history");
                  }}
                  className={`col-span-1 btn  ${
                    incomeSectionNav === "history" ? "btn-neutral" : "btn-ghost"
                  } btn-xs `}
                >
                  History
                </button>
              </div>
              {
                //consitionaly rendering the overview/history components based on the users selection on above nav

                renderComponent()
              }
            </div>
          </div>

          {isEditIncomeModalActive && (
            <>
              <div
                onClick={incomeClickHandler}
                className="fixed inset-0 w-full h-full bg-base-200/75 flex items-center justify-center z-50"
              >
                {/* Stop propagation onClick inside the modal content to prevent the backdrop handler from firing */}
                <div
                  className="bg-base-100 relative text-center p-16 m-4 rounded-md text-white w-1/2 max-w-lg mx-auto "
                  onClick={(e) => e.stopPropagation()}
                  // onClick={outerModalClickHanlder}
                >
                  <div className=" absolute h-1/5 bottom-1/4 w-10 left-0 m-5 my-auto flex items-center justify-center">
                    <button
                      className="btn btn-ghost shadow-md"
                      onClick={modalNavClickHandlerPrev}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                  </div>
                  <div className=" absolute h-1/5 bottom-1/4 w-10 right-0 m-5 my-auto flex items-center justify-center">
                    <button
                      className="btn btn-ghost shadow-md"
                      onClick={modalNavClickHandlerNext}
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>

                  {incomeArray.map((income, index) => (
                    <button
                      onClick={() => modalTopNavBtnClickHandler(index)}
                      className={`${
                        index === incomeSelectedForEdit.id ? "bg-tahiti" : " "
                      }  rounded-md  inline-block bg-base-300 w-5 h-2 mx-1 mb-5`}
                    ></button>
                  ))}
                  <br></br>

                  <p className="border-b-tahiti p-1 ">
                    {incomeSelectedForEdit.name}
                  </p>

                  {isEditValueTouched && (
                    <div className="calcs mt-2 w-3/5 mx-auto h-2 text-left flex justify-between p-2 items-center">
                      <p className="text-xs">
                        £{originalIncomeEditAmountFigure}
                      </p>
                      <p
                        className={`text-xs ${
                          updatedIncomeEditAmountFigure >
                          originalIncomeEditAmountFigure
                            ? "text-tahiti"
                            : "text-purple"
                        } `}
                      >
                        £{" "}
                        {updatedIncomeEditAmountFigure -
                          originalIncomeEditAmountFigure}
                      </p>
                    </div>
                  )}

                  {/* <p className='text-muted text-sm mt-5 max-w-xs text-left mx-24 text-tahiti'>2500</p>
   <p className='text-muted text-sm mt-5 max-w-xs text-left mx-24 text-tahiti'>2500</p> */}
                  <input
                    type="number"
                    value={incomeSelectedForEdit.amount}
                    onChange={(e) =>
                      handleChange(e, +originalIncomeEditAmountFigure)
                    }
                    className="input text-center  input-bordered max-w-xs my-2"
                    min={0}
                    step={100}
                  />
                  <br></br>
                  <button
                    disabled={!isEditIncomeFormBtnValid}
                    className={` ${
                      isEditIncomeFormBtnValid
                        ? "bg-purple"
                        : "bg-purple/25 text-purple/50 border-none cursor-none"
                    } btn btn-purple bg-purple text-white mt-5 mr-5`}
                    onClick={saveIncomeEditHandler}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-base-200 mt-5"
                    onClick={closeEditIncomeModal}
                  >
                    Closhhe
                  </button>
                  {/* Add more content or buttons here */}
                  {/* <br></br>
        <br></br> */}
                  {/* <button className='bg-tahiti p-2 rounded-md ' onClick={modalNavClickHandler}>Next</button> */}
                </div>
              </div>
            </>
          )}

          <dialog id="my_modal_1" className="modal h-full">
            <div className="modal-box  h-[80%]">
              <h3 className="font-bold text-lg">Add New Income</h3>
              <br></br>
              <label className="input input-bordered flex items-center gap-2">
                Name :
                <input
                  type="text"
                  name="name"
                  className="grow"
                  placeholder="Side Hustle"
                  onChange={handleInputChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Amount :
                <input
                  type="number"
                  name="amount"
                  className="grow"
                  placeholder="1"
                  onChange={handleInputChange}
                />
              </label>

              <div>
                <label className="label">Color</label>
                <Select
                  value={selectedColor}
                  onChange={handleColorChange}
                  options={colorOptions}
                  styles={colorcustomStyles}
                  getOptionLabel={(option) => (
                    <div
                      title={option.title}
                      style={{ width: "100%", height: "100%" }}
                    >
                      {option.label}
                    </div>
                  )}
                  getOptionValue={(option) => option.value}
                  className="bg-base-200" // Tailwind CSS class for background color
                />
              </div>

              <label className="label">Icon</label>
              <Select
                value={selectedOption}
                onChange={handleIconChange}
                className="bg-base-200"
                options={options}
                styles={customStyles}
              />
              {selectedColor && (
                <div
                  className={` w-full relative h-1 mt-5 rounded-full`}
                  style={{ backgroundColor: selectedColor.value }}
                ></div>
              )}
              <div className="w-auto rounded-md shadow-md h-auto p-10 text-center mt-5 bg-base-200/50">
                {newIncomeIcon && (
                  <span className="mr-1 ">
                    <FontAwesomeIcon icon={newIncomeIcon} />
                  </span>
                )}

                {newIncomeName.length > 0 && (
                  <span className="mr-1 "> {newIncomeName} </span>
                )}

                {newIncomeAmount > 0 && (
                  <span className="mr-1 "> £{newIncomeAmount} </span>
                )}
              </div>

              <div className="modal-action flex flex-row items-center justify-center w-auto mt-14">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`${
                    isFormValid ? "bg-primary" : "bg-gray-400 disabled"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2`}
                >
                  Add
                </button>

                <form method="dialog" className="flex justify-center">
                  <button className="btn mx-2">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <div className="col-span-2 grid grid-cols-8 row-span-4 overflow-auto mb-7">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="absolute w-7 h-7 translate-y-[-10px] rounded-full bg-tahiti text-center text-white"
            >
              +
            </button>
            <ul className="px-2 overflow-y-scroll col-span-5  always-show-scrollbar text-left">
              {incomeArray.map((income) => (
                <li
                  onClick={() => {
                    incomeClickHandler(income);
                  }}
                  key={income.id}
                  className="flex items-center bg-slate-100 shadow-md text-sm px-6 py-2 rounded-md cursor-pointer m-1"
                >
                  <div
                    className="income-color-bar rounded-full w-2 h-2 mr-2"
                    style={{ backgroundColor: income.color }}
                  ></div>

                  <span>
                    {" "}
                    <span className="mx-4">£{income.amount} </span>{" "}
                    <span className="pr-4">
                      {<FontAwesomeIcon icon={income.icon} />}
                    </span>{" "}
                    {income.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="col-span-3 grid  grid-cols-3 p-1 gap-1 rounded-md">
              <div
                className={`col-span-1 transition-all ${
                  highlight ? "bg-purple/15" : ""
                } rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer`}
              >
                <h2 className={`text-tahiti ${highlight ? "text-xl" : ""}`}>
                  {totalIncomeStreams}
                </h2>
                <p className="text-xs">Streams</p>
              </div>
              <div className="col-span-1 rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer">
                <h2 className="text-tahiti">28%</h2>
                <p className="text-xs">YTD</p>
              </div>
              <div className="col-span-1 rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer">
                <h2 className="text-tahiti">58%</h2>
                <p className="text-xs">To Goal</p>
              </div>
              <div className="col-span-1 rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer">
                <h2 className="text-tahiti">
                  <div
                    className="radial-progress text-xs radial-progress-xs"
                    style={{ "--value": 70 }}
                    role="progressbar"
                  >
                    70%
                  </div>
                </h2>
                <p className="text-xs">AUM</p>
              </div>
              <div className="col-span-2 rounded-md shadow-md text-center flex flex-col items-center justify-center ">
                <h2 className="text-tahiti">
                  <progress
                    className="progress text-tahiti bg-tahiti w-40"
                    value="30"
                    max="100"
                  ></progress>
                </h2>
                <p className="text-xs mt-2">Savings Over Expenses</p>
                <select className=" p-1 rounded-md mt-1 bg-white shadow-sm cursor-pointer">
                  <option disabled selected>
                    MTD
                  </option>
                  <option>YTD</option>
                  <option>QRT</option>
                  <option>ALL</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Income;
