import './DateMenu.css';
import { formatDateWithDayShort } from '../../utils/date_util';

const ForwardArrow = () => {
  return (
    <button class="date-menu-arrow-button">
      <div id="forward-arrow">
        <span class="svg" data-component="Icon" >
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06z" fill="currentColor">
            </path>
          </svg>
        </span>
      </div> 
    </button>
  ) 
}

const BackArrow = () => {
  return (
    <button data-qa="DateFilter.selection.date-previous" aria-label="search previous date" class="date-menu-arrow-button" data-component="Button">
      <div class="_3b_8ZCNx4tTmunLJDRFdOL _2u2UeNPjmjnJef9u7V6wI_" data-component="DisclosureArrow" id="back-arrow">
        <span class="svg" data-component="Icon" >
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06z" fill="currentColor">
            </path>
          </svg>
        </span>
      </div>
    </button>
  )
}

export const DateMenu = ({className="dateMenu", id="", options, placeholder, setReviewLessonFromDropdown, setSearchParams, source="", value, setValue})=> {
  let today = new Date();
  
  return (
    <div className={className} id={id}>
        <div className="dateMenuLabel">{formatDateWithDayShort(today)}</div>
        <BackArrow />
        <ForwardArrow />
    </div>
    
  )
}

export default DateMenu;