import './App.css';
import Icon from '@mdi/react';
import { mdiFountainPenTip, mdiViewList } from '@mdi/js';
import { useState, useEffect } from 'react';

function App() {

  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false)

  const handleCloseOffcanvas = () => {
    if (isOffcanvasVisible)
      setIsOffcanvasVisible(false)
  }

  return (
    <>
      <header onClick={handleCloseOffcanvas} className='flex items-center justify-between px-8 py-4'>
        <div className='flex items-center'>
          <Icon className='text-yellow-100'
            path={mdiFountainPenTip}
            size={2} />
          <h1 className='text-zinc-100 text-3xl'>Take Note</h1>
        </div>
        <button
          onClick={() => setIsOffcanvasVisible(!isOffcanvasVisible)}>
          <Icon className='p-2 rounded bg-slate-500 text-zinc-100 hover:bg-slate-400 transition-all ease-linear'
            path={mdiViewList}
            size={2}
          />
        </button>
      </header>
      <main onClick={handleCloseOffcanvas}>
        <div className={`absolute top-0 right-full ${isOffcanvasVisible ? 'translate-x-full' : ''} z-50 overflow-x-hidden bg-green-600 w-1/4 h-full transition-all duration-300 ease-in-out`}>
          <h1>testing</h1>
        </div>
      </main>
    </>
  );
}

export default App;
