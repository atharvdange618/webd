import React, { useState } from 'react'
import Products from './products'

function App() {
  var [a, b] = useState(69);
  return (
    <div className=' w-full h-screen bg-zinc-900 text-white p-5'>
      <h1>{a}</h1>
      <button onClick={() => b(a + 1)} className='px-3 py-1 bg-green-500 rounded-md text-sm'>click</button>
      <Products age="21" data ={{name:"Atharv", surname:"Dange"}} />
    </div>

  )
}

export default App