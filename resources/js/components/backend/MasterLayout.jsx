import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
export default function MasterLayout({children}){
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <RightSidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}