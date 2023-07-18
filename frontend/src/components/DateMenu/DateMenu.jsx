import './DateMenu.css';
import { formatDateWithDayShort } from '../../utils/date_util';
import { withRouter } from 'react-router-dom';



export const DateMenu = withRouter(({className="dateMenu", id="", placeholder, source="", value, setValue})=> {

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
  
  const BackArrow = ({propHidden}) => {
    return (
      <button data-qa="DateFilter.selection.date-previous" aria-label="search previous date" className={propHidden ? 'date-menu-arrow-button-hidden' : "date-menu-arrow-button"} data-component="Button" >
        <div className="_3b_8ZCNx4tTmunLJDRFdOL _2u2UeNPjmjnJef9u7V6wI_" data-component="DisclosureArrow" id="back-arrow" onClick={handleBackDate} >
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
    // if (value > 0){
      setValue(value - 1);
    // } 
  }
  
  const handleForwardDate = () => {
    setValue(value + 1)
  }

  const getDisplay = () => {
    // if (value) {
      let today = new Date();
      today.setDate(today.getDate() + value)
      const formatted = formatDateWithDayShort(today)
      return formatted;
    // };
    // return placeholder;
  };

  
  if (source === 'loc-show-pg'){
    return (
      <div className={className} id={id}>
          {(value > 0) ? <BackArrow /> : <BackArrow propHidden={true}/>}
          <div className="dateMenuLabel">{getDisplay()}</div>
          <ForwardArrow />
      </div>
      
    )
  } else {
    return (
      <div className={className} id={id}>
          <div className="dateMenuLabel">{getDisplay()}</div>
          {(value > 0) ? <BackArrow /> : <BackArrow propHidden={true}/>}
          <ForwardArrow />
      </div>
      
    )

  }
})

export default DateMenu;