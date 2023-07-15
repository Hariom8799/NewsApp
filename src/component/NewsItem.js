import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const NewsItem = (props) => {
  return (
    <>
      {/* <img
        src={
          props.imgUrl == null
            ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
            : props.imgUrl
        }
        className="card-img-top"
        alt="..."
      /> */}
      <LazyLoadImage
        className="w-100 transition imgWrapper"
        effect="blur"
        src={   props.imgUrl == null
          ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
          : props.imgUrl}
        placeholderSrc=""
        alt="Thumb"
      />

      <div className="card-body">
        <h5 className="card-title">{props.title}...</h5>
        <p className="card-text">{props.description}...</p>
        <a
          href={props.url}
          className="btn btn-sm btn-primary"
          target="_blank"
          rel="noreferrer"
        >
          Read More
        </a>
      </div>
    </>
  );
};

export default NewsItem;
