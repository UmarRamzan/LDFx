import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAYJU9Ds4Ye8UDyegLnljYcOAcqtBzYhfQ",
	authDomain: "ldfx-8ac24.firebaseapp.com",
	projectId: "ldfx-8ac24",
	storageBucket: "ldfx-8ac24.appspot.com",
	messagingSenderId: "763390996320",
	appId: "1:763390996320:web:c7849007704a4b3311f805"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
