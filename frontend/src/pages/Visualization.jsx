import React, { useEffect } from 'react';

const VisualizationPage = () => {
  useEffect(() => {
    // Visualization logic
  }, []);

  return <div id="visualization" className='p-4 w-3/4 m-auto gap-5 flex flex-col mt-10 text-center'>
    <h1>Visualization</h1>
    <ul className='flex flex-col gap-5'>
      <li>Visualization 1</li>
      <div className='w-full h-48 bg-gray-300 rounded-lg text-center p-10'>placeholder </div>
      <li>Visualization 2</li>
      <div className='w-full h-48 bg-gray-300 rounded-lg text-center p-10'>placeholder </div>
      <li>Visualization 3</li>
      <div className='w-full h-48 bg-gray-300 rounded-lg text-center p-10'>placeholder </div>
    </ul>
  </div>;
};

export default VisualizationPage;