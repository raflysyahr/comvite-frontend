import { IoIosArrowForward , IoIosArrowBack } from 'react-icons/io';
import SectionPage from '../SectionPage';
import usePagination from './usePagination';
import { useEffect } from 'react';



const className = (...classes)=> classes.filter(Boolean).join(' ');

export default function Pagination(){
    const pagination = usePagination();

    return (
        <>
            <SectionPage>
                <div className='w-full h-[50px] flex items-center justify-center gap-3'>
                    <button 
                    onClick={()=> pagination.prevButton()}
                    className={className(
                        'rounded-md w-[35px] flex items-center justify-center h-[35px]',
                        pagination.activePage > 1 ? "bg-gray-300 text-gray-600" : "bg-gray-100 text-gray-400"
                    )}><IoIosArrowBack/></button>

                    <div className='flex gap-2'>
                        {
                            pagination.number_page.map((e,i)=>(
                                <span key={i} className={className(
                                    'w-[40px] duration-700 flex items-center justify-center h-[35px] rounded-md',
                                    e === pagination.activePage ? "bg-gray-500 text-white" :"bg-gray-300"
                                )}>
                                    {e}
                                </span>
                            ))
                        }
                        
                    </div>
                    <button 
                    onClick={()=> pagination.nextButton()}
                    className={className(
                        'rounded-md w-[35px] flex items-center justify-center text-white h-[35px]',
                        pagination.activePage !== pagination.countPage ? "bg-blue-500" :"bg-blue-200"
                    )}><IoIosArrowForward/></button>
                </div>
            </SectionPage>
            <br/>
        </>
    )
}