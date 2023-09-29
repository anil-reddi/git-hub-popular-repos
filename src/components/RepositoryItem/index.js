import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = repoDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="name">{name}</h1>
      <div className="state-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="state-icon"
        />
        <p className="state-text">{starsCount} stars</p>
      </div>
      <div className="state-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="state-icon"
        />
        <p className="state-text">{forksCount} forks</p>
      </div>
      <div className="state-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="state-icon"
        />
        <p className="state-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
