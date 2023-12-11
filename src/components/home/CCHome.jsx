import { useNavigate } from "react-router";
import className from "../../utils/className";
import { useNavigationBar } from "../../routes/Routing";

export default function CCHome({ data }){

    const navigate = useNavigate();
    const { goTo } = useNavigationBar()
    const toLink = (url)=> goTo(`/series/${url}`,{ replace:true , state:data},navigate)

    return (
        <div className="w-[6.5em] md:w-[106px] lg:w-[106px]">
            <div 
            onClick={()=> toLink(data.url)}
            className={className(
                "overflow-hidden ring-[0px] w-[6.5em] md:w-[106px] lg:w-[106px] h-[150px] bg-white rounded-md"
            )}>
                    <img src={ data.thumbnail.source } alt={data.title}/>
            </div>
            <div className="flex flex-col mt-2 overflow-hidden">
                <a onClick={()=> toLink(data.url)}><h3>{data.title}</h3></a>
                <a href="" className="text-[10px]">{data.chapter}</a>
            </div>
        </div>
    )
}