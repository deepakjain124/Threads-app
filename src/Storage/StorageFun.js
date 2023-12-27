import { storage } from "./Storage"

export const getMkvData=(key)=>{
    const get=storage.getString(key)
    if(get!==null && get!==undefined){
        const parsed=JSON.parse(get)
        return parsed
    }else{
        return null
    }
}
export const setMkvData=(key,data)=>{
    if(typeof data==="string"){
        storage.set(key,data)
    }else{
        storage.set(key,JSON.stringify(data))
    }
}