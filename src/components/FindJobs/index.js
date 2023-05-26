import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import EmploymentTypeListItem from '../employmentTypeListItem'
import SalaryRangeListItem from '../SalaryRangeListItem'
import './index.css'

const isProfileLoadingConstants = {
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Initial: 'INITIAL',
  Loading: 'Loading',
}

const isJobsLoadingConstants = {
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Initial: 'INITIAL',
  Loading: 'Loading',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FindJobs extends Component {
  state = {
    profileDetails: {},
    isProfileLoading: isProfileLoadingConstants.Initial,
    isJobsLoading: isJobsLoadingConstants.Initial,
    employmentType: [],
    searchInput: '',
    salaryRange: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  jobSearchBtnClicked = () => {
    this.getJobList()
  }

  changeEmploymentType = id => {
    const {employmentType} = this.state
    console.log('change Employment triggered')
    if (employmentType.includes(id) === true) {
      const newEmploymentTypeList = employmentType.filter(each => each !== id)
      this.setState({employmentType: newEmploymentTypeList}, this.getJobList)
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobList,
      )
    }
  }

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobList)
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

  getJobList = async () => {
    this.setState({isJobsLoading: isJobsLoadingConstants.Loading})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, searchInput, salaryRange} = this.state
    console.log(employmentType)
    const employmentTypeQueryParameter = employmentType.join(',')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQueryParameter}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsData = data.jobs
      const formattedJobsData = jobsData.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        isJobsLoading: isJobsLoadingConstants.Success,
        jobsList: formattedJobsData,
      })
    } else {
      this.setState({isJobsLoading: isJobsLoadingConstants.Failure})
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
            <button
              type="button"
              onClick={this.getProfileDetails}
              className="retry-button"
            >
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

  displayJobs = () => {
    const {isJobsLoading, jobsList} = this.state
    switch (isJobsLoading) {
      case isJobsLoadingConstants.Loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case isJobsLoadingConstants.Failure:
        return (
          <div className="jobs-list-failure-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1 className="jobs-list-failure-heading">
              Oops! Something Went Wrong
            </h1>
            <p className="jobs-list-failure-description">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              type="button"
              className="retry-button"
              onClick={this.getJobList}
            >
              Retry
            </button>
          </div>
        )
      case isJobsLoadingConstants.Success:
        if (jobsList.length === 0) {
          return (
            <div className="jobs-list-failure-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1 className="jobs-list-failure-heading">No Jobs Found</h1>
              <p className="jobs-list-failure-description">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          )
        }
        return (
          <ul className="jobs-list-success-view">
            {jobsList.map(each => (
              <JobItem each={each} key={each.id} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="find-jobs-bg-container">
        <Header />
        <div className="find-jobs-bottom-section">
          <div className="filters-section">
            <div className="mobile-search-bar">
              <input
                type="search"
                className="find-jobs-input-element"
                value={searchInput}
                placeholder="search"
                onChange={this.onChangeSearchInput}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.jobSearchBtnClicked}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.displayProfile()}
            <hr className="horizontal-rule" />
            <h1 className="filter-section-side-heading">Type of Employment</h1>
            <ul className="filter-list-container">
              {employmentTypesList.map(each => (
                <EmploymentTypeListItem
                  key={each.employmentTypeId}
                  each={each}
                  changeEmploymentType={this.changeEmploymentType}
                />
              ))}
            </ul>
            <hr className="horizontal-rule" />
            <h1 className="filter-section-side-heading">Salary Range</h1>
            <ul className="filter-list-container">
              {salaryRangesList.map(each => (
                <SalaryRangeListItem
                  key={each.salaryRangeId}
                  each={each}
                  changeSalaryRange={this.changeSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-section">
            <div className="desktop-search-bar">
              <input
                type="search"
                className="find-jobs-input-element"
                value={searchInput}
                placeholder="search"
                onChange={this.onChangeSearchInput}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.jobSearchBtnClicked}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.displayJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default FindJobs
