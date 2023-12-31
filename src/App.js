import './App.css';
import React,{useState} from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  const [prog, setProg] = useState(0);
  
  const setProgress = (progress)=>{
    setProg(progress)
  }

    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={prog}
        
        />
          <NavBar/>
          <Routes>
          <Route exact path="/"   element={<News setProgress={setProgress} apiKey={apiKey} pageSize={9} key="general" country="in" category="general"/>}/>
          <Route exact path="/business"  element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={9} country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={9} country="in" category="entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country="in" category="general"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={9} country="in" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={9} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={9} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={9} country="in" category="technology"/>}/>

          </Routes>
          
        </Router>
        
      </div>
    )
  
}

