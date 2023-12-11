import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";




const RateStart = ({length})=>{
// '*****'

    if(String(length).includes('.')){
        const rate = Number(String(length).split('.')[0])
        switch (rate) {
            case 1:
            case 2:{
                    return (
                        <>
                            <BsStarHalf/>
                            <BsStar/>
                            <BsStar/>
                            <BsStar/>
                            <BsStar/>
                        </>
                    )
                brea
                    }k;
            case 3:
            case 4:{
                return (
                    <>
                        <BsStarFill/>
                        <BsStarHalf/>
                        <BsStar/>
                        <BsStar/>
                        <BsStar/>
                    </>
                )
            break;
                }
            case 5:
            case 6:{
                return (
                    <>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarHalf/>
                        <BsStar/>
                        <BsStar/>
                    </>
                )
            break;
                }
            case 7:
            case 8:{
                return (
                    <>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarHalf/>
                        <BsStar/>
                    </>
                )
            break;
                }
            case 9:
                return (
                    <>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarHalf/>
                    </>
                )
            break;
       
        }
    }else{

        if([1,3,5,7,9].some(p=> p === length)){
            switch (length) {
                case 1:
                        return (
                            <>
                                <BsStarHalf/>
                                <BsStar/>
                                <BsStar/>
                                <BsStar/>
                                <BsStar/>
                            </>
                        )
                    break;
                case 3:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarHalf/>
                            <BsStar/>
                            <BsStar/>
                            <BsStar/>
                        </>
                    )
                break;
                case 5:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarHalf/>
                            <BsStar/>
                            <BsStar/>
                        </>
                    )
                break;
                case 7:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarHalf/>
                            <BsStar/>
                        </>
                    )
                break;
                case 9:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarHalf/>
                        </>
                    )
                break;
           
            }
        }else{

            switch (length) {
                case 2:
                        return (
                            <>
                                <BsStarFill/>
                                <BsStar/>
                                <BsStar/>
                                <BsStar/>
                                <BsStar/>
                            </>
                        )
                    break;
                case 4:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStar/>
                            <BsStar/>
                            <BsStar/>
                        </>
                    )
                break;
                case 6:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStar/>
                            <BsStar/>
                        </>
                    )
                break;
                case 8:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStar/>
                        </>
                    )
                break;
                case 10:
                    return (
                        <>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                        </>
                    )
                break;
        
            }
        }

    }

}


export default function RatingStar({rating}){

    return (
        <RateStart length={rating} />
    )
}