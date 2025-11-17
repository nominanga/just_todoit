import {Outlet} from "react-router-dom";
import {Header} from "@/features/layout/header.tsx";
import {Footer} from "@/features/layout/footer.tsx";
import "./layout.css"

const LayoutTemplate = () => {
    return (
        <div className="page-content">
            <Header/>
            <main className="main-content">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default LayoutTemplate;