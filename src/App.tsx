import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import NotFound from "@/pages/NotFound.tsx";
import LayoutTemplate from "@/features/layout/LayoutTemplate.tsx";
import TodoPage from "@/pages/TodoPage.tsx";
import TodoTablePage from "@/pages/TodoTablePage.tsx";
import TodoCreationPage from "@/pages/TodoCreationPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import ProtectedRoute from "@/pages/ProtectedRoute.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<LayoutTemplate/>}>
                <Route index element={
                    <ProtectedRoute>
                        <TodoTablePage/>
                    </ProtectedRoute>
                }/>
                <Route path="todos/:id" element={
                    <ProtectedRoute>
                        <TodoPage/>
                    </ProtectedRoute>
                }/>
                <Route path="todos/create" element={
                    <ProtectedRoute>
                        <TodoCreationPage/>
                    </ProtectedRoute>
                }/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="about" element={<AboutPage/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
