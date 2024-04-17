import homeContent from "./home-content";

export default function HomePage(){

    return <>
        {
            homeContent.map((item, index) => (

                <div key={index}>

                    <h1>{item.title}</h1>

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
    </>;
}