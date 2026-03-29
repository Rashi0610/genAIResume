import {createBrowserRouter} from "react-router-dom"
import Login from "./features/auth/pages/login.jsx"
import Register from "./features/auth/pages/register.jsx"
import Protected from "./features/auth/components/protected.jsx";

const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><h1>Home pageee</h1></Protected>
    }
])

export default router;  