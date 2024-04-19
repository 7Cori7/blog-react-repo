

export default function Message({error, message}){

    if(error){
        return <p className="error">{message}</p>
    }else{
        return <p className="message">{message}</p>
    }
}