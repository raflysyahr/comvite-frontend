import {Helmet} from 'react-helmet';
import SectionPage from '../components/SectionPage';
import { useSelector }  from 'react-redux';
import { useEffect, useState } from 'react';

import { IoIosArrowForward , IoIosArrowBack } from 'react-icons/io';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../components/pagination/usePagination';
import CCLibrary from '../components/library/CCLibrary';
import className from '../utils/className';
import { useLocation } from 'react-router';




export default function LibraryPage(){
    // global data from reducer redux
    const { comic:comic_reducer } = useSelector(selector=> selector.comic)
    //this type of comic
    const [typeComic,setTypeComic] = useState('all');
    const { search } = useLocation()


    
    const [library,setLibrary] = useState([]);

    //usePagination is hooks pagination.is can be result detail pagination,like
  //active page,data perpage,etc.
    const pagination = usePagination()

    //call this function every refresh and check type comic if "all"
    useEffect(()=>{
        if(typeComic === 'all') { changeTypeComic('all') }
        return ()=>{}
    },[comic_reducer])




    // change type of comic for specific result by type like
  // manhua,manhwa,manga,and all 
    const changeTypeComic = (type)=>{
        const genreSearch = search.includes('genre=') ? search.split('genre=')[1].split(',') : []

        console.log(genreSearch)
        setTypeComic(type);
        pagination.push(
            type === 'all' ? 
            comic_reducer.filter((e)=> { const b = e.genre.map((m)=> genreSearch.some(s=> s.toLocaleLowerCase() === m.toLocaleLowerCase())); return b.filter(z=> z === true).length >= genreSearch.length   }) : 
            comic_reducer.filter((e)=> e.type.toLocaleLowerCase() === type)
            .filter((e)=> { const b = e.genre.map((m)=> genreSearch.some(s=> s.toLocaleLowerCase() === m.toLocaleLowerCase())); return b.filter(z=> z === true).length >= genreSearch.length   })
        )


        console.log(
            type === 'all' ? 
            comic_reducer.filter((e)=> { const b = e.genre.map((m)=> genreSearch.some(s=> s.toLocaleLowerCase() === m.toLocaleLowerCase())); return b.filter(z=> z === true).length >= genreSearch.length   }) : 
            comic_reducer.filter((e)=> e.type.toLocaleLowerCase() === type)
            .filter((e)=> { const b = e.genre.map((m)=> genreSearch.some(s=> s.toLocaleLowerCase() === m.toLocaleLowerCase())); return b.filter(z=> z === true).length >= genreSearch.length   })
        )
    }

    return (
        <>
            <Helmet>
                <title>Library of Heaven</title>
            </Helmet>

            <SectionPage>
                <div className="w-full h-full">
                    <div className="w-full h-[50px] flex items-center gap-2 bg-white mb-2 inter">
                        <button onClick={()=> changeTypeComic('all')} 
                            className={className('duration-700 w-[80px] border-b-[1px] h-[40px] bg-white',typeComic === 'all' ? "border-blue-500" :"border-white")}>All</button>
                        <button onClick={()=> changeTypeComic('manhwa')} 
                            className={className('duration-700 w-[80px] border-b-[1px] h-[40px] bg-white',typeComic === 'manhwa' ? "border-blue-500" :"border-white")}>Manhwa</button>
                        <button onClick={()=> changeTypeComic('manhua')} 
                            className={className('duration-700 w-[80px] border-b-[1px] h-[40px] bg-white',typeComic === 'manhua' ? "border-blue-500" :"border-white")}>Manhua</button>
                        <button onClick={()=> changeTypeComic('manga')} 
                            className={className('duration-700 w-[80px] border-b-[1px] h-[40px] bg-white',typeComic === 'manga' ? "border-blue-500" :"border-white")}>Manga</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {
                            pagination.library_data.map((e,i)=>(
                                <CCLibrary data={e} key={i} />
                            ))
                        }
                        
                    </div>
                </div>
            </SectionPage>
            <br/>
            <Pagination/>
        </>
    )
}
