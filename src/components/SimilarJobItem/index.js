import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="similar-job-item">
      <li>
        <div className="similar-job-company-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="similar-jobs-description-heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
        <p className="similar-job-location-text">
          <MdLocationOn className="similar-job-react-location-icon" />
          {location}
          <BsBriefcaseFill className="similar-job-react-work-icon" />
          {employmentType}
        </p>
      </li>
    </Link>
  )
}

export default SimilarJobItem
