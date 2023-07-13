import './SearchNav.css';
import Row from '../row/Row';
import Column from '../column/Column';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { formatDateWithDayShort, dateFromString } from '../../utils/date_util';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { DateMenu } from '../DateMenu/DateMenu';

export const SearchNav = withRouter(({children, id='', className="SearchNav", locations, lessons, lessonDates, currentUser, indexType, history }) => {
  const dropdownTypeOptions = [
    {value: "Allomancy",label: "Allomancy"},
    {value: "Awakening", label: "Awakening"},
    {value: "Feruchemy", label: "Feruchemy"},
    {value: "Stormlight",label: "Stormlight"},
    {value: "Surgebinding", label: "Surgebinding"}
  ]
  let today = new Date();

  const [selectedValueLoc, setSelectedValueLoc] = useState(null);
  const [selectedValueType, setSelectedValueType] = useState(null);
  const [selectedValueDate, setSelectedValueDate] = useState(0);
  

  const dropdownLocationOptions = locations.map( location => ({value: location.id, label: location.locationName}))

  useEffect(()=>{

    if (selectedValueLoc && selectedValueType && selectedValueDate){
      history.push(`/search/?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)
    } else if (selectedValueLoc && !selectedValueType && selectedValueDate){
      history.push(`/search/?location_id=${selectedValueLoc.value}&start_time=${selectedValueDate}`)
    } else if (selectedValueLoc && selectedValueType && !selectedValueDate){
      history.push(`/search/?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}`)
    } else if (!selectedValueLoc && selectedValueType && selectedValueDate){
      history.push(`/search/?&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)
    } else if (!selectedValueLoc && !selectedValueType && selectedValueDate){
      history.push(`/search/?start_time=${selectedValueDate}`)
    } else if (!selectedValueLoc && selectedValueType && !selectedValueDate){
      history.push(`/search/?lesson_type=${selectedValueType.value}`)
    } else if (selectedValueLoc && !selectedValueType && !selectedValueDate){
      history.push(`/search/?location_id=${selectedValueLoc.value}`)
    }

  }, [selectedValueLoc, selectedValueType, selectedValueDate])


  useEffect(()=>{
    if (history.location.search === ''){
      setSelectedValueLoc(null);
      setSelectedValueType(null);
    } else if (history.location.search.includes("location_id") && !history.location.search.includes("lesson_type")){
      setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
      setSelectedValueType(null);
    } else if (history.location.search.includes("lesson_type") && !history.location.search.includes("location_id")){
      setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]))
      setSelectedValueLoc(null);
    } else if (history.location.search.includes("lesson_type") && history.location.search.includes("location_id")){ 
      const locationIndex = history.location.search.indexOf("location_id")
      const typeIndex = history.location.search.indexOf("lesson_type")
      if (locationIndex < typeIndex){
        setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[2]))
        setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
      } else {
        setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]))
        setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[2])))
      }
    } else if (history.location.search.includes("lesson_type") && history.location.search.includes("location_id") && history.location.search.includes("start_time")){
      const locationIndex = history.location.search.indexOf("location_id")
      const typeIndex = history.location.search.indexOf("lesson_type")
      const timeIndex = history.location.search.indexOf("start_time")
      if (locationIndex < typeIndex){
        setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[2]))
        setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
      } else {
        setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]))
        setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[2])))
      }
    }
  }, [history.location.search])
  
  return (
    <Row className={className} id={id}>
      { (currentUser && indexType === 'lessons') && 
        <Column>
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
          
          <DateMenu 
            className="dateMenu" 
            id="navBarDateMenu"
            placeholder={formatDateWithDayShort(today)}
            source='searchNav' 
            value={selectedValueDate}
            setValue={setSelectedValueDate}
            />
        </Column>}
      <Column>
        Magic Lessons in Your Area
      </Column>
      {children}
    </Row>
  )
})

export default SearchNav;