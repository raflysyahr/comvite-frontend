import { useState } from 'react';
import { useEffect } from 'react';
import {Helmet} from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward , IoIosArrowBack, IoMdArrowDropright } from 'react-icons/io';
import { useNavigationBar } from '../routes/Routing';
import SectionPage from '../components/SectionPage';
import { RiBallPenFill, RiBookOpenFill } from 'react-icons/ri';
import { BsSortNumericDownAlt, BsSortNumericUp, BsSortNumericUpAlt } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import className from '../utils/className';
import LocalStorage from '../utils/localstorage';
import PopupBookrmark from '../components/PopupBookmark';
import PopupHistoryChapter from '../components/PopupHistoryChapter';

export default function ComicPage(props){
    const { comic:comic_reducer } = useSelector(select=> select.comic);
    const navigate = useNavigate()
    const { goTo } = useNavigationBar()
    const { state , pathname } = useLocation()
    const [detail,setDetail] = useState(null)
    const [sortBy,setSortBy] = useState('asc');
    const [historyChapter,setHistoryChapter] = useState([]);

    

    useEffect(()=>{
        if(state){
            setDetail(state)
            LocalStorage.exists(state.url+'-comvite-history') && setHistoryChapter(JSON.parse(LocalStorage.get(state.url+'-comvite-history')))
        }else{
            const x = comic_reducer.find((e)=> e.url === pathname.split('/')[2])
            setDetail(x);
            x && LocalStorage.exists(x.url+'-comvite-history') && setHistoryChapter(JSON.parse(LocalStorage.get(x.url+'-comvite-history')))
        }

        return ()=>{}

    },[state,comic_reducer])



    const goChapter = (url)=>{
        
        LocalStorage.update(detail.url+'-comvite-history',(data)=>{
            if(!data) return JSON.stringify([url])
            const parse = JSON.parse(data);
            return JSON.stringify([...parse.filter((e)=> e !== url),url])
        })

        goTo(`/ch/${url}`,{ replace:true},navigate)
        
    }


    const onSearch = (search)=>{
        
        if(search.lengt !== 0){
            const filter =  state.chapters.filter((e)=> e.label.split(' ')[1].startsWith(search))
            setDetail((current)=>{
                return {
                    ...current,
                    chapters:filter
                }
            })
        }else{
            setDetail(state)
        }
    }

    const sortChapters = (chapters)=>{

        return chapters.sort((a,b)=> 
        sortBy === 'asc' ? 
            Number(a.label.split(' ')[1]) - Number(b.label.split(' ')[1])
            :
            Number(b.label.split(' ')[1]) - Number(a.label.split(' ')[1])
        )

    }


    return (
        <>
            <Helmet>
                <title>{detail && detail.title || '404 Notfound'}</title>
            </Helmet>

        <SectionPage>
        { !detail  ?
            
                
            <div className='w-full h-screen bg-white flex items-center justify-center'>
                <div className='w-[90%]'>
                    <h1>
                        {pathname.split('/')[2].split('-').map((e)=> e.charAt(0).toUpperCase()+e.slice(1)).join(' ')}
                    </h1>
                    <small>Tidak ada dalam database</small>
                    <br />
                    
                    <button onClick={()=> goTo('/',{ replace:true },navigate)} className=' text-sm w-fit px-2 py-2 bg-gray-500 text-white rounded-md mt-2'>Back to home</button>
                </div>
            </div> :



            <div className='w-full h-full bg-white'>
                <div className="w-full h-[50px] flex items-center gap-2">
                    <button 
                    onClick={()=> goTo('/',{ replace:true },navigate)}
                    className=' bg-white rounded-md flex items-center justify-center'><IoIosArrowBack/></button>
                </div>
                <div className='flex gap-2'>
                    <div className='w-[120px] overflow-hidden rounded-md h-[170px'>
                        <img src={detail.thumbnail.source} alt={detail.title}/>
                    </div>
                    <div>
                        <h2 className='font-bold text-gray-700'>{detail.title}</h2>
                        <h2 className='mt-2 text-sm flex gap-2'><RiBallPenFill/> {detail.author}</h2>
                        <h2 className='text-sm'>{detail.type}</h2>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap mt-4'>
                    {
                        detail.genre.map((e,i)=>(
                            <a key={i} className="w-fit px-2 py-[4px] bg-blue-500 text-white text-sm rounded-md">{e}</a>
                        ))
                    }
                </div>
                <div className='mt-5'>
                    <h1 className='border-b-[1px] border-gray-300 mb-2 w-fit h-[28px]'>Synopsis</h1>
                    <textarea disabled name="synopsis" value={detail.synopsis} id="" className='bg-white w-full h-[200px]'></textarea>
                </div>
                <div className='mt-4'>
                    <div className="flex items-center justify-between mb-2">
                        <div className=' mb-2 w-fit h-[30px] flex gap-2 items-center'>
                            <RiBookOpenFill/>
                            Chapters 
                            <IoMdArrowDropright/>
                            {
                                LocalStorage.exists(detail.url+'-comvite-history') ? 
                                    JSON.parse(LocalStorage.get(detail.url+'-comvite-history')).length :
                                    0
                            }/ {  
                                    detail.chapters.length > 0 ?  
                                        (sortBy === 'asc'?  
                                            sortChapters(detail.chapters)[detail.chapters.length - 1].label.split(' ')[1] :
                                            sortChapters(detail.chapters)[0].label.split(' ')[1]
                                        ) 
                                    : 0 
                                }
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={()=> setSortBy('desc')}><BsSortNumericDownAlt/></button>
                            <button onClick={()=> setSortBy('asc')}><BsSortNumericUp/></button>
                        </div>
                    </div>                        
                    <div className='mb-4'>
                        <input 
                        onKeyUp={(event)=> (event.preventDefault(),onSearch(event.currentTarget.value))}
                        className='focus:outline-none w-full h-[35px] ring-2 ring-gray-300 px-2 rounded-md'
                        type="number" name="search" id="search" placeholder='search' />
                    </div>
                    <div className='gap-2 flex flex-wrap max-h-[500px] overflow-scroll hide-scrollbar'>
                        {
                            sortChapters(detail.chapters)
                            .map((e,i)=>(
                                <button 
                                onClick={()=> goChapter(e.url)}
                                key={i} className={className(
                                    'px-2 items-center w-full h-[40px] flex justify-start',
                                    historyChapter.some((s)=> s === e.url) ? "bg-gray-300 text-gray-600" : "bg-white"
                                )}>
                                    {e.label}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <br />
                <div className='gap-3'>
                    <div className='w-full h-[50px] flex items-center gap-2'>
                        <h1>Komen disini guys</h1>
                        <AiOutlineComment/>
                    </div>
                    <div className='w-full py-2'>

                    </div>
                </div>
                
                <PopupHistoryChapter data={detail} />
                <PopupBookrmark detail={detail}/>
            </div>
        }
        </SectionPage>
        </>
    )
}