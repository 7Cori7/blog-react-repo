import aboutContent from './about-content.js';

export default function AboutPage(){

    return <>
        {
            aboutContent.map((item, index)=>(
                <div key={index}>
                    <div className='titles'>
                        <h1>{item.title}</h1>
                    </div>
                    <div className='page-Content'>
                        {
                            item.content.map((i,ind)=>(
                                <p key={ind}>{i}</p>
                            ))
                        }
                    </div>
                </div>
            ))
        } 
    </>;
}