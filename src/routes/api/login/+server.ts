import { app } from "$lib/firebase";
import { json } from "@sveltejs/kit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import type { RequestHandler } from "./$types";
import { signIn } from "$lib/userDB";


const auth = getAuth(app);

const login = (email:string, password:string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        return user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}


interface User {
    email: string;
    password: string;
    accountType: string
  }
  
interface LoginResponse {
    success: boolean;
    body?: User|{};
    error?: {
      message: string;
    };
}
  
const LoginDummy = async (userData: User): Promise<LoginResponse> => {
    if (!userData) {
      return {
        success: false,
        error: {
          message: "Cannot login without credentials.",
        },
      };
    }

    const res = await signIn(userData.email, userData.password);
    console.log(res)
    if (res.error==="error"){
        return{
            success:false,
            error:{message:"email not found/valid"}
        }
    }

    return {
        success: true,
        body: res.user,
    };

};

export { login,LoginDummy }