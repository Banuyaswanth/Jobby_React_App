import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button onClick={onClickFindJobs} className="home-find-jobs-button">
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default withRouter(Home)
