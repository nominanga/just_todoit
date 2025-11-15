import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import ExampleComponent from "./ExampleComponent.tsx";
import OutletPage from "./OutletPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<OutletPage/>}>
                <Route index element={<ExampleComponent value={"index"}/>}/>
                <Route path="todos/:id" element={<ExampleComponent value={"todo"}/>}/>
            </Route>
            <Route path="login" element={<ExampleComponent value={"login"}/>}/>
            <Route path="*" element={null}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
