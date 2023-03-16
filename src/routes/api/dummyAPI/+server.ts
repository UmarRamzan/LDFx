import { signIn,addUser } from "$lib/userDB";



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

interface SignUpResponse {
    success: boolean;
    body?: User;
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


export { LoginDummy,SignUpDummy}