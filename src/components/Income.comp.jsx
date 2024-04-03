import React, { useEffect, useRef, useState } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPencil } from '@fortawesome/free-solid-svg-icons';



import '../App.css';

Chart.register(PieController, ArcElement, Tooltip, Legend);

function Income({ incomeArray }) {
  const chartRef = useRef(null);
  const [totalIncomeFigure,setTotalIncomeFigure] = useState(0)
  const [legendItems, setLegendItems] = useState([]);
  const chartInstance = useRef(null); // Use this ref to keep track of the chart instance
  const [incomeSectionNav,setIncomeSectionNav] = useState('overview')//this the usestate for the navigation for the income right hand side grid, it navigates between the overview and the history components. the two key words for valeus are overview and history


  useEffect(()=>{
    const totalAmount = incomeArray.reduce((accumulator, currentItem) => accumulator + currentItem.amount ,0);
    setTotalIncomeFigure(totalAmount)

  },[incomeArray])
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
//this belkow components is the History for the user/ the overview components which has a brewakdown of recent activity within the income/expenses array.
function ActivityComponent(){
  return   <table className="table table-xs ">
  <thead>
    <tr>
      <th>Date</th>
      <th></th>
    </tr>
  </thead>
  <tbody className='text-xs'>
    <tr>
      <td>13/12/23</td>
      <td>£2500 - Bank Account</td>
    </tr>
    <tr>
      <td>12/12/21</td>
      <td>£1500 - Credit Union</td>
    </tr>

    <tr>
      <td>12/12/21</td>
      <td>£1500 - Credit Union</td>
    </tr> 
    <tr>
      <td>12/12/21</td>
      <td>£1500 - Credit Union</td>
    </tr> 
    <tr>
      <td>12/12/21</td>
      <td>£1500 - Credit Union</td>
    </tr> 
  </tbody>
</table>
}

const incomeNavClickHandler=(section)=>{
setIncomeSectionNav(section)
}
  return (
    <>

  <div className="md:h-[75vh] h-[80vh] px-4 bg-white shadow-md col-span-2 md:col-span-1 rounded-md">
    
<div className='grid grid-cols-2 mx-auto gap-1 h-full grid-rows-8 '>
<div className='relative col-span-2  row-span-1'>
  {/* <span className='absolute text-xl font-bold mt-2 text-navy-dark-1'>Income</span> */}
  <div className='mx-auto text-center '>
    <br></br>
<span className='text-center text-xl font-bold mt-5 text-navy-dark-1 relative '>£{totalIncomeFigure}</span>
</div>

</div>
<div className='bg-white row-span-4 m-4 mx-auto rounded-md'>
            {/* Chart.js Graph will be rendered inside this canvas */}
            <canvas ref={chartRef}></canvas>
          </div>
<div className='bg-white row-span-4  m-4 rounded-md overflow-auto'>

<div className="overflow-x-auto overflow-y-scroll always-show-scrollbar ">
  <div className='grid grid-cols-2 grid-rows-1 p-4'>
<button onClick={()=>{incomeNavClickHandler('overview')}}  className={`col-span-1 btn  ${incomeSectionNav ==='overview' ? "btn-neutral" : "btn-ghost"} btn-xs `}>Overview</button>
<button onClick={()=>{incomeNavClickHandler('history')}} className={`col-span-1 btn  ${incomeSectionNav ==='history' ? "btn-neutral" : "btn-ghost"} btn-xs `}>History</button>

  </div>
{

//consitionaly rendering the overview/history components based on the users selection on above nav


incomeSectionNav === 'overview'?(
  <OverviewComponent/>
):(
  <ActivityComponent/>
)
}



  

</div>


</div>


<div className='col-span-2 row-span-3 overflow-auto mb-7'>
<div className='grid mx-9  col-span-4'>
  <div className='mb-2'>
<button onClick={()=>document.getElementById('my_modal_1').showModal()} className=' bg-white shadow-md px-4 mx-2 rounded-md'> <FontAwesomeIcon icon={faPlus} /></button>
<button className='px-4 bg-white shadow-md mx-1 rounded-md'><FontAwesomeIcon icon={faPencil} /></button>
<button className='px-4 bg-silver mx-1'></button>
{/* the below is the modal for adding a new income stream */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add New Income</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  </div>

</div>
<ul className='px-10 overflow-y-scroll always-show-scrollbar text-left'>

  {incomeArray.map((income) => (
    <li key={income.id} className='flex items-center bg-slate-100 shadow-md text-sm px-6 py-2 rounded-md cursor-pointer m-1'>
      <div className='income-color-bar bg-navy-dark-1 rounded-lg w-10 h-1 mr-2'></div>
      <span> <span className='mx-4'>£{income.amount} </span> <span className='pr-4'>-</span>  {income.name}</span>
    </li>
  ))}
  
</ul>
{/* <div className='w-7 h-7 absolute bg-primary text-white rounded-full  text-center my-auto  cursor-pointer'>

  <p>+</p>
</div> */}

</div>







</div>

  
    
    
    </div>
 
    </> 
  )
}

export default Income
