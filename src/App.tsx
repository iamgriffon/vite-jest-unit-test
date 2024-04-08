import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/users/2')
    .then(res => setInput(res.data?.firstName));
  }, []);

  return (
    <main className='flex flex-col gap-4 p-4'>
      <h1 className='font-sans text-center text-lg font-bold'>Salve</h1>
      <div className='text-center text-lg'>
        <input
          type="text"
          name="input"
          data-testid="input-text"
          value={input}
          className='rounded-sm border-black p-4 text-base outline'
          placeholder='Insert text'
          onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <button 
        data-testid="increase"
        className='flex items-center justify-center border-2 border-black h-8 w-8'
        onClick={() => setCount(prevState => prevState - 1)}>
          -
        </button>
        <span className="text-sm" data-testid="counter">
          {count}
        </span>
        <button
        data-testid="decrease"
        className='flex items-center justify-center border-2 border-black h-8 w-8' 
        onClick={() => setCount(prevState => prevState + 1)}>
          +
        </button>
      </div>

    </main>
  )
}

export default App
