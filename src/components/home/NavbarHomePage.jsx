import { MdOutlineFavorite } from 'react-icons/md';
import { IoIosNotifications } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';
import { Cookies, useCookies } from 'react-cookie';
import Search from './Search';
import bgGradient from '../../assets/img/bg-gradient.png';

export default function NavbarHomePage(){

    const [cookies] = useCookies(['user']);

    return (
        <div className="w-full min-h-[80px] bg-white mb-[5px] backdrop-blur-lg mt-[5px] rounded-md flex justify-center flex-col">
            <div className="w-full h-[50px]">

            </div>
            <div style={{ backgroundImage: `url(${bgGradient})`}} className='clip-mask flex items-center text-blue-500 inter-bold text-[40px] overflow-hidden'>
                <a>
                    <h3>Hey {cookies.user && cookies.user.name.split(' ')[0]}</h3>
                </a>
            </div>
            <h1 className='flex items-center text-[#303030] inter-bold text-[25px]'>Find your favorite comic</h1>
        

            <Search/>

        </div>
    )
}