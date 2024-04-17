import ArticlesList from '../components/articles-L-comp';
import articles from './article-content';

export default function ArticlesListPage(){

    return <>

        <h1>Articles</h1>

        <div className='articles-list'>

            <ArticlesList articles={articles} />
        </div>
    </>;
}