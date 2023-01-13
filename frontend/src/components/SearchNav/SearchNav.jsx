import './SearchNav.css';
import Row from '../row/Row';
import Column from '../column/Column';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { formatDateWithDay } from '../../utils/date_util';

export const SearchNav = ({children, id='', className="SearchNav", locations, lessons, lessonDates }) => {
  const dropdownTypeOptions = [{
    value: "Allomancy",label: "Allomancy"},
    {value: "Awakening", label: "Awakening"},
    {value: "Feruchemy", label: "Feruchemy"},
    {value: "Stormlight",label: "Stormlight"},
    {value: "Surgebinding", label: "Surgebinding"}
  ]

  const dropdownLocationOptions = locations.map( location => ({value: location.id, label: location.locationName}))
  let today = new Date();
  
  return (
    <Row className={className} id={id}>
      <Column>
        <DropdownMenu 
          className="dropdown navDropdown" 
          options={dropdownTypeOptions} 
          TypePlaceholder='Type' 
          source='searchNav'
           />
       
        <DropdownMenu 
          className="dropdown navDropdown" 
          options={dropdownLocationOptions} 
          LocPlaceholder='Location' 
          source='searchNav' 
           />
       
        {/* <DropdownMenu 
          className="dropdown navDropdown" 
          options='' 
          placeholder={formatDateWithDay(today)} 
          source='searchNav' /> */}
        
      </Column>
      <Column>
        Magic Lessons in Your Area
      </Column>
      {children}
    </Row>
  )
}

export default SearchNav;