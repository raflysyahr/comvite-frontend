import { useEffect, useState } from "react"
import { useLocation } from "react-router";
import className from "../utils/className";

export default function PopupBookrmark({ detail }){
    const [showSuggestBookmark,setShowSuggestBookmark] = useState(false)
    const { pathname } = useLocation()


    useEffect(()=>{


        setTimeout(() => {
            if(!localStorage.getItem('favorite') && !localStorage.getItem('ignoreAlertAddBookmark')){
                setShowSuggestBookmark(true);
            }else{
                
                if(localStorage.getItem('favorite')){

                    const fav = JSON.parse(localStorage.getItem('favorite')).map((e)=> JSON.parse(e))

                    if(!fav.find((e)=> e.url === pathname.split('/')[2])){
                        
                        if(localStorage.getItem('ignoreAlertAddBookmark')){
                            const ignore = JSON.parse(localStorage.getItem('ignoreAlertAddBookmark')).map((e)=> JSON.parse(e))
                            console.log(ignore.find((e)=> e.url === pathname.split('/')[2]))
                            
                            if(!ignore.find((e)=> e.url === pathname.split('/')[2])){
                                setShowSuggestBookmark(true)
                            }

                        }else{
                            setShowSuggestBookmark(true)
                        }

                    }
                }else if(localStorage.getItem('ignoreAlertAddBookmark')){
                    const ignore = JSON.parse(localStorage.getItem('ignoreAlertAddBookmark')).map((e)=> JSON.parse(e))
                    console.log(ignore.find((e)=> e.url === pathname.split('/')[2]))
                    
                    if(!ignore.find((e)=> e.url === pathname.split('/')[2])){
                        setShowSuggestBookmark(true)
                    }
                }else{
                    setShowSuggestBookmark(true)
                }
                
                
            }
                
        }, 3000);

        return ()=>{}

    },[])


    const addToBookmark = () =>{
        if(localStorage.getItem('favorite')){
            const fav = JSON.parse(localStorage.getItem('favorite'));

            localStorage.setItem('favorite', JSON.stringify([...fav,JSON.stringify({
                url:detail.url,
                title:detail.title,
                thumbnail:detail.thumbnail
            })]))

        }else{
            localStorage.setItem('favorite', JSON.stringify([
                JSON.stringify({
                    url:detail.url,
                    title:detail.title,
                    thumbnail:detail.thumbnail
                })
            ]))
        }
        
        setShowSuggestBookmark(false)
    }


    const closeAddToBookmark = ()=>{
        setShowSuggestBookmark(false);

        if(localStorage.getItem('ignoreAlertAddBookmark')){
            const ignoreAlertAddBookmark = localStorage.getItem('ignoreAlertAddBookmark')
            localStorage.setItem('ignoreAlertAddBookmark', JSON.stringify([...ignoreAlertAddBookmark, JSON.stringify({
                url:detail.url,
                title:detail.title,
                thumbnail:detail.thumbnail
            })]))
        }else{
            localStorage.setItem('ignoreAlertAddBookmark', JSON.stringify([
                JSON.stringify({
                    url:detail.url,
                    title:detail.title,
                    thumbnail:detail.thumbnail
                })
            ]))
        }
    }

    return (
        <div className={className(
            'fixed w-full inter lg:w-[500px] rounded-tl-lg rounded-tr-lg md:w-[500px] delay-[1000] duration-700 h-[120px] z-[999] bg-gray-800 px-2 py-2 left-0 right-0 shadow-lg bottom-[0px] rounded-md',
            showSuggestBookmark ? "translate-y-0" : "translate-y-[120px]"
        )}>
            <p className="text-white">Apakah mau kamu tambahkan kedalam bookmark?</p>
            <div className='flex gap-2 mt-3'>
                <button onClick={addToBookmark} className='w-fit px-2 py-2 bg-gray-600  text-white rounded-full text-sm'>Add bookmark</button>
                <button onClick={closeAddToBookmark} className='w-fit px-2 py-2 bg-gray-700 text-white rounded-full text-sm'>No,thannks</button>
            </div>
        </div>
    )
}