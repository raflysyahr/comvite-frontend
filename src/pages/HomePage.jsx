import { Helmet } from "react-helmet";

import SectionPage from "../components/SectionPage";
import NavbarHomePage from "../components/home/NavbarHomePage";
import { AiFillAndroid, AiFillEye, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from 'react-icons/bs';
import { FaDonate } from 'react-icons/fa';
import { useSelector } from "react-redux";
import CCHome from "../components/home/CCHome";
import { useNavigate } from "react-router";
import { useNavigationBar } from "../routes/Routing";
import RatingStar from "../components/RatingStar";
import { useCookies } from "react-cookie";




export default function HomePage(){

    const { comic:comic_reducer, last_updated_comic , popular_comic , history_comic} = useSelector(selector=> selector.comic)
    const [cookies] = useCookies(['user']);
    const navigate = useNavigate();
    const { goTo } = useNavigationBar()
    const toLink = (url,state)=> goTo(`/series/${url}`,{ replace:true , state},navigate)

    return (
        <>
            <Helmet>
                <title>Aula of Heaven</title>
            </Helmet>

            <SectionPage>
                <NavbarHomePage/>
            </SectionPage>
            <SectionPage>
                <div className="w-full mt-5 inter">
                    <h1 className="text-[18px] inter">Popular comic</h1>
                    <div className="w-full overflow-scroll hide-scrollbar">
                        <div className="mt-3 flex gap-2 w-fit py-4 px-4">

                            {
                                !cookies.user ?
                              
                                    <div className="w-full h-[200px] flex items-center justify-center">
                                        <p>Kamu Belom login!,silahkan login terlebih dahulu</p>
                                    </div>
                                :
                                popular_comic.map((e,i)=>(

                                    <div key={i} className="w-[200px] h-[200px] bg-white shadow-lg rounded-[20px] px-3 py-3">
                                        <div className="flex gap-2">
                                            <div className="max-w-[80px] h-[80px] overflow-hidden bg-white rounded-lg">
                                                <img src={e.thumbnail.source} />
                                            </div>
                                            <div className="flex flex-col">
                                                <div>
                                                    <h1 className="text-sm">Rating:</h1>
                                                    <div className="flex text-[13px]">
                                                        <RatingStar rating={e.rating}/>
                                                        <p className="text-[13px] ml-2">{e.rating}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1 className="text-sm">Views:</h1>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <AiFillEye/>
                                                        {e.views}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 w-full">
                                            <div className="flex flex-col overflow-hidden">
                                                <a onClick={()=> toLink(e.url,e)}><h3>{e.title}</h3></a>
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                {
                                                    e.chapters.length > 0 ?
                                                        e.chapters.map((ch,index)=>(
                                                            <a key={index}>{ch.label}</a>
                                                        ))
                                                    :<p>Coming son</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            

                        </div>
                    </div>
                </div>
            </SectionPage>
            <br />
            <SectionPage>
                <div className="w-full inter">
                    <h1 className="text-[18px]">Last updated</h1>
                    <div className="mt-2 w-full flex flex-wrap gap-3">
                        {
                            !cookies.user ?   
                                <div className="w-full h-[200px] flex items-center justify-center">
                                    <p>Kamu Belom login!,silahkan login terlebih dahulu</p>
                                </div>
                            :
                            last_updated_comic.slice(0,20).map((e,i)=>(
                                <div key={i} className="w-full min-h-[60px] shadow-lg bg-white rounded-lg px-3 py-3 flex items-center justify-between">

                                    <div className="flex gap-3 w-[250px]">
                                        <div className="max-w-[60px] h-[61px] overflow-hidden rounded-lg bg-gray-300" >
                                            <img src={e.thumbnail.source} />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <a><h3>{e.title}</h3></a>
                                            <small>{e.type}</small>
                                            <small>{e.chapter}</small>
                                        </div>
                                    </div>
                                    <div className="max-w-[50px] h-full flex items-center justify-center">
                                        <button onClick={()=> toLink(e.url,e)} className="text-green-500">View</button>
                                    </div>
                                </div>

                            ))
                        }
                        <button style={{ background:'linear-gradient(45deg, #3c3bff, #00ffe8)'}} className="w-full min-h-[40px] shadow-lg text-white rounded-lg px-3 py-3 flex items-center justify-center">
                            More
                        </button>
                    </div>
                </div>
            </SectionPage>
            <br/>
            <SectionPage>
                <div className="inter">
                    <h1 className="text-[18px]">History reading</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {
                            !cookies.user ?
                                <div className="w-full h-[200px] flex items-center justify-center">
                                    <p>Kamu Belom login!,silahkan login terlebih dahulu</p>
                                </div>
                            :
                            history_comic.map((e,i)=>(
                                <CCHome data={e} key={i}/>
                            ))
                        }
                        <button style={{ background:'linear-gradient(45deg, #3c3bff, #00ffe8)'}} className="w-full min-h-[40px] shadow-lg text-white rounded-lg px-3 py-3 flex items-center justify-center">
                            More
                        </button>
                    </div>
                </div>
            </SectionPage>
            <br/>
            <SectionPage>
                <div className="inter">
                    <h1 className="text-[18px]">Weekly </h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {
                                !cookies.user ?
                                    <div className="w-full h-[200px] flex items-center justify-center">
                                        <p>Kamu Belom login!,silahkan login terlebih dahulu</p>
                                    </div>
                                :
                                    history_comic.map((e,i)=>(
                                        <CCHome data={e} key={i}/>
                                    ))

                        }

                    </div>
                </div>

            </SectionPage>
            <br/>
            <SectionPage>
                <div className="inter w-full text-center justify-center items-center font-mono flex flex-col">
                    Comvite {new Date().getFullYear()}
                    
                </div>
            </SectionPage>
            <br/>

        </>
    )
}