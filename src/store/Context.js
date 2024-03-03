import React, { createContext, useState } from "react";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);//create two context
//create a context function that takes childres as its props and 
export default function Context({children}) {
   const [user, setUser] = useState(null);

   return (
      <AuthContext.Provider value={{user,setUser}}>
        {children}
      </AuthContext.Provider>
   );
}

//auth context pass the value user and set user it also gives the changes to its child components  