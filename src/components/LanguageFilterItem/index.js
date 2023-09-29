import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, activeFilter, isActive} = props
  const {language, id} = filterDetails

  const filterButton = isActive ? 'filter-btn active' : 'filter-btn'

  const onClickFilter = () => {
    activeFilter(id)
  }

  return (
    <li className="filter-item">
      <button type="button" className={filterButton} onClick={onClickFilter}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
