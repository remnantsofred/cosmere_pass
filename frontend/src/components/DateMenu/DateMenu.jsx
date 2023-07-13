import './DateMenu.css';
import { formatDateWithDayShort } from '../../utils/date_util';
import { withRouter } from 'react-router-dom';



export const DateMenu = withRouter(({className="dateMenu", id="", options, placeholder, source="", value, setValue})=> {

  const ForwardArrow = () => {
    return (
      <button className="date-menu-arrow-button">
        <div id="forward-arrow" onClick={handleForwardDate}>
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
        <div className="_3b_8ZCNx4tTmunLJDRFdOL _2u2UeNPjmjnJef9u7V6wI_" data-component="DisclosureArrow" id="back-arrow" onClick={handleBackDate}>
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
    // let today = new Date();
    // let newDate = value - 1;

    setValue(value - 1);
    console.log(value, "value back")
    console.log("clicked back")
  }
  
  const handleForwardDate = () => {
    setValue(value + 1)
    // let newDate = value + 1;
    // setValue(newDate);  
    console.log(value, "value forward")
    console.log("clicked forward")
  }

  const getDisplay = () => {
    if (value) {
      
      return value;
    };
    return placeholder;
  };
  
  return (
    <div className={className} id={id}>
        <div className="dateMenuLabel">{getDisplay()}</div>
        <BackArrow />
        <ForwardArrow />
    </div>
    
  )
})

export default DateMenu;