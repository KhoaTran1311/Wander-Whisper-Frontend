import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
        <main>
            <AppRoutes/>
        </main>
    </BrowserRouter>
  )
}

export default App
