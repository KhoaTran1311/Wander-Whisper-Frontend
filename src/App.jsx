import {BrowserRouter} from "react-router-dom";
import { useState } from 'react'
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <main>
            <AppRoutes/>
        </main>
    </BrowserRouter>
  )
}

export default App
