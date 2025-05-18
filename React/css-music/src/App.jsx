import React, { useState } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import './App.css'

const App = () => {

  const data = [
    {
      image: "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Legends are made",
      artist: "Atharv",
      added: false
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1682175064657-d2c4fd9f095a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "I'm a gamer",
      artist: "Kamlesh",
      added: false
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1682595142263-80143c15f68f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Wires in veins",
      artist: "Suraj",
      added: false
    },
    {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Yamete kudasai",
      artist: "Pavan",
      added: false
    },
    {
      image: "https://images.unsplash.com/photo-1593698054590-a5b3a19565a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Bokachoda",
      artist: "Ishwar",
      added: false
    },
  ]

  const [songData, setSongData] = useState(data);

  const handleClick = (id) => {
    setSongData((prev) => {
      return prev.map((item, index) => {
        if (index === id) return { ...item, added: !item.added }
        return item
      })
    })
  }
  return (
    <div className=' w-full h-screen bg-zinc-300'>
      <Navbar data={songData} />
      <div className='px-20 flex flex-wrap gap-4 mt-10'>
        {
          songData.map((obj, id) => (
            <Card data={obj} key={id} id={id} handleClick={handleClick} />
          ))
        }
      </div>
    </div>
  )
}

export default App