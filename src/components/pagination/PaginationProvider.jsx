import { useState , useEffect , createContext} from "react";


export const PaginationContext = createContext();

export default function PaginationProvider({ children }){

    const [comic,setComic]  = useState([]);
    
    const countShowing = 4;
    const perpage  = 10

    const [counterPage,setCounterPage] = useState(0);
    const [data,setData] = useState([]);
    const [start,setStart] = useState(0);
    const [end,setEnd] = useState(10);
    const [page,setPage] = useState(1);

    

    
    const countPage = ()=> Math.ceil(comic.length / perpage );
    
    //this function for generate number page,example in ui/ux (prevtButton) [1][2][3] (nextButton)
    const PaginationCount = ()=>{
        const x = []
        for(let i= 0;i < countPage();i++){
            x.push(i+1)
        }
        return x
    }

    //call every data comic update.updated data comic from LibraryPage.jsx
    useEffect(()=>{
        setPage(1)
        setData(comic.slice(0,10));
        return()=>{};
    },[comic])

    //call every number page changes,but if page number === 1
    useEffect(()=>{
        page == 1 && setCounterPage(0)
    },[page])

    //calculate for handle button can exec or not
    function nextButton(){

        const _start = perpage * page
        const _end  = page !== countPage() -1   ?  ( perpage * (page + 1)) : (perpage * (page + 1) )
        const _page = page + 1

        page >= countShowing && page !== countPage() && setCounterPage(counterPage+1)
        page !== countPage() && 
        (
            setStart(_start),
            setEnd(_end),
            setPage(_page),
            setData(comic.slice(_start,_end))
        )
    }

    // concept link nextButton function
    function prevButton(){

        const _start = ( perpage * (page - 1)) - perpage
        const _end = page !== perpage ?  ( perpage * (page - 1)) : ( perpage * (page - 1))
        const _page =  page - 1

        page > countShowing && setCounterPage(counterPage-1)
        page > 1 &&
        (
            setStart(_start),
            setEnd(_end),
            setPage(_page),
            setData(comic.slice(_start,_end))
        )

    }

    return(
        <PaginationContext.Provider value={{
            nextButton,
            prevButton,
            library_data:data,
            number_page:PaginationCount().slice(0+counterPage,countShowing+counterPage),
            activePage:page,
            push:(data)=> setComic(data),
            countPage:countPage()
        }}>
            { children }
        </PaginationContext.Provider>
    )
}
