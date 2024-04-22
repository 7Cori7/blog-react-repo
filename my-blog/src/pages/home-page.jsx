import { useEffect, useState } from 'react';
import homeContent from "./home-content";
import axios from 'axios';
import ArticlesList from '../components/articles-L-comp';
import Spinner from '../components/spinner';

export default function HomePage({url, theme}){

    const [sortedArticles, setSortedArticles] = useState([]);
    const [loadign, setLoadign] = useState(false);

    function sortArticles(artc){

        const sorting = artc.sort((a,b) => b.votes - a.votes);

        let demoList = [];
        let max;

        if(sorting.length < 4){

            max = 2;
        }else{
    
            max = 4;
        }
    
        for(let i = 0; i < max; i++){
    
            demoList.push(sorting[i]);
        };
            
        setSortedArticles(demoList);
    };

    async function getData(){

        try {
            setLoadign(true);
            const response = await axios.get(`${url}/api/articles-info`);
            const data = response.data.data;

            if(data.length > 0){

                sortArticles(data);
            }else{

                setSortedArticles(data);
            }

            setTimeout(()=>{
                setLoadign(false);
            }, 1000);
            
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{

        getData();

    }, [url]);

    return <>
        {
            homeContent.map((item, index) => (

                <div key={index}>
                    <div className='titles'>
                        <h1>{item.title}</h1>
                    </div>

                    <div className="page-Content">
                        {
                            item.content.map((i,ind)=>(
                                <p key={ind}>{i}</p>
                            ))
                        }
                    </div>
                </div>
            ))
        }

        <div className='most-popular-sect'>

            <h3>Most popular articles:</h3>
            
            {
                loadign ? <Spinner theme={theme} /> 
                :
                <div className='articles-list'>
                    <ArticlesList articles={sortedArticles} />
                </div>
            }
            
        </div>
    </>;
}