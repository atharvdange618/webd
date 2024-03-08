import React from 'react'
import Products from './products'

function App() {
  return (
    <div className='w-full h-screen bg-zinc-900 p-4'>
      <div className='w-44 h-32 rounded-xl bg-red-600'>
        <h2 className='text-white font-bold p-4'>hello bhai kaise ho</h2>
      </div>
      <Products />
    </div>
  )
}

export default App