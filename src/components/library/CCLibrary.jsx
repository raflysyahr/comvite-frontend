import { useNavigate } from "react-router";
import { useNavigationBar } from "../../routes/Routing";

export default function CCLibrary({ data }){
    const navigate = useNavigate();
    const { goTo } = useNavigationBar()

    const toLink = ()=> goTo(`/series/${data.url}`,{ replace:true , state:data},navigate)

    return (
        <div  className="lg:w-[300px] w-full min-h-[70px] bg-white flex gap-2 inter">
            <div onClick={toLink} className='cursor-pointer max-w-[100px] min-w-[100px] overflow-hidden h-[140px] bg-white'>
                <img src={data.thumbnail.source} alt={data.title} className="w-[100px]" />
            </div>
            <div className='overflow-hidden gap-2 flex flex-col'>
                <a onClick={toLink} className="cursor-pointer">
                    <h3 className="dark:text-white duration-700 md:text-[17px] text-[16px] lg:text-[17px]">{data.title}</h3>            
                </a>
                <div className="flex gap-2">
                    {
                        data.genre.slice(0,3).map((e,i)=>(
                            <button key={i} className="text-sm bg-blue-500 px-2 text-white rounded-md">{e}</button>
                        ))
                    }
                </div>
                <div className='flex flex-col mt-1 gap-2'>
                    {
                        data.chapters.length > 0 ?data.chapters.slice(0,3).map((c,index)=>(
                            <a href={`${location.origin}/${data.url}/chapter/${c.url}`}
                            className="text-[12px] bg-gray-200 w-fit px-3 py-[5px] rounded-md"
                            key={index}>{c.label}</a>
                        )):<div className="w-full h-full flex items-center justify-center">
                                <p>Coming soon</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}