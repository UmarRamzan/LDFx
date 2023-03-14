import { app } from "$lib/firebase";
import { 
    getAuth, 
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    createUserWithEmailAndPassword
} from "firebase/auth"

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

export { signup, emailLinkConfirmation }