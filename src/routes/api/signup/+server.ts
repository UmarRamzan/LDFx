import { app } from "$lib/firebase";
import { 
    getAuth, 
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    createUserWithEmailAndPassword
} from "firebase/auth"

import { addUser } from '$lib/userDB';
import { json } from "@sveltejs/kit";

const signup = (email:string, password:string, accountType:string) => {

    const auth = getAuth(app);

    const actionCodeSettings = {
        url: 'http://localhost:5173/linkConfirmation',
        handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        console.log("Link Sent");
        window.localStorage.setItem('emailForSignIn', email);
        window.localStorage.setItem('passwordForSignIn', password);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    }); 
}

const emailLinkConfirmation = () => {

    const auth = getAuth(app);

    if (isSignInWithEmailLink(auth, window.location.href)) {

        let email = window.localStorage.getItem('emailForSignIn');
        let password = window.localStorage.getItem('passwordForSignIn');

        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('passwordForSignIn');
      }
}

interface User {
    email: string;
    password: string;
    accountType: string;
  }
  
interface SignUpResponse {
    success: boolean;
    body?: User;
    error?: {
      message: string;
    };
}
  
const SignUpDummy = async (userData: User): Promise<SignUpResponse> => {
    if (!userData.email || !userData.password || !userData.accountType) {
      return {
        success: false,
        error: {
          message: "Please provide email, password, and account type.",
        },
      };
    }
  
    const user = await addUser(userData.email, userData.password, userData.accountType);
    return {
        success: true,
        body: user.user,
    }
};


export { signup, emailLinkConfirmation, SignUpDummy }