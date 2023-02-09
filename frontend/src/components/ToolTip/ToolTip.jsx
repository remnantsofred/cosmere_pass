import './ToolTip.css';

export const ToolTip = ({className="", id="", text, children}) => {
  
  return (
    <div className={`${className} toolTip`} id={id}>
      <span className={`${className}-text toolTipText`}>{text}</span>
      {children}
    </div>
  )
}

export default ToolTip;