import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

export class News extends Component {
  constructor(){
    super();
    this.state ={
      articles : [],
      loading : false,
      page : 1
    }

    
  }

  fetchData = async (ele)=>{
      let apiurl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e08ef77a4d974d1ab15ec9bb6d0b188d&page=${ele}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(apiurl)
      let parseData = await data.json()
      this.setState({
        articles: parseData.articles,
        totalResults : parseData.totalResults,
        loading:false
      })
  }
  async componentDidMount(){
     this.fetchData(this.state.page);
  }

  previousBtn = async ()=>{
    
    this.setState({
      page : this.state.page-1,
    })
      this.fetchData(this.state.page-1);
    }
  
  nextBtn = async ()=>{
    
      this.setState({
        page : this.state.page+1,
      })
        this.fetchData(this.state.page+1);
    
  }

  render() {
    return (
      <div className="container my-4">
        <h1>TazaKhabar - Top Headlines</h1>
        <hr />
        {this.state.loading && <Loading/>}
        <div className="row">
          {this.state.articles.map((ele)=>{
            return <div className="col-md-4" key={ele.url}>
            <NewsItem title={ele.title} description={ele.description} imgUrl={ele.urlToImage} url={ele.url} />
          </div>
          })}
        </div>
        <div className="container d-flex justify-content-around">
        <button type="button" disabled={this.state.page <=1} className="btn btn-primary" onClick={this.previousBtn}>&larr; Prevoius</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.nextBtn}>Next &rarr;</button>
        </div>
      </div>

    )
  }
}

export default News
