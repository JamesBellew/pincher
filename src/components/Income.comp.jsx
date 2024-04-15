import React, { useEffect, useRef, useState } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPencil } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, LineElement, PointElement } from 'chart.js';



import '../App.css';
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

function Income({ incomeArray, onAddIncome ,onEditIncome,onNotif, incomeHistoryArray,onAddIncomeHistory,newlyAddedId}) {


  const chartRef = useRef(null);
  const [totalIncomeFigure,setTotalIncomeFigure] = useState(0)
  const [totalIncomeStreams,setTotalIncomeStreams] = useState(0)
  const [legendItems, setLegendItems] = useState([]);
  const chartInstance = useRef(null); // Use this ref to keep track of the chart instance
  const [incomeSectionNav,setIncomeSectionNav] = useState('overview')//this the usestate for the navigation for the income right hand side grid, it navigates between the overview and the history components. the two key words for valeus are overview and history
const [newIncomeName,setNewIncomeName]=useState('test')
const [newIncomeAmount,setNewIncomeAmount]=useState(0)
const [isFormValid, setIsFormValid] = useState(false);
const [isEditIncomeModalActive,setIsEditIncomeModalActive] = useState(false)
const [incomeSelectedForEdit,setIncomeSelectedForEdit] = useState()
const [highlight, setHighlight] = useState(false);


 // Toggle modal visibility
 const toggleModal = () => setIsEditIncomeModalActive(!isEditIncomeModalActive);

 const [IncomeEditValue, setIncomeSelectedEditValue] = useState(12500); // Set the initial value

 const handleChange = (e) => {
  setIncomeSelectedEditValue(e.target.value); // Update state with new value
 };
  // Validation check function
  const validateForm = () => {
    return newIncomeName.trim() !== '' && parseFloat(newIncomeAmount) > 0;
  };
  
const incomeClickHandler=(income)=>{
  setIncomeSelectedForEdit(income)
  setIncomeSelectedEditValue(income.amount)
  setIsEditIncomeModalActive(!isEditIncomeModalActive)


}
const saveIncomeEditHandler=()=>{
  setIsEditIncomeModalActive(!isEditIncomeModalActive)
  onNotif({title:"Income Changed",message:'Changed the figure of ' + incomeSelectedForEdit.name + " from £" + incomeSelectedForEdit.amount + " to £" + IncomeEditValue})
  onEditIncome(incomeSelectedForEdit.id, +IncomeEditValue);
  onAddIncomeHistory( {incomeName:incomeSelectedForEdit.name,
  date:'17/05/2024',
  figureChange:+IncomeEditValue-incomeSelectedForEdit.amount})
  
}

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNewIncomeName(value);
    } else if (name === 'amount') {
      setNewIncomeAmount(value);
    }
      // Check if form is valid after the update
      setIsFormValid(validateForm());
  };

  const handleSubmit = () => {
    const newIncomeData = {
      name: newIncomeName,
      // Convert amount to a number to ensure correct addition
      amount: +newIncomeAmount,
      color: '#1a8ec7',
      icon: '&#x1F4B8;'
    };
    const modal = document.getElementById('my_modal_1');
    if (modal) modal.close(); // This will close the modal
  
    // Call the onAddIncome function passed down as prop, without an id
    onAddIncome(newIncomeData);
    onNotif({title:"New Income Added",message:'Name : ' + newIncomeName  + " Amount : £" + newIncomeAmount })
  };

  useEffect(()=>{
    console.log('==================================== child');
  console.log(newlyAddedId);
  console.log('====================================');
  },[newlyAddedId])




  
  useEffect(()=>{
    const totalAmount = incomeArray.reduce((accumulator, currentItem) => accumulator + currentItem.amount ,0);
    setTotalIncomeFigure(totalAmount)

  },[incomeArray])

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
    const ctx = chartRef.current.getContext('2d');

    const incomeLabels = incomeArray.map(income => income.name);
    const incomeAmounts = incomeArray.map(income => income.amount);
    const colors = incomeArray.map(() => `hsl(${Math.random() * 360}, 100%, 75%)`);

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: incomeLabels,
        datasets: [{
          data: incomeAmounts,
          backgroundColor: colors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Disable the default legend
          }
        },
      },
    });

    // Generate custom legend items
    const newLegendItems = chart.data.labels.map((label, index) => ({
      text: label,
      color: chart.data.datasets[0].backgroundColor[index],
      value: chart.data.datasets[0].data[index] // Include the value
    }));
    setLegendItems(newLegendItems);

    return () => chart.destroy();
  }, [incomeArray]);

const editIncomeItem=(income)=>{
  
}

//this belkow components is the legend for the barcart/ the overview components which has a brewakdown of everythign withn the income array.
function OverviewComponent(){
return  <ul className='text-xs ps-2 p-3'>
{legendItems.map((item, index) => (
  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: item.color, marginRight: '10px',borderRadius:'10px' }}></span>
   £{`${item.value}: ${item.text}`} {/* Display name and value */}
  </li>
))}
</ul>

}
function OverallComponent() {
  const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
          {
              label: 'Savings',
              data: [1000, 2500, 3200, 5000, 6500],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              borderRadius: 20,  // Enhanced border radius
              borderSkipped: false,
          }
      ],
  };

  const options = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Monthly Savings Data',
          },
      },
      scales: {
          y: {
              beginAtZero: true
          }
      }
  };

  return <Bar data={data} options={options} />;
}

function LineChartComponent() {
  const data = {
      labels: ['January', 'February', 'March', 'April', 'May','June','July'],
      datasets: [
          {
              label: 'Growth',
              data: [2500, 2950, 3200, 4250, 5000,5500, 8500],
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              tension: 0.4 // Adjust this value for different interpolation (0 for straight lines)
          }
      ]
  };

  const options = {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  };

  return <Line data={data} options={options} />;
}

// function OverallComponent(){
//   return <h1>Overall Component</h1>
  
//   }
const modalNavClickHandler = ()=>{
  console.log('====================================');
  console.log("clcick ya boya");
  console.log(incomeSelectedForEdit.id);
  console.log('====================================');
  setIncomeSelectedForEdit(incomeArray[incomeSelectedForEdit.id+1])
}
  function OverallComponent() {
    const data = {
        labels: ['January', 'February', 'March', 'April','May'],
        datasets: [
            {
                label: 'Savings',
                data: [1000, 2500, 3200, 5000,6500],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 5,  // Set border radius here
                borderSkipped: false,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
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
        className={`text-xs px-2 transition-all transition-opacity duration-700 ease-in-out ${historyItem.id === newlyAddedId ? 'bg-white/10 rounded-md p-1' : ''}`} // Apply text-purple if this is the newly added item
        key={index}
      >
        {historyItem.date + ": "}
        <span className={historyItem.figureChange >= 0 ? 'text-purple' : 'text-tahiti'}>
          {historyItem.figureChange >= 0 ? ` £${historyItem.figureChange}` : ` -£${Math.abs(historyItem.figureChange)}`}
        </span>
        <span className='text-center'> {historyItem.incomeName}</span>
      </li>
      ))}
    </ul>
  );
}

const renderComponent = () => {
  if (incomeSectionNav === 'overview') {
    return <OverviewComponent />;
  } else if (incomeSectionNav === 'overall') {
    return <OverallComponent />;
  }
  else if (incomeSectionNav === 'chart') {
    return <LineChartComponent />;
  }
  
  else {
    return <ActivityComponent />;
  }
};
const incomeNavClickHandler=(section)=>{
setIncomeSectionNav(section)
}
  return (
    <>

  <div className="md:h-[80vh] h-[85vh] px-4 bg-base-200 shadow-md col-span-4 md:col-span-4 rounded-md">
    
<div className='grid grid-cols-2 mx-auto gap-1 h-full grid-rows-8 '>
<div className='relative col-span-2  row-span-1'>
  {/* <span className='absolute text-xl font-bold mt-2 text-navy-dark-1'>Income</span> */}
  <div className='mx-auto text-center '>
    <br></br>
<span className='text-center text-xl font-bold mt-5    light:text-navy-dark-1 relative '>£{totalIncomeFigure}</span>
</div>

</div>
<div className='dark:bg-base-200 bg-white row-span-4 m-4 mx-auto rounded-md'>
            {/* Chart.js Graph will be rendered inside this canvas */}
            <canvas ref={chartRef}></canvas>
          </div>
<div className='dark:bg-base-200 bg-white row-span-4  m-4 rounded-md overflow-auto'>

<div className="overflow-x-auto overflow-y-scroll always-show-scrollbar ">
  <div className='grid grid-cols-4 grid-rows-1 p-4'>
<button onClick={()=>{incomeNavClickHandler('overview')}}  className={`col-span-1 btn  ${incomeSectionNav ==='overview' ? "btn-neutral" : "btn-ghost"} btn-xs `}>Overview</button>
<button onClick={()=>{incomeNavClickHandler('overall')}} className={`col-span-1 btn  ${incomeSectionNav ==='overall' ? "btn-neutral" : "btn-ghost"} btn-xs `}>Overall</button>
<button onClick={()=>{incomeNavClickHandler('chart')}} className={`col-span-1 btn  ${incomeSectionNav ==='chart' ? "btn-neutral" : "btn-ghost"} btn-xs `}>Chart</button>
<button onClick={()=>{incomeNavClickHandler('history')}} className={`col-span-1 btn  ${incomeSectionNav ==='history' ? "btn-neutral" : "btn-ghost"} btn-xs `}>History</button>

  </div>
{

//consitionaly rendering the overview/history components based on the users selection on above nav


renderComponent()
}



  

</div>


</div>

{isEditIncomeModalActive && (
  <>
    <div onClick={incomeClickHandler} className='fixed inset-0 w-full h-full bg-base-200/75 flex items-center justify-center z-50'>
      {/* Stop propagation onClick inside the modal content to prevent the backdrop handler from firing */}
      <div className='bg-base-100  text-center p-16 m-4 rounded-md text-white w-auto max-w-lg mx-auto ' onClick={(e) => e.stopPropagation()}>


      {incomeArray.map((income) => (
    <div className='inline-block bg-base-300 w-5 h-2 mx-1 mb-5'>
    </div>
  ))}
<br></br>
  <button className='bg-tahiti p-2 rounded-md ' onClick={modalNavClickHandler}>Next</button>
  <br></br>
  <br></br>
        <p className='border-b-tahiti p-1 border-b-2'>{incomeSelectedForEdit.name}</p>
   
        <input
      type="number"
      value={incomeSelectedForEdit.amount} // Bind state to input
      onChange={handleChange} // Handle changes
      className="input text-center mt-5 input-bordered  max-w-xs my-2"
      min={0} // Minimum value
      step={100} // Step value
    />
    <br></br>
        <button className='btn btn-purple bg-purple text-white mt-12 mr-5' onClick={saveIncomeEditHandler}>Save</button>
        <button className='btn btn-base-200 mt-5' onClick={incomeClickHandler}>Close</button>
        {/* Add more content or buttons here */}
      </div>
    </div>
  </>
)}



<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add New Income</h3>
    <br></br>
    <label className="input input-bordered flex items-center gap-2">
  Name :
  <input type="text" name='name' className="grow" placeholder="Side Hustle" onChange={handleInputChange}  />
</label>
<label className="input input-bordered flex items-center gap-2">
  Amount :
  <input type="number" name='amount' className="grow" placeholder="1" onChange={handleInputChange}  />
</label>
<select className="select select-bordered w-full">
      <option disabled selected>Choose a Color</option>
      
      <option className='border-l-2 border-purple' style={{ backgroundColor: '#6B7280', color: '#FFFFFF' }}>Grey</option>
      <option style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}>Red</option>
      <option style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>Green</option>
    </select>
    <select className="select select-bordered w-full">
      <option disabled selected>Choose a Icon</option>

      <option className='border-l-2 border-purple' style={{ backgroundColor: '#6B7280', color: '#FFFFFF' }}>
        
      &#9762;
        
        
        </option>
      <option style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}>Red</option>
      <option style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>Green</option>
    </select>
    <div className="modal-action">
      <button onClick={handleSubmit}
      
      disabled={!isFormValid}

      className={`${
        isFormValid ? 'bg-primary' : 'bg-gray-400 disabled'
      } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >Add</button>
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
{/*= <div className='grid mx-9 bg-tahiti'>
  <div className='mb-2'>
<button onClick={()=>document.getElementById('my_modal_1').showModal()} className=' bg-white shadow-md px-4 mx-2 rounded-md'> <FontAwesomeIcon icon={faPlus} /></button>
<button className='px-4 bg-white shadow-md mx-1 rounded-md'><FontAwesomeIcon icon={faPencil} /></button>
<button className='px-4 bg-silver mx-1'></button>


  </div>

</div> */}
<div className='col-span-2 grid grid-cols-8 row-span-4 overflow-auto mb-7'>

<button onClick={()=>document.getElementById('my_modal_1').showModal()} className='absolute w-7 h-7 translate-y-[-10px] rounded-full bg-tahiti text-center text-white'>+</button>
<ul

className='px-2 overflow-y-scroll col-span-5  always-show-scrollbar text-left'>

  {incomeArray.map((income) => (
    <li  
    onClick={()=>{incomeClickHandler(income)}}
    key={income.id} className='flex items-center bg-slate-100 shadow-md text-sm px-6 py-2 rounded-md cursor-pointer m-1'>
      <div className='income-color-bar bg-tahiti rounded-lg w-10 h-1 mr-2'></div>
      <span> <span className='mx-4'>£{income.amount} </span> <span className='pr-4'>-</span>  {income.name}</span>
    </li>
  ))}
  
</ul>
<div className='col-span-3 grid  grid-cols-3 p-1 gap-1 rounded-md'>
<div className={`col-span-1 transition-all ${highlight ? 'bg-purple/15' : ''} rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer`}>
<h2 className={`text-tahiti ${highlight ? 'text-xl' : ''}`}>{totalIncomeStreams}</h2>
            <p className="text-xs">Streams</p>

</div>
<div className='col-span-1 rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer'>
<h2 className='text-tahiti'>28%</h2><p className='text-xs'>YTD</p></div>
<div className='col-span-1 rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer'> 
<h2 className='text-tahiti'>58%</h2><p className='text-xs'>To Goal</p></div>
<div className='col-span-1 rounded-md shadow-md text-center flex flex-col items-center justify-center cursor-pointer'> 
<h2 className='text-tahiti'>
  <div className="radial-progress text-xs radial-progress-xs" style={{"--value":70}} role="progressbar">70%</div>
  </h2><p className='text-xs'>AUM</p></div>
<div className='col-span-2 rounded-md shadow-md text-center flex flex-col items-center justify-center '>
<h2 className='text-tahiti'><progress className="progress text-tahiti bg-tahiti w-40" value="30" max="100"></progress></h2><p className='text-xs mt-2'>Savings Over Expenses</p>
<select className=" p-1 rounded-md mt-1 bg-white shadow-sm cursor-pointer">
  <option disabled selected>MTD</option>
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
  )
}

export default Income
