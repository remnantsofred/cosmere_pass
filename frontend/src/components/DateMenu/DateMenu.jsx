import './DateMenu.css';
import { formatDateWithDayShort } from '../../utils/date_util';

const ForwardArrow = () => {
  return (
    <button className="date-menu-arrow-button">
      <div id="forward-arrow">
        <span className="svg" data-component="Icon" >
          <svg width="24" height="24" fillRule="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06z" fill="currentColor">
            </path>
          </svg>
        </span>
      </div> 
    </button>
  ) 
}

const BackArrow = () => {
  return (
    <button data-qa="DateFilter.selection.date-previous" aria-label="search previous date" className="date-menu-arrow-button" data-component="Button">
      <div className="_3b_8ZCNx4tTmunLJDRFdOL _2u2UeNPjmjnJef9u7V6wI_" data-component="DisclosureArrow" id="back-arrow">
        <span className="svg" data-component="Icon" >
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.47 9.47a.75.75 0 0 1 1.06 0L12 12.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06z" fill="currentColor">
            </path>
          </svg>
        </span>
      </div>
    </button>
  )
}

const handleBackDate = () => {
  let today = new Date();
  let newDate = today - 1;
}

const handleForwardDate = () => {
  let today = new Date();
  let newDate = today + 1;
return 
}

export const DateMenu = ({className="dateMenu", id="", options, placeholder, source="", value, setValue})=> {
  let today = new Date();
  
  return (
    <div className={className} id={id}>
        <div className="dateMenuLabel">{placeholder}</div>
        <BackArrow onClick={handleBackDate}/>
        <ForwardArrow onClick={handleForwardDate}/>
    </div>
    
  )
}

export default DateMenu;