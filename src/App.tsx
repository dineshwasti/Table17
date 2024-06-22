import { useState } from 'react'
import FormComponent from './FormComponent';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Survey Form</h1>
      <FormComponent />
    </div>
  );
}

export default App
