import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={null}>
                <Route index element={null}/>
                <Route path="todos/:id" element={null}/>
            </Route>
            <Route path="login" element={null}/>
            <Route path="*" element={null}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
