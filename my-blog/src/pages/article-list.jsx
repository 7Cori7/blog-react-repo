import ArticlesList from '../components/articles-L-comp';
import articles from './article-content';

export default function ArticlesListPage(){

    return <>

        <div className='titles'>
            <h1>Articles</h1>
        </div>

        <div className='articles-list'>

            <ArticlesList articles={articles} />
        </div>
    </>;
}