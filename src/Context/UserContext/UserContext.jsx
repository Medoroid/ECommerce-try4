import { createContext, useEffect } from "react";
import { useState } from "react";
export let UserContext = createContext(0)

export function UserProvider({children}){
let [userLogin , setUserLogin] = useState(null)
// على شان نهنديل الreload الى بيحصل بعد التسجيل
// ويفضل مسجل لاحد ما انت تعمل تسجسل خروج
useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
        setUserLogin(localStorage.getItem('userToken'))
    }
},[])
    return<>
    <UserContext.Provider value={{userLogin , setUserLogin}}>
        {children}
    </UserContext.Provider>
    </>
}