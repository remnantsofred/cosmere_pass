import './DropdownMenu.css';

export const DropdownMenu = ({children, id='', className="DropdownMenu"})=> {

  return (
    <div className="dropdown-container">
      <div className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu;