import { useState } from "react";
import axios from 'axios';

export default function CommentsForm({url, articleName, updateArticle}){

    const [name, setName] = useState('');
    const [comment, setcomment] = useState('');

    async function addComment(){

        try {

            const obj = {
                user: name,
                text: comment
            };
            
            await axios.post(`${url}/api/articles/${articleName}/comments`, obj);

            updateArticle();

            setName('');
            setcomment('');
            
        } catch (error) {
            console.log(error);
        }
    }

    return <div id="add-comment-form">

        <h3>Add a comment</h3>

        <label>
            Name:
            <input type="text" value={name} onChange={(e)=>setName(n=>n=e.target.value)} />
        </label>

        <label>
            Comment:
            <textarea name="comment" cols="50" rows="4" value={comment} onChange={(e)=>setcomment(c=>c=e.target.value)}></textarea>
        </label>

        <button onClick={addComment}>add Comment</button>
    </div>
}