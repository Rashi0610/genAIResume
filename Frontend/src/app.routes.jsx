import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/login.jsx"
import Register from "./features/auth/pages/register.jsx"
import Protected from "./features/auth/components/protected.jsx"
import Landingpage from "./features/Landing/Landingpage.jsx"
import InterviewPage from "./features/interview/interviewpage.jsx"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Landingpage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/interview",
        element: <Protected><InterviewPage /></Protected>
    }
])

export default router;