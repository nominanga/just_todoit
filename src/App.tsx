import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={null}>
                <Route index element={null}/>
                <Route path="todos/:id" element={null}/>
                <Route path="login" element={<LoginPage/>}/>
            </Route>
            <Route path="*" element={null}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
