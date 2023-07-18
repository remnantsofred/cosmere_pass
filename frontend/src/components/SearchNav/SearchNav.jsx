import './SearchNav.css';
import Row from '../row/Row';
import Column from '../column/Column';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { formatDateWithDayShort } from '../../utils/date_util';
import { getParams } from '../../utils/general_util';
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

  const getOptionfromValue = (value, type) => {
    if (type === 'location'){
      for (let locationOption of dropdownLocationOptions){
       if (locationOption.value === value){
         return locationOption
       }
      }
    } else if (type === 'type'){
      for (let typeOption of dropdownTypeOptions){
        if (typeOption.value === value){
          return typeOption
        }
       }
    }
  }

  useEffect(()=>{

    if (selectedValueLoc && selectedValueType){
      history.push(`/search/?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)

    } else if (selectedValueLoc && !selectedValueType ){
      history.push(`/search/?location_id=${selectedValueLoc.value}&start_time=${selectedValueDate}`)
    
    } else if (!selectedValueLoc && selectedValueType ){
      history.push(`/search/?&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)

    } else if (!selectedValueLoc && !selectedValueType){
      history.push(`/search/?start_time=${selectedValueDate}`)
      
    }

  }, [selectedValueLoc, selectedValueType, selectedValueDate])


  useEffect(()=>{
    const searchParams = getParams(history.location.search)
    setSelectedValueLoc(getOptionfromValue(parseInt(searchParams.location_id), 'location'));
    setSelectedValueType(getOptionfromValue(searchParams.lesson_type, 'type'));
    setSelectedValueDate(searchParams.start_time ? parseInt(searchParams.start_time) : 0)

    
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