import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
   capitalizeFirst= (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static propTypes = {

  }
  constructor(props){
    super(props);
    this.state ={
      articles : [],
      loading : false,
      page : 1,
      totalResults : 0
    } 
    document.title = `${this.capitalizeFirst(this.props.category)}`
  }


  // fetch = async ()=>{
  //     let apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e08ef77a4d974d1ab15ec9bb6d0b188d&page=${ele}&pageSize=${this.props.pageSize}`
  //     this.setState({loading:true})
  //     let data = await fetch(apiurl)
  //     let parseData = await data.json()
      
  // }
  fetchData = async ()=>{
    this.props.setProgress(10);
      let apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading : true})
      let data = await fetch(apiurl)
      this.props.setProgress(30);
      let parseData = await data.json()
      this.props.setProgress(70);
      this.setState({
        articles: parseData.articles,
        totalResults : parseData.totalResults,
        loading : false
      })
      this.props.setProgress(100);
  }
  async componentDidMount(){
     this.fetchData();
  }

  // previousBtn = async ()=>{
    
  //   this.setState({
  //     page : this.state.page-1,
  //   })
  //     this.fetchData(this.state.page-1);
  //   }
  
  // nextBtn = async ()=>{
    
  //     this.setState({
  //       page : this.state.page+1,
  //     })
  //       this.fetchData(this.state.page+1);
    
  // }
  fetchMoreData = async() => {
     this.setState({page:this.state.page+1})
     let apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      
      let data = await fetch(apiurl)
      let parseData = await data.json()
      this.setState({
        articles: this.state.articles.concat( parseData.articles),
        totalResults : parseData.totalResults,
       
      })
      
    }
  

  render() {
    return (
      <>
        <h1 className='text-center'>TazaKhabar - Top {this.capitalizeFirst(this.props.category)} Headlines</h1>
        <hr />
        {this.state.loading && <Loading/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize) ? "": <Loading/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((ele)=>{
            return <div className="col-md-4" key={ele.url}>
            <NewsItem title={ele.title} description={ele.description} imgUrl={ele.urlToImage} url={ele.url} />
          </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around">
        <button type="button" disabled={this.state.page <=1} className="btn btn-primary" onClick={this.previousBtn}>&larr; Prevoius</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.nextBtn}>Next &rarr;</button>
        </div> */}
      
      </>
    )
  }
}

export default News
