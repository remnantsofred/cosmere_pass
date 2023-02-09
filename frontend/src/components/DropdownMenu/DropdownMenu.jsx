import { useEffect } from 'react';
import './DropdownMenu.css';
import { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ToolTip from '../ToolTip/ToolTip';

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};


export const DropdownMenu = withRouter(({children, id='', className="DropdownMenu", location, options, placeholder, setReviewLessonFromDropdown, setSearchParams, source="", history, value, setValue})=> {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [toolTipIsShown, setToolTipIsShown] = useState(false);

  

  useEffect(()=>{
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);


  const handleInputClick = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  
  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label;
    };
    return placeholder;
  };



  // const getTypeDisplay = () => {
  //   if (value) {
  //     return selectedValueType.label;
  //   };
  //   return TypePlaceholder;
  // };

  const onItemClick = option => {
    setSelectedValue(option);
    setReviewLessonFromDropdown(option.value)
  };

  const onNavItemClick = option => {
    setValue(option);
  };

  

  const isSelected = option => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  }


  if (source === "reviewForm" || source === "" ) {
    return (
      <div onClick={handleInputClick} className={source === "reviewForm" ? "dropdown-container reviewFormDropCont" : "dropdown-container"}>
        <div className="dropdown-tools"> 
          <div className="dropdown-tools"> 
            <div className="dropdown-tools review-dropdown-tools"> 
              <div className="dropdown-selected-value" id="dropdown-selected-value">{getDisplay()}</div>
                <div className="dropdown-tool reviewFormDropMenu">
                  <Icon />
                  {/* {toolTipIsShown === "alreadyReviewed" && <ToolTip className="review-already-reviewed" text="You have already reviewed this lesson." />}
            {toolTipIsShown === "notYetTaken" && <ToolTip className="review-already-reviewed" text="You have not taken this lesson." />} */}
                </div>
            </div> 
          </div> 
        </div> 
        <div className="dropdown-input">
            
          {showMenu && <div className="dropdown-menu reviewFormDropMenu">
            {options.map( option => (
              <div 
                onClick={() => onItemClick(option)} 
                key={option.value} 
                className={`dropdown-item ${isSelected(option) && "selected"} ${option.isDisabled}`} 
                onMouseEnter={()=>setToolTipIsShown(`${option.value}-${option.isDisabled}`)}
                // onMouseLeave={()=>setToolTipIsShown(false)}
                >
                {option.label}

                {toolTipIsShown === `${option.value}-alreadyReviewed` && <ToolTip className="review-already-reviewed" text="You have already reviewed this lesson." />}
                {toolTipIsShown === `${option.value}-notYetTaken` && <ToolTip className="review-already-reviewed" text="You have not yet taken this lesson." />}
              </div>
            ))}
            {/* {toolTipIsShown === "alreadyReviewed" && <ToolTip className="review-already-reviewed" text="You have already reviewed this lesson." />}
            {toolTipIsShown === "notYetTaken" && <ToolTip className="review-already-reviewed" text="You have not taken this lesson." />} */}
          </div>}
        </div>
      </div>
    );
  } else if (source === "searchNav") {

    return (
      <div onClick={handleInputClick} className="dropdown-container searchNavDropCont">
        <div className="dropdown-tools"> 
          <div className="dropdown-selected-value" style={{color : value ? "#05f" : ""}} id="search-nav-dropdown-selected-value">{ value ? value.label : placeholder}</div>
          {/* {TypePlaceholder && <div className="dropdown-selected-value" id="search-nav-dropdown-selected-value">{getTypeDisplay()}</div>} */}
            <div className="dropdown-tool">
              <Icon />
            </div>
        </div> 
        <div className="dropdown-input">
          {showMenu && <div className="dropdown-menu searchNavDropMenu" >
            {options.map( option => (
              <div onClick={() => onNavItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`}>
                {option.label}
              </div>
            ))}
          </div>}
        </div>
      </div>
    );
  }

})

export default DropdownMenu;