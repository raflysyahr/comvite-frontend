import { jwtDecode } from "jwt-decode";
import { useState , useMemo } from "react";
import { useCookies } from "react-cookie";

export default function useUser(){
    const [cookies,setCookie,removeCookie] = useCookies(['oauth-token']);
    const [user,_setUser]  = useState(null)

    useMemo(()=>{
        if(cookies["oauth-token"]){
            _setUser(jwtDecode(cookies["oauth-token"]).token)
        }
    },[])

    const removeUser = ()=>{
        removeCookie('oauth-token')
    }

    const setUser = (value)=> {
        const date = new Date()
        date.setTime(
            date.getTime() + ( (1000*60*60) * 24 )    
        )
        
        setCookie('oauth-token',value,{
            expires:date,
            secure:true,
            httpOnly:true
        })
    }

    return [user,setUser,removeUser]
}