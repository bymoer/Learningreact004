import { useEffect, useState } from 'react';
import './App.css';
import {Container, Row} from 'react-bootstrap';
import SingleArticle from './SingleArticle';

const url = 'https://newsdata.io/api/1/news?apikey=<YOUR_API_KEY>'

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  
  useEffect(() => {
    
    const fetchArticles = async () => {
      await fetch(url + '&language=' + selectedLanguage)
              .then((response) => {
                if (response.ok) return response.json();
                throw new Error('No can do!');
              })
              .then((newsArticles) => setNewsArticles(newsArticles.results))
              .catch((error) => setError(error.message));
    }

    fetchArticles()
    
  }, []);

  // when changing input value for search string
  function changeValue(event){
    setSearchValue(event.target.value);

    // console.log({searchValue});
  }

  // Change language
  function changeLanguage(event){
    setSelectedLanguage(event.target.value);
  }

  // when performing search
  async function searchNews(event){
    
    event.preventDefault();

    // console.log('This is the value: ' + searchValue);

    await fetch(url + '&q=' + searchValue + '&language=' + selectedLanguage)
            .then((response) => {
              if(response.ok) return response.json();
              throw new Error('Que ?');
            })
            .then((newsArticles) => setNewsArticles(newsArticles.results))
            .catch((error) => setError(error.message));
  }

  return (
    <div>

      <div>
        <h1 className='app-title'>News App 01</h1>
      </div>
      
      <div className='search-form-wrapper'>
        <form>
          <label>
            
            <input type='text' value={searchValue} onChange={changeValue} placeholder='Enter search string ?' name='searchstring'/>
          </label>
          <input type='submit' value='Search' onClick={searchNews} />
          <br/><br/>
          <label>
            Select language
            <select value={selectedLanguage} onChange={changeLanguage}>
              <option value='en'>English</option>
              <option value='fr'>French</option>
              <option value='de'>German</option>
            </select>
          </label>
        </form>      
      </div>

      {error && <h3 className='error-message'>Error getting news: {error}</h3>}

      <div className='article-list-wrapper'>
        
        {console.log(newsArticles)}
        
        {newsArticles.map((newsArticle) => (
          <SingleArticle
            title={newsArticle.title}
            description={newsArticle.description}
            image_url={newsArticle.image_url}
            link={newsArticle.link}
          />
        ))}
        
      </div>

    </div>
  );
}

export default App;
