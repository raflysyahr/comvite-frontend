import { useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import className from "../../utils/className";

export default function Search(){

    const [inputSearch,setInputSearch] = useState('')
    const { comic } = useSelector(select=> select.comic)
    const [fills,setFills] = useState(null);
    

    const  liveSearch =(event)=>{
        const input = event.target.value

        if(input !== ''){
            const fill = comic.filter((e)=> e.title.toLocaleLowerCase().startsWith(input.toLocaleLowerCase()) )
            setFills(fill.length > 0 ? fill : null)
        }else{
            setFills(null)
        }

    }

    return (
    
        <div className="relative">
            <div className='flex gap-2 w-full h-[50px] mt-5 relative items-center'>
                <div className={
                    className(
                        'flex h-full gap-2 bg-[#303030] items-center px-2 ',
                        fills ?   'rounded-tl-[10px] rounded-tr-[10px]' : 'rounded-md'
                    )
                }>
                    <FiSearch className='text-[23px] text-gray-400'/>
                    <input onChange={liveSearch} type='search' className='bg-transparent placeholder-white text-white w-full h-full' placeholder='search' />
                </div>
                
                <button style={{boxShadow:'rgb(44 44 44) 1px 2px 9px 0px'}} className='w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded-lg text-white text-[22px]'>
                    <BsArrowRight/>
                </button>
            </div>
            {
                fills &&
                <div className={className(
                    'flex inter antialiased flex-col bg-[#303030] text-white px-2 gap-2 w-full top-[50px] mt-5  h-fit absolute ',
                    fills ?  'rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px]' : 'rounded-none' 
                )}>
                    {
                    fills.map((e,i)=>(
                        <div key={i} className="w-full overflow-hidden">
                            <a className="w-full h-[40px] flex items-center">
                                <h3>{e.title}</h3>
                            </a>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}