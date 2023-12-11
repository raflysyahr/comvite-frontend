import { useContext, useRef, useState } from "react"
import className from "../../utils/className";
import { IoIosCloseCircle } from 'react-icons/io'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import { onSignin, onSignup } from "../../lib/oauth";



export default function Oauth({ onClose }){
    
    const [cookies,setCookie] = useCookies(['oauth-token','user'])
    

    const navigate = useNavigate();
    const [tab,setTab] = useState(1);
    const [message,setMessage] = useState(null);
    const [loading,setLoading] = useState(false);



    const username = useRef();
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const rememberme = useRef();


    // const submitLogin = ()=>{
    //     setLoading(true)

    //     const dataLogin = {
    //         email:email.current.value,
    //         password:password.current.value
    //     }

        
    //     axios.post('http://localhost:8000/api/v1/auth/signin',dataLogin,{
    //         withCredentials:true
    //     }).then((result)=>{
            
    //         if(result.status === 200 ){
    //             if(rememberme.current.value){
                    
    //                 const date = new Date()
    //                 date.setTime( date.getTime() + ( (1000*60*60) * 24 ))

    //                 const token = result.data.data.token
  
                    
    //                 setLoading(false)
    //                 onClose()
                    
    //             }else{}

    //         }

    //     }).catch((err)=>{
    //         console.log(err)//.response.data.message)
    //         setLoading(false);
    //     })
    // }


    // const onSignup =()=>{

    //     setLoading(true)
    //     const dataSignup = {
    //         email:email.current.value,
    //         password:password.current.value,
    //         name:name.current.value,
    //         username:username.current.value
    //     }

    //     axios.post('http://localhost:8000/api/v1/auth/signup',dataSignup).then((result)=>{
            
    //         if(result.status === 201 ){
    //             setLoading(false)
    //             onClose()
    //             setTimeout(()=>{ navigate('/profile',{ replace:true }) },1000)
    //         }

    //     }).catch((err)=>{
    //         setMessage(err.response.data.message)
    //         setLoading(false);
    //     })
    // }



    const onSubmit = async()=>{
        setLoading(true)

        try{

            if(tab ===1 ){
    
                const result = await onSignin(email.current.value,password.current.value)
                
                if(result.error){
                  console.log('Result Signin:error',result.error.status)
                  onClose()
                  setLoading(false)

                  return false
                }

                console.log('Result Signin:success',result)
                onClose()
                setLoading(false);

                return true
    
            }else{
    
                const result = await onSignup(
                    {
                        email:email.current.value,
                        password:password.current.value,
                        name:name.current.value,
                        username:username.current.value
                    }
                )
    
                if(result.error){
                  console.log('Result Signin:error',result.error.status)
                  onClose()
                  setLoading(false)

                  return false
                }

                console.log('Result Signin:success',result)
                onClose()
                setLoading(false);

                return true
    
            }
        }catch(error){
//            console.log(error.status)
            onClose()
            setLoading(false);
        }
    }


    
    return(
        <div className='relative flex flex-col justify-between pb-5 pt-2 bg-white w-full h-[100vh] rounded-lg px-3'>
            <div>
                <div className="absolute top-0 left-0 px-2 py-2 flex justify-between items-center w-full">
                    <button onClick={onClose} className="w-[30px] h-[30px] text-[20px] flex items-center jsutify-center rounded-full">
                        <IoIosCloseCircle/>
                    </button>
                    {
                        message && 
                        <div className="w-[220px] px-2 py-[1px] bg-red-300 text-white text-sm rounded-md">
                            {message}
                        </div>
                    }
                </div>
                <div className='w-full max-h-[250px]'>
                    <div className='w-full h-[200px] flex items-center justify-center'>
                        <p className="absolute text-[60px] font-bold">
                            {tab ===1 ? 'Masuk' : 'Mendaftar'}
                        </p>
                    </div>
                    <div className='flex'>
                        <button 
                        onClick={()=> setTab(1)}
                        className={
                            className(
                                'w-full h-[40px] rounded-full',
                                tab === 1 ? 'bg-blue-500 text-white' : 'bg-white'
                            )
                        }>Masuk</button>
                        <button 
                        onClick={()=> setTab(2)}
                        className={
                            className(
                                'w-full h-[40px] rounded-full',
                                tab === 2 ? 'bg-blue-500 text-white' : 'bg-white'
                            )
                        }>Mendaftar</button>
                    </div>
                </div>
                <div className='relative flex flex-col w-full gap-2 mt-[1em] justify-between'>
                    {
                        tab === 1?
                            <div className='mt-5 gap-2 flex flex-col'>
                                <form method="post">
                                    <div>
                                        <label className="font-mono" htmlFor="email">Email</label>
                                        <input ref={email} type='text' id='email' name='email' placeholder='Masukan email' className='bg-white w-full h-[40px]' />
                                    </div>
                                    <div>
                                        <label className="font-mono" htmlFor="password">Password</label>
                                        <input ref={password} type='password' id='password' name='password' placeholder='Masukan Password' className='bg-white w-full h-[40px]' />
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <input ref={rememberme} type='checkbox' name='rememberme' id='rememberme' />
                                        <label className="font-mono" htmlFor="rememberme">Remember me</label>
                                    </div>
                                </form>
                            </div>
                        :<div className='mt-5 gap-2 flex flex-col'>
                            <div>
                                <label className="font-mono" htmlFor="username" >Username</label>
                                <input ref={username} type='text' id='username' name='username' placeholder='Masukan username' className='bg-white w-full h-[40px]' />
                            </div>
                            <div>
                                <label className="font-mono" htmlFor="name">Name</label>
                                <input ref={name} type='text' id='name' name='name' placeholder='Masukan name' className='bg-white w-full h-[40px]' />
                            </div>
                            <div>
                                <label className="font-mono" htmlFor="email">Email</label>
                                <input ref={email} type='text' id='email' name='email' placeholder='Masukan email' className='bg-white w-full h-[40px]' />
                            </div>
                            <div>
                                <label className="font-mono" htmlFor="password">Password</label>
                                <input ref={password} type='password' id='password' name='password' placeholder='Masukan Password' className='bg-white w-full h-[40px]' />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <button onClick={ onSubmit } className='w-full h-[50px] rounded-md bg-blue-500 text-white'>
                {
                    tab === 1 ? 'Masuk' :'Mendaftar'
                }
            </button>


            {
                loading && 
                <div className="w-full h-full absolute flex items-center justify-center z-[1] left-0 right-0 top-0 bottom-0 bg-gray-500/[0.5]">
                    <span className="animate-spin text-[25px]">
                        <AiOutlineLoading3Quarters/>
                    </span>
                </div>
            }
        </div>
    )
}
