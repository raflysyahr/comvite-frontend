import { useEffect, useState } from "react";
import LocalStorage from "../utils/localstorage";
import { useLocation } from "react-router";

export default function PopupHistoryChapter({ data }){


    const { state } = useLocation()

    useEffect(()=>{
        if(data || state){

            data = data || state
            
        }

        return ()=>{}

    },[data,state])



    return (
        <>
            {
                LocalStorage.exists(data.url+'-comvite-history') && data  &&
                <div className={className(
                    'fixed w-full lg:w-[500px] md:w-[500px] delay-[1000] duration-700 h-[120px] z-[999] bg-white border-t-[3px] border-gray-300 px-2 py-2 left-0 right-0 shadow-lg bottom-[0px] rounded-md'
                )}>
                    <p>{
                        data.chapters.find((f)=> f.url === JSON.parse(LocalStorage.get(data.url+'-comvite-history'))[JSON.parse(LocalStorage.get(data.url+'-comvite-history')).length - 1])
                        .label
                    } terakhir kamu baca .Apakah kamu mau melanjutkan?</p>
                    <div className='flex gap-2 mt-3'>
                        <button className='w-fit px-2 py-2 bg-blue-500 text-white rounded-md text-sm'>Continue</button>
                    </div>
                </div>

            }
        </>
    )
}