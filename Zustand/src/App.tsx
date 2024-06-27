import './App.css'
import { useCounterStore } from './store'

const App = () => {
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const count = useCounterStore((state) => state.count)

  return (
    <div>
      {count}
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  )
}

export default App