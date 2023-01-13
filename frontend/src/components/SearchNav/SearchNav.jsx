import './SearchNav.css';
import Row from '../row/Row';
import Column from '../column/Column';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { formatDateWithDay } from '../../utils/date_util';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export const SearchNav = withRouter(({children, id='', className="SearchNav", locations, lessons, lessonDates, currentUser, indexType, history }) => {
  const dropdownTypeOptions = [{
    value: "Allomancy",label: "Allomancy"},
    {value: "Awakening", label: "Awakening"},
    {value: "Feruchemy", label: "Feruchemy"},
    {value: "Stormlight",label: "Stormlight"},
    {value: "Surgebinding", label: "Surgebinding"}
  ]
  const [selectedValueLoc, setSelectedValueLoc] = useState(null);
  const [selectedValueType, setSelectedValueType] = useState(null);

  const dropdownLocationOptions = locations.map( location => ({value: location.id, label: location.locationName}))
  console.log(dropdownLocationOptions)
  let today = new Date();

  useEffect(()=>{
    console.log(selectedValueLoc, selectedValueType)
    if (selectedValueLoc && !selectedValueType){
      history.push(`/search/?location_id=${selectedValueLoc.value}`)
    } else if (selectedValueLoc && selectedValueType){
      history.push(`/search/?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}`)
    } else if (!selectedValueLoc && selectedValueType){
      history.push(`/search/?lesson_type=${selectedValueType.value}`)
    } 

  }, [selectedValueLoc, selectedValueType])
  
  return (
    <Row className={className} id={id}>
      { (currentUser && indexType === 'lessons') && <Column>
        <DropdownMenu 
          className="dropdown navDropdown" 
          options={dropdownTypeOptions} 
          placeholder='Type' 
          source='searchNav'
          value={selectedValueType}
          setValue={setSelectedValueType}
           />
       
        <DropdownMenu 
          className="dropdown navDropdown" 
          options={dropdownLocationOptions} 
          placeholder='Location' 
          source='searchNav' 
          value={selectedValueLoc}
          setValue={setSelectedValueLoc}
          />
       
        {/* <DropdownMenu 
          className="dropdown navDropdown" 
          options='' 
          placeholder={formatDateWithDay(today)} 
          source='searchNav' /> */}
        
      </Column>}
      <Column>
        Magic Lessons in Your Area
      </Column>
      {children}
    </Row>
  )
})

export default SearchNav;