//A custom hook to get the position to place the dropdown menu on the screen explaination @t=9233
import { RefObject } from "react";

export const useDropdownPosition=(ref:RefObject<HTMLDivElement |null>|RefObject<HTMLDivElement>)=>{

    const getDropdownPosition=()=>{
        if(!ref.current) return {top:0 ,left:0}
        const rect=ref.current?.getBoundingClientRect()
        const dropdownWidth=240 //width of dropdown (w-60=15rem=240px)

        //Calculate the postion
        let left =rect?.left+window.scrollX 
        const top=rect?.bottom+window.scrollY

        //check if the dropdown would flow out the right edge of the viewport
        if(left+dropdownWidth>window.innerWidth){
            left=rect?.right+window.screenX 
        }

        //If still off-screen, align to the right edge of the viewport with some padding
        if(left<0){
            left=window.innerWidth-dropdownWidth-16
        }

        //Ensure dropdown doesn't outside of left screen
        if(left<0){
            left=16
        }
        return {top,left}


    }
    return {getDropdownPosition}
}