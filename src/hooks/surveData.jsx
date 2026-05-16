import axios from "axios";
import { useEffect, useState } from "react";

export function useUsername(){
    let [username, setUsername] = useState('로그인');

    useEffect(()=>{
        axios.get('/username.json').then((r)=>{
            setUsername(r.data)
        })
        .catch(()=>{
            setUsername('로그인')
        })
    },[])
    return username;
}






