import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-list-item">
        <div className="company-name-logo">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="company-name">{title}</h1>
            <p className="company-rating">
              <AiFillStar className="rating-star-logo" /> {rating}
            </p>
          </div>
        </div>
        <div className="location-and-employment-container">
          <p className="location-and-employment-type">
            <MdLocationOn className="location-icon" />
            {location} <BsBriefcaseFill className="work-icon" />
            {employmentType}
          </p>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="job-item-horizontal-rule" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
