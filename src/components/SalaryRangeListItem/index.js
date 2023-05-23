const SalaryRangeListItem = props => {
  const {each, changeSalaryRange} = props
  const {salaryRangeId, label} = each

  const salaryRangeChanged = event => {
    console.log(event)
    console.log(event.target.checked)
    changeSalaryRange(salaryRangeId)
  }

  return (
    <li className="list-item" key={salaryRangeId}>
      <input
        name="salary"
        className="radio-button"
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={salaryRangeChanged}
      />
      <label className="radio-button-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeListItem
