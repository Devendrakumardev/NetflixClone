import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
getAuth,
signOut,
 } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAuyxrO1rqbAPm6fjokJ6XIQm8TfrdaZVU",
  authDomain: "netflix-clone-52eae.firebaseapp.com",
  projectId: "netflix-clone-52eae",
  storageBucket: "netflix-clone-52eae.appspot.com",
  messagingSenderId: "284504662137",
  appId: "1:284504662137:web:5f060fe076fd5203e334a8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email,password)=>{
    try{
      const res=  await createUserWithEmailAndPassword(auth,email, password);
      const user = res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,

      })
    } catch (error){
       console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(""));
       alert(error)
    }
    
}

const login = async (email,password)=>{
    try{
        signInWithEmailAndPassword(auth,email,password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}
const logout = () =>{
    signOut(auth);
}
export {auth, db, login, signup, logout}