
import { Provider, useDispatch } from "react-redux";

import { BrowserRouter ,Route , Routes, useLocation, useNavigate } from "react-router-dom";
import Navigation from '../components/Navigation'
import Router from "./Router";
import axios from 'axios'
import { useEffect , useState , createContext, useContext} from "react";
import config from "../config/www.config";
import PaginationProvider from "../components/pagination/PaginationProvider";
import className from "../utils/className";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";


const availabelNavigation = ['/library','/','/favorite','/history','/profile']

const NavigationBarContext = createContext()
export const useNavigationBar = ()=> (useContext(NavigationBarContext))

export default function Routing(){
    
    
    const dispatch = useDispatch()
    const [pathname,setPathname] = useState(location.pathname)
    const [cookies] = useCookies(['user']);

    const goTo = (path,option,navigate)=> (setPathname(path),navigate(path,option))

    useEffect(() => {
        
        const URL_ =  {
            all:'http://localhost:8000/api/v1/product/comics',
            popular:'http://localhost:8000/api/v1/product/comics/popular',
            lastupdate:'http://localhost:8000/api/v1/product/comics/lastupdate'
        }

        const axiosX = axios.create({
            withCredentials:true
        })
        
        async function fetching(){
            try{

                const responseAll = await axiosX.get(URL_.all)
                

                if(responseAll.status === 200) {
    
                    const data = responseAll.data.data
    
                    dispatch({ type:config.redux.comic.comic, payload:data })
                    dispatch({ type:config.redux.comic.history_comic, payload:data })
                    
                    const responsePopular = await axiosX.get(URL_.popular);

                    if(responsePopular.status === 200) dispatch({ 
                        type:config.redux.comic.popular_comic, 
                        payload: responsePopular.data.data})
                    
                    
                    const responseLastupdate = await axiosX.get(URL_.lastupdate)
                    if(responseLastupdate.status === 200) dispatch({ 
                        type:config.redux.comic.last_updated_comic, 
                        payload: responseLastupdate.data.data})

                    return;
                }
    
                if(responseAll.status === 307) return window.history.pushState(null, null,'/profile')

            }catch(error){
                console.log(error.message)
                return error.message
            }
        }

        if(cookies.user){
            fetching()
        }
    

        return () => {};
    }, []);


    return (
        <BrowserRouter>
            <NavigationBarContext.Provider value={{ goTo }}>
                <PaginationProvider>
                    <div className="w-full h-screen bg-white overflow-hidden">
                        <div id="body" className={className("overflow-scroll hide-scrollbar",
                        availabelNavigation.some((s)=> s === pathname) ?"h-[93%]" : "h-[100%]")}>
                            <Router/>
                        </div>
                        {availabelNavigation.some((s)=> s === pathname) && <Navigation/>}
                    </div>
                </PaginationProvider>
            </NavigationBarContext.Provider>
        </BrowserRouter>
    )
}
