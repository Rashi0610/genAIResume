import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hookss/useAuth.js";

const Protected = ({children}) => {
    const {loading,user} = useAuth();
    const navigate = useNavigate();

    if(loading){
        return (<main><h1>Loading....</h1></main>)
    }
    if(!user){
        navigate("/login")
    }

    return children;
}

export default Protected;