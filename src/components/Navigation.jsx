import { useEffect, useMemo, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { AiFillBook , AiOutlineHistory} from 'react-icons/ai';
import { MdFavorite } from 'react-icons/md';
import { RiShieldUserFill , RiBarChartLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';


const className = (...classes)=> classes.filter(Boolean).join(' ');

const navigation = [
    {
        index:1,
        label:"Home",
        icon:HiHome,
        destination:'/'
    },
    {
        index:2,
        label:"Library",
        icon:AiFillBook,
        destination:'/library'
    },
    {
        index:3,
        label:"History",
        icon:AiOutlineHistory,
        destination:'/history'
    },
    {
        index:4,
        label:"Favorite",
        icon:MdFavorite,
        destination:'/favorite'
    },
    {
        index:5,
        label:"Profile",
        icon:RiShieldUserFill,
        destination:'/profile'
    },
]






export default function Navigation(){
    const  navigate  = useNavigate() 

    const [activeNav,setActiveNav] = useState(location.pathname);


    const navigationMemo = useMemo(()=> (
        <div className={className(
                "inter relative w-full h-[45px]  duration-700 bg-white flex items-center justify-center"
            )}>
            
            <div className="flex gap-2 px-2 justify-between">

                {
                    navigation.map((e,i)=>{

                        return (
                            <span
                            onClick={()=> (setActiveNav(e.destination),navigate(e.destination,{ replace:true }))}
                            key={i} className={className(
                                "h-[35px] cursor-pointer duration-700 items-center flex gap-2 px-2 rounded-full",
                                e.destination === activeNav ? "bg-blue-500 text-white w-[6em] swith-navigation-onn" : "w-[50px] bg-white swith-navigation-offf"
                            )}>
                                <e.icon/> {e.destination === activeNav && e.label} 
                            </span>
                        )
                    })
                }

            </div>
        </div>
    ),[activeNav]);


    return (
        <>
            {navigationMemo}
        </>
    )
}