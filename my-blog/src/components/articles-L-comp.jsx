import { Link } from 'react-router-dom';

export default function ArticlesList({articles}){

    return <>

        {
            articles.map((article, index) => (

                <Link to={`/articles/${article.name}`} key={index} className='card'>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 150)}...</p>
                </Link>

            ))
        }

    </>;
}