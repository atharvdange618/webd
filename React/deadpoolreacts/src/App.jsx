import React from 'react'
import Hero from './hero'
import Hello from './hello'
import Card from './card'
import Product from './products'

function App() {
  return (
    <div className='w-full h-screen bg-zinc-900 text-white'>
      <Hero />
      <Hello name="Atharv" />
      <Card />
      <Product age="25" data={{ "name": "Atharv", "surname": "Dange" }} />
    </div>
  )
}

export default App