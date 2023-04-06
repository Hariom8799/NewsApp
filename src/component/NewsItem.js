import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,url} = this.props;
    return (
      <div className="my-4">
        <div className="card">
          <img src={imgUrl==null?"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : imgUrl } className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={url}  className="btn btn-sm btn-primary" target="_blank" rel="noreferrer">Read More</a>
            </div>
        </div>
      </div>
        
      
    )
  }
}

export default NewsItem
