

export default function CommentsList({comments}){

    return <div className="comments-list">
        <h3>Comments</h3>
        {
            comments && comments.length > 0
            ? comments.map(i=>(
                <div key={i.user + ':' + i.text} className="comments">
                    <h4>{i.user}</h4>
                    <p>{i.text}</p>
                </div>
            ))
            : <p>No comments yet</p>
        }
    </div>
}