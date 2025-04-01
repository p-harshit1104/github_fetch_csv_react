import React, { useEffect ,useState} from 'react'
import './Card.css'

const Card = (props) => {
    const [data, setData] = useState([])
    const [repos, setRepos] = useState([]);
    const res=props.github.split('/')
    
    const userId=res[3];
    const getData=async () => {
        const response = await fetch(`https://api.github.com/users/${userId}`)
        const data = await response.json()
        setData(data)

        const repoResponse = await fetch(`https://api.github.com/users/${userId}/repos`);
    const repoData = await repoResponse.json();
    setRepos(repoData);
  }
    

    useEffect(()=>{
        getData()
    },[])
    return (
      <div>
        
        <div className="card">
          <h2>{props.name}</h2>
          <p>{props.email}</p>
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            Click for Github
          </a>
          <br />
          <br />
          <img width={100} src={data.avatar_url} alt={props.name} />
          <h3>Repositories:</h3>
          <ul>
            {repos.length > 0 ? (
              repos.slice(0,5).map((repo, idx) => (
                <li key={idx}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </li>
              ))
            ) : (
              <p>No repositories found</p>
            )}
          </ul>
        </div>
      </div>
    );
}

export default Card
