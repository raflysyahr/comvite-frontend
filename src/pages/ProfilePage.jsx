import {Helmet} from 'react-helmet';
import SectionPage from "../components/SectionPage";
import { useEffect, useState } from 'react';
import className from '../utils/className';
import ProfileTabs from '../components/profile/ProfileTabs';
import Oauth from '../components/profile/Oauth';
import { FiUser } from 'react-icons/fi';

import Roles from '../utils/Roles';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { onSignout } from '../lib/oauth';

export default function ProfilePage(){
    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies(['oauth-token','user']);
    const [user,setUser] = useState(null);
    
    const [tab,setTab] = useState(1);
    const [showAlertLogout,setShowAlertLogout] = useState(false)
    const [showPopupOauth,setShowPopupOauth] = useState(false);

    const ChangeTab = (t)=> setTab(t)
    
    const logout = async()=>{

        const result = await onSignout()
        if(result.error){
          console.log("Result Signout:error",result.status)
          setShowAlertLogout(false);

          return false
        }

        console.log('Result Signout:success',result)
        setShowAlertLogout(false);
        return true

    }

    useEffect(()=>{ 

        
        if(showAlertLogout === false || showPopupOauth === false){
            if(cookies.user){
                setUser(cookies.user)
            }else{
                setUser(null)
            }
        }
        
        return ()=>{}
     },[showPopupOauth,showAlertLogout])


    return (
        <>
            <Helmet>
                <title>Heavenly Profile</title>
            </Helmet>

            <SectionPage>
                <div className="inter w-full h-[100vh] hide-scrollbar flex lg:flex-row flex-col overflow-scroll">
                    <div className="w-full lg:max-w-[250px] h-fit lg:h-full lg:border-b-0 border-b-[1px] pb-5 bg-white lg:border-r-[1px]">
                        
                        <div className='flex justify-between items-center py-2'>
                            <div></div>
                            <button onClick={()=> setShowAlertLogout(true)} className="text-sm text-white bg-red-300 w-[30px] h-[30px] flex items-center justify-center rounded-md">
                                <AiOutlineLogout/>
                            </button>
                        </div>
                        <div className='w-full min-h-[250px] flex flex-col items-center justify-center'>
                            <div style={{boxShadow:'0 0 2px blue'}} className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center">
                                <FiUser className='text-[60px]'/>
                            </div>
                            {user && <div className="mt-2">{user.username}</div>}
                        </div>
                        {
                            user && 
                            <>
                                <div className='px-3'>
                                    <h1>{user.name}</h1>
                                    <small className='flex gap-2 items-center'>{Roles(user.role)}</small>
                                </div>
                            </>
                        }
                        
                    
                        
                    </div>
                    <div className=' w-full h-full'>
                        <div className="flex lg:w-[300px]">{
                            ['History','Bookmark','Downloads'].map((e,i)=>(
                                <button key={i} onClick={()=> ChangeTab(i+1)} className={
                                    className(
                                        'w-full h-[50px] duration-700 border-b-[1px]',
                                        tab === i+1 ? "border-blue-500" :'border-white'
                                    )
                                }>{e}</button>
                            ))
                        }
                        </div>
                        <div className='w-full h-[630px]'>
                            
                        {
                            user ?
                                <ProfileTabs tab={tab} />
                            :
                                <div className='w-full h-full bg-white flex items-center justify-center flex-col'>
                                    <p>Kamu belum login!</p>
                                    <button onClick={()=> setShowPopupOauth(true)} className="px-3 py-2 bg-blue-400 text-white text-sm mt-2 rounded-md">Masuk</button>
                                </div>
                        }
                            
                        </div>
                    </div>
                </div>
                
                <div id="popup-logout" className={className(
                    "fixed  top-0 left-0 right-0 bottom-0 bg-gray-300/[0.5] z-[9]",
                    showAlertLogout ? "delay-200 translate-y-0" : "delay-[400ms] translate-y-[100vh]"
                )}>
                    <div className='relative lg:w-[500px] lg:translate-x-[-50%] lg:left-[50%] w-full h-full'>
                        <div className={
                            className(
                                'w-full h-[130px]  absolute bottom-0 left-0 rounded-tr-[40px] rounded-tl-[40px] bg-white  py-5 px-5',
                                showAlertLogout ? 'translate-y-0 duration-[700ms]' : 'translate-y-[150px] duration-[300ms]'
                            )
                        }>
                            <div className='w-full h-[50px] flex items-center'>
                                <p>Apakah anda yakin ingin keluar?</p>
                            </div>
                            <div className='flex gap-2 w-full items-center'>
                                <button onClick={()=> setShowAlertLogout(false)} className="text-sm px-3 py-2 rounded-full bg-red-400 text-white">Tidak</button>
                                <button onClick={logout} className="px-3 py-2 rounded-full text--sm bg-blue-400 text-white">Ya,saya yakin</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id='popup-login' className={
                    className(
                        "fixed  top-0 left-0 right-0 bottom-0 bg-gray-200 z-[9] duration-700",
                        showPopupOauth ? 'translate-y-0' : 'translate-y-[100vh]' 
                    )
                }>
                    <Oauth onClose={()=> setShowPopupOauth(false)}/>
                </div>
            </SectionPage>
           
        </>
    )
}
