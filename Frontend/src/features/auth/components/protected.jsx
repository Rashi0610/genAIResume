import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hookss/useAuth.js";

const Protected = ({children}) => {
    const {loading,user} = useAuth();
    const navigate = useNavigate();

    
    if(!user){
        navigate("/login")
    }

    return children;
}

export default Protected;