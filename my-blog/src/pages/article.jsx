import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import axios from 'axios';
import articles from './article-content';
import NotFoundPage from "./not-found";
import CommentsList from "../components/comments-list.jsx";
import CommentsForm from "../components/comments-form.jsx";
import Message from "../components/message.jsx";
import Spinner from "../components/spinner.jsx";

export default function ArticlePage({url}){

    const { currentUser } = useAuth();
    const {articleId} = useParams();

    const article = articles.find(article => article.name === articleId);
    const [articleInfo, setArticleInfo] = useState({votes: 0, comments: [], users: []});
    const [voted, setVoted] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(null);

    //* GET DATA:
    async function getData(){
        try{

            setLoading(true);

            const response = await axios.get(`${url}/api/articles/${articleId}`);
            const article = response.data;

            if(article){

                setTimeout(()=>{
                    setArticleInfo({votes: article.article.votes, comments: article.article.comments, users: article.article.users});
                    setLoading(false);
                }, 1000);
            }

        }catch(error){
            console.error(error);
        }
    };

    useEffect(()=>{
        
        getData();
    },[]);

    //* WHEN ARTICLE INFO IS UPDATED:
    useEffect(()=>{

        // Check if there's an user logged in:
        if(currentUser){

            // Check if the user voted the article or not:
            const userVoted = articleInfo.users.some(user => user === currentUser.email);
            setVoted(userVoted);
        }else{

            setVoted(false);
        }
    }, [articleInfo]);

    //* UPVOTE ARTICLE:
    async function upvoteArticle(){

        try {

            if(currentUser !== null){

                const obj = {
                    user: currentUser.email
                }

                await axios.put(`${url}/api/articles/${articleId}/upvote`, obj);
                
                getData();
            }else{

                setMessage('You must be logged in to upvote this article')
            }

            setTimeout(()=>{
                setMessage(null);
                setError(false);
            }, 2000);
            
        } catch (error) {
            console.log(error)
        }
    };

    // If the article doesn't exist:
    if(!article){
        
        return <NotFoundPage />
    };

    // If the article exist:
    return <>

        {message !== null && <Message error={error} message={message} />}

        <div className="title">
            <h1>{article.title}</h1>
        </div>
        
        <div className="upvotes-section">
            {
                loading ? <Spinner />
                : <p>This article has {articleInfo.votes} upvote(s)</p>
            }
            <button onClick={upvoteArticle}>
                {
                    voted ? <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'2px'}}> 
                        Voted<span className="material-symbols-outlined">done</span>
                        </div>
                    : 'Upvote'
                }
            </button>
        </div>
        
        <div className="article-content">
            {
                article.content.map((i, index) => (

                    <p key={index}>{i}</p>
                ))
            }

            <CommentsForm url={url} articleName={articleId} updateArticle={getData} />

            {
                loading ? <Spinner />
                : <CommentsList comments={articleInfo.comments} />
            }
        </div>
    </>;
}