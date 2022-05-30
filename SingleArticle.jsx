const noimageurl = '/assets/noimage.png';

function SingleArticle(props){

    return (

        <div key={props.key} className='article-wrapper'>

            <div className='article-image-wrapper'>
                {props.image_url ? <div className='article-image' style={{backgroundImage: `url(${props.image_url})`}}></div> : <div className='article-image' style={{backgroundImage: `url(${noimageurl})`}}></div>}    
            </div>
            
            <ul></ul>
            
            <div className='article-body'>

                <h4>{props.title}</h4>

                <p>{props.description}</p>

            </div>

            <div className='article-button'>
                <a href={props.link}>GO TO ARTICLE</a>
            </div>

        </div>

    );

}

export default SingleArticle;