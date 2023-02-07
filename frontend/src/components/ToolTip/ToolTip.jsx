import './ToolTip.css';

export const ToolTip = ({className="toolTip", id="", text, children}) => {
  
  return (
    <div className={className} id={id}>
      <span className="toolTipText">{text}</span>
      {children}
    </div>
  )
}

export default ToolTip;