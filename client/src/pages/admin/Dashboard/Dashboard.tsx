import React from 'react';
import Statistic from '../../../components/Statistic';

const Dashboard = () => {
  
  
  return (
    <>
    <h1 className='text-2xl p-2'>Dashboard</h1>
    <div className='grid grid-cols-2 items-center gap-4'>
      <div>
        <Statistic/>
      </div> 
    </div>
    </>
  );
}


export default Dashboard