import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from 'axios';

export default function CommentsForm({url, articleName, updateArticle}){

    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [comment, setcomment] = useState('');

    async function addComment(){

        try {

            if(!name || !comment) return;

            const obj = {
                user: name,
                text: comment
            };
            
            await axios.post(`${url}/articles/${articleName}/comments`, obj);

            updateArticle();

            setName('');
            setcomment('');

        } catch (error) {
            console.log(error);
        }
    }

    async function getUsername(){
        try {

            const response = await axios.get(`${url}/get/users`);
            const usersList = response.data.data;

            if(usersList && usersList.length > 0 && currentUser){

                const currUser = usersList.find(i => i.email === currentUser.email);

                if(currUser){
                    setName(currUser.name);
                }
            }
        } catch (error) {

            throw new Error(error);
        }
    }

    useEffect(()=>{

        getUsername();
    }, []);

    return <div id="add-comment-form">

        <h3>Add a comment</h3>

        <label>
            <div className="label-text">Name:</div>
            <input type="text" value={name} onChange={(e)=>setName(n=>n=e.target.value)} />
        </label>

        <label>
            <div className="label-text">Comment:</div>
            <textarea name="comment" cols="50" rows="4" value={comment} onChange={(e)=>setcomment(c=>c=e.target.value)}></textarea>
        </label>

        <button onClick={addComment}>add Comment</button>
    </div>
}