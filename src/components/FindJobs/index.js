import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const isProfileLoadingConstants = {
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Initial: 'INITIAL',
  Loading: 'Loading',
}

class FindJobs extends Component {
  state = {
    profileDetails: {},
    isProfileLoading: isProfileLoadingConstants.Initial,
    isJobsLoading: true,
    employmentType: [],
    searchInput: '',
    salaryRange: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({isProfileLoading: isProfileLoadingConstants.Loading})
    const jwtToken = Cookies.get('jwt_token')
    const profileDetailsUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileDetailsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.profile_details
      const profileDetails = {
        name: formattedData.name,
        profileImageUrl: formattedData.profile_image_url,
        shortBio: formattedData.short_bio,
      }
      this.setState({
        isProfileLoading: isProfileLoadingConstants.Success,
        profileDetails,
      })
    } else {
      this.setState({isProfileLoading: isProfileLoadingConstants.Failure})
    }
  }

  displayProfile = () => {
    const {profileDetails, isProfileLoading} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    switch (isProfileLoading) {
      case isProfileLoadingConstants.Loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case isProfileLoadingConstants.Failure:
        return (
          <div className="profile-loading-failure">
            <button onClick={this.getProfileDetails} className="retry-button">
              Retry
            </button>
          </div>
        )
      case isProfileLoadingConstants.Success:
        return (
          <div className="profile-container">
            <img src={profileImageUrl} alt="profile" className="profile-pic" />
            <h1 className="profile-name">{name}</h1>
            <p>{shortBio}</p>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {isJobsLoading, jobsList, searchInput} = this.state
    return (
      <div className="find-jobs-bg-container">
        <Header />
        <div className="find-jobs-bottom-section">
          <div className="filters-section">
            <div className="search-bar">
              <input
                className="input-element"
                value={searchInput}
                placeholder="search"
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.displayProfile()}
            <hr className="horizontal-rule" />
          </div>
        </div>
      </div>
    )
  }
}

export default FindJobs
