import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.reposData()
  }

  activeFilter = activeFilterId => {
    this.setState({activeFilterId}, this.reposData)
  }

  reposData = async () => {
    const {activeFilterId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        avatarUrl: each.avatar_url,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFilterList = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="filters-list">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            filterDetails={each}
            isActive={activeFilterId === each.id}
            activeFilter={this.activeFilter}
          />
        ))}
      </ul>
    )
  }

  renderRepositoriesList = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-heading">Popular</h1>
        {this.renderFilterList()}
        {this.renderContent()}
      </div>
    )
  }
}
export default GithubPopularRepos
