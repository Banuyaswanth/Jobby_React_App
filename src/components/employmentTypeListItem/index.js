const EmploymentTypeListItem = props => {
  const {changeEmploymentType, each} = props
  const {label, employmentTypeId} = each
  const onChangeCheckbox = () => {
    changeEmploymentType(employmentTypeId)
  }

  return (
    <li className="list-item" key={employmentTypeId}>
      <input
        value={employmentTypeId}
        type="checkbox"
        id={employmentTypeId}
        className="checkbox"
        onClick={onChangeCheckbox}
      />
      <label className="checkbox-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeListItem
