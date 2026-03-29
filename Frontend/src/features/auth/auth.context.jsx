import { createContext,useState,useEffect} from "react"; 
import { getUserProfile } from "./services/auth.api";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    useEffect(()=>{
        const getAndSetUser = async() => {
            const data = await getUserProfile();
            setUser(data.user);
            setLoading(false);
        }
    },[])
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    return(
        <>
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}