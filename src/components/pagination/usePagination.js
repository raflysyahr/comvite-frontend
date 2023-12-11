import { useContext } from "react"
import { PaginationContext } from "./PaginationProvider"

const usePagination = (data)=> useContext(PaginationContext)



export default usePagination