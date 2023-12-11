import {Helmet} from 'react-helmet';
import SectionPage from '../components/SectionPage';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineComment } from 'react-icons/ai';
import { useNavigationBar } from '../routes/Routing';
import { useSelector } from 'react-redux';
import CCHome from '../components/home/CCHome';
import { BsArrowUp } from 'react-icons/bs';

export default function ChapterPage(){

    const { comic:comic_reducer } = useSelector(select=> select.comic)
    const navigate = useNavigate();
    const { goTo } = useNavigationBar();

    const { pathname } = useLocation()
    const [detail,setDetail] = useState(null);
    const [images,setImages] = useState([]);

    useEffect(()=>{

        const dt = comic_reducer.find((e)=> e.chapters.some((s)=> s.url.startsWith(pathname.split('/')[2])))
        setDetail(dt);

        
        return ()=>{}

    },[comic_reducer])


    const onNext = () =>{
        const x = []
        x.
        // [detail.chapters.sort((a,b)=> a-b).map((e)=> { return e.url }).indexOf(pathname.split('/')[2]) ]
        console.log(url)
    }

    return (
        <>
            <Helmet>
                <title>{detail? detail.title :'Not found'}</title>
            </Helmet>

            <SectionPage>
                {
                    !detail ?
                    <div className='w-full h-[100vh] flex items-center'>
                        <div className='flex flex-col'>
                            <h1>{pathname.split('/')[2]}</h1>
                            <small className="mt-2">Chapter tidak ada dalam database</small>
                            <button onClick={()=> goTo('/',{ replace:true },navigate)} className=' text-sm w-fit px-2 py-2 bg-gray-500 text-white rounded-md mt-2'>Back to home</button>
                        </div>
                    </div>    
                    :
                    <div className='w-full h-[100vh]'>
                        <div className='w-full h-[50px] flex items-center justify-between'>
                            <button
                            onClick={()=> goTo(`/series/${detail.url}`,{ replace:true },navigate)}
                            ><IoIosArrowBack/></button>
                            <p>{detail.chapters.find((s)=> s.url.startsWith(pathname.split('/')[2])) && detail.chapters.find((s)=> s.url.startsWith(pathname.split('/')[2])).label}</p>
                            <div></div>
                        </div>
                        <div className='w-full h-[50px] mb-8 mt-3 flex items-center justify-center flex-col text-center'>
                            <h1>{detail.title}</h1>
                            
                        </div>
                        <div className='w-full h-fit'>

                            {
                                [].map((e,i)=>(
                                    <div key={i} className='w-100 h-[600px] bg-gray-200 flex justify-center items-center'>
                                        Image {e}
                                    </div>
                                ))
                            }

                        </div>
                        <br />
                            {
                                detail.chapters[0].url === pathname.split('/')[2] ?
                        
                                <div>
                                    <h1>Related Comics</h1>
                                    <div className='flex flex-wrap gap-2 mt-4'>
                                        
                                        {
                                            
                                            comic_reducer.filter((e)=> e.type === detail.type)
                                            .filter((e)=> { const b = e.genre.map((m)=> detail.genre.some(s=> s.toLocaleLowerCase() === m.toLocaleLowerCase())); return b.filter(z=> z === true).length >= 2   })
                                            .slice(0,6)
                                            .map((e)=>(
                                                <CCHome data={e} />       
                                            ))
                                        }
                                    </div>
                                </div>
                                
                                :
                                <div className='flex justify-between'>
                                    <button className='px-9 text-[15px] rounded-md py-2 bg-gray-500 text-white'>Prev</button>
                                    <button onClick={onNext} className='px-9 text-[15px] rounded-md py-2 bg-blue-500 text-white'>Next</button>

                                </div>
                                
                            }
                        <br/>
                        <div className='gap-3'>
                            <div className='w-full h-[50px] flex items-center gap-2'>
                                <h1>Komen disini guys</h1>
                                <AiOutlineComment/>
                            </div>
                            <div className='w-full py-2'>

                            </div>
                        </div>
                        <div 
                        onClick={()=> document.getElementById('body').scrollTo(0,0)}
                         className=' text-white flex items-center justify-center w-[40px] h-[40px] bg-gray-700 fixed bottom-[15px] rounded-full right-[20px]'>
                            <BsArrowUp/>
                        </div>
                    </div>
                }
            </SectionPage>
            
        </>
    )
}
