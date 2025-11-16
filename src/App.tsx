import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import NotFound from "@/pages/NotFound.tsx";
import LayoutTemplate from "@/features/layout/LayoutTemplate.tsx";
import TodoPage from "@/pages/TodoPage.tsx";
import TodoTablePage from "@/pages/TodoTablePage.tsx";
import TodoCreationPage from "@/pages/TodoCreationPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<LayoutTemplate/>}>
                <Route index element={<TodoTablePage/>}/>
                <Route path="todos/:id" element={<TodoPage/>}/>
                <Route path="todos/create" element={<TodoCreationPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
