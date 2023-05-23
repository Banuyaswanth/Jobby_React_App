import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkLine} from 'react-icons/ri'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const isLoadingConstants = {
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Loading: 'LOADING',
  Initial: 'INITIAL',
}

class DetailedJobItem extends Component {
  state = {
    jobDetailsState: {},
    lifeAtCompanyState: {},
    skillsListState: [],
    similarJobsState: [],
    isLoading: isLoadingConstants.Initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: isLoadingConstants.Loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log('get job details triggered')
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobDetails = data.job_details
      const LifeAtCompany = jobDetails.life_at_company
      const skillsList = jobDetails.skills
      const similarJobs = data.similar_jobs
      const formattedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const formattedLifeAtCompany = {
        LACdescription: LifeAtCompany.description,
        LACimageUrl: LifeAtCompany.image_url,
      }
      const formattedSkillsList = skillsList.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const formattedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        isLoading: isLoadingConstants.Success,
        jobDetailsState: formattedJobDetails,
        lifeAtCompanyState: formattedLifeAtCompany,
        skillsListState: formattedSkillsList,
        similarJobsState: formattedSimilarJobs,
      })
    } else {
      this.setState({isLoading: isLoadingConstants.Failure})
    }
  }

  displayDetailedJobItem = () => {
    const {
      jobDetailsState,
      lifeAtCompanyState,
      skillsListState,
      similarJobsState,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsState
    const {LACdescription, LACimageUrl} = lifeAtCompanyState

    return (
      <>
        <div className="detailed-job-item">
          <div className="company-title-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="company-title">{title}</h1>
              <p className="company-rating">
                <AiFillStar className="star-logo" />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-package-container">
            <p className="location-text">
              <MdLocationOn className="react-location-icon" />
              {location}
              <BsBriefcaseFill className="react-work-icon" />
              {employmentType}
            </p>
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="detailed-job-hr" />
          <div className="description-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit"
            >
              Visit
              <RiExternalLinkLine className="visit-icon" />
            </a>
          </div>
          <p className="detailed-job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skillsListState.map(each => (
              <li key={each.name} className="skill-list-item">
                <img
                  className="skill-list-icon"
                  src={each.imageUrl}
                  alt={each.name}
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at company</h1>
          <div className="life-at-company-description">
            <p>{LACdescription}</p>
            <img
              src={LACimageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsState.map(each => (
            <SimilarJobItem key={each.id} each={each} />
          ))}
        </ul>
      </>
    )
  }

  renderDetailedJobItemView = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case isLoadingConstants.Loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case isLoadingConstants.Failure:
        return (
          <div className="detailed-job-item-failure-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1 className="detailed-job-item-failure-heading">
              Oops! Something Went Wrong
            </h1>
            <p className="detailed-job-item-failure-description">
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
      case isLoadingConstants.Success:
        return this.displayDetailedJobItem()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="detailed-job-view-container">
          {this.renderDetailedJobItemView()}
        </div>
      </div>
    )
  }
}

export default DetailedJobItem
