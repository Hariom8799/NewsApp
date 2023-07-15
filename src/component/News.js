import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
   const capitalizeFirst= (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

   

  const fetchData = async ()=>{
    props.setProgress(10);
      let apiurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setLoading(true);
      let data = await fetch(apiurl)
      props.setProgress(30);
      let parseData = await data.json()
      props.setProgress(70);
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      props.setProgress(100);
  }

  useEffect(() => {
      document.title = `${capitalizeFirst(props.category)} - TazaKhabar`
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const fetchMoreData = async() => {
    setPage(page+1);
     let apiurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
      
      let data = await fetch(apiurl)
      let parseData = await data.json()
      setArticles(articles.concat( parseData.articles));
      setTotalResults(parseData.totalResults);
      
    }
  

    return (
      <>
        <h1 className='text-center' style={{marginTop:'90px'}}>TazaKhabar - Top {capitalizeFirst(props.category)} Headlines</h1>
        <hr />
        {loading && <Loading/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={page+1 > Math.ceil(totalResults/props.pageSize) ? "": <Loading/>}
        >
          <div className="container">
        <div className="row newsCard">
          {articles.map((ele)=>{
            return <div className="col-md-4 my-3 card border-0 shadow" key={ele.url}>
            <NewsItem title={ele.title} description={ele.description} imgUrl={ele.urlToImage} url={ele.url} />
          </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around">
        <button type="button" disabled={this.state.page <=1} className="btn btn-primary" onClick={this.previousBtn}>&larr; Prevoius</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} className="btn btn-primary" onClick={this.nextBtn}>Next &rarr;</button>
        </div> */}
      
      </>
    )
  
}

export default News
