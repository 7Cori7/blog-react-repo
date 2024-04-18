import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import axios from 'axios';
import articles from './article-content';
import NotFoundPage from "./not-found";
import CommentsList from "../components/comments-list.jsx";
import CommentsForm from "../components/comments-form.jsx";

export default function ArticlePage({url}){

    const { currentUser } = useAuth();

    const {articleId} = useParams();

    const article = articles.find(article => article.name === articleId);
    
    const [articleInfo, setArticleInfo] = useState({votes: 0, comments: []});

    const [loading, setLoading] = useState(false);

    // TODO: make a spinner to display when loading

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

    //* UPVOTE ARTICLE:
    async function upvoteArticle(){

        try {

            if(currentUser !== null){

                const obj = {
                    user: currentUser.email
                }

                await axios.put(`${url}/api/articles/${articleId}/upvote`, obj);
                
                getData();
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    if(!article){
        
        return <NotFoundPage />
    };

    return <>
    
        <h1>{article.title}</h1>

        <div className="upvotes-section">
            {
                loading ? <p>Loading data⌛...Please wait</p>
                : <p>This article has {articleInfo.votes} upvote(s)</p>
            }
            <button onClick={upvoteArticle}>Upvote</button>
        </div>
        
        <div className="article-content">
            {
                article.content.map((i, index) => (

                    <p key={index}>{i}</p>
                ))
            }

            <CommentsForm url={url} articleName={articleId} updateArticle={getData} />

            {
                loading ? <p>Loading data⌛...Please wait</p>
                : <CommentsList comments={articleInfo.comments} />
            }
        </div>
    </>;
}