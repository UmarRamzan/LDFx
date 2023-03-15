// @ts-nocheck
let users = {
    list:[
        {
            email:"abc@gmail.com",
            password:"1234",
            accountType:"Student"
        }
    ]
}

//@ts-ignore
async function addUser(_email,_password,_accountType){
    let temp = {
        email:_email,
        password:_password,
        accountType:_accountType
    }
    users.list.push(temp)
    return {user:temp}
}

//@ts-ignore
async function signIn(_email,_password){
    let user = users.list.find(i=>(i.email===_email && i.password===_password))
    if (user){
        return {user:user,error:{}}
    }else{
        return {user:{},error:"error"}
    }
}


export {addUser,signIn}