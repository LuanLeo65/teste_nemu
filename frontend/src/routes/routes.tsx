import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JourneyPage from "../pages/journeys"

export function Routers(){
    return(
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<JourneyPage />}/>
                </Routes>
            </div>
        </Router>
    )
}