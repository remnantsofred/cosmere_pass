import './SearchNav.css';
import Row from '../row/Row';
import Column from '../column/Column';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { formatDateWithDayShort } from '../../utils/date_util';
import { getParams } from '../../utils/general_util';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { DateMenu } from '../DateMenu/DateMenu';


export const SearchNav = withRouter(({children, id='', className="SearchNav", locations, lessons, lessonDates, currentUser, indexType, history, passedSearchParams }) => {
  const dropdownTypeOptions = [
    {value: "Allomancy",label: "Allomancy"},
    {value: "Awakening", label: "Awakening"},
    {value: "Feruchemy", label: "Feruchemy"},
    {value: "Stormlight",label: "Stormlight"},
    {value: "Surgebinding", label: "Surgebinding"}
  ]
  let today = new Date();

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

  const [selectedValueLoc, setSelectedValueLoc] = useState(getOptionfromValue(parseInt(passedSearchParams.location_id), 'location'));
  const [selectedValueType, setSelectedValueType] = useState(getOptionfromValue(passedSearchParams.lesson_type, 'type'));
  const [selectedValueDate, setSelectedValueDate] = useState(passedSearchParams.start_time);

  useEffect(()=>{
    const searchParams = getParams(history.location.search)
    setSelectedValueLoc(getOptionfromValue(parseInt(searchParams.location_id), 'location'));
    setSelectedValueType(getOptionfromValue(searchParams.lesson_type, 'type'));
    setSelectedValueDate(parseInt(searchParams.start_time))

  }, [])

  useEffect(()=>{

    if (selectedValueLoc && selectedValueType){
      history.push(`/search?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)

    } else if (selectedValueLoc && !selectedValueType ){
      history.push(`/search?location_id=${selectedValueLoc.value}&start_time=${selectedValueDate}`)
    
    } else if (!selectedValueLoc && selectedValueType ){
      history.push(`/search?&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)

    } else if (!selectedValueLoc && !selectedValueType){
      history.push(`/search?start_time=${selectedValueDate}`)
      
    }

  }, [selectedValueLoc, selectedValueType, selectedValueDate])


  useEffect(()=>{
    const searchParams = getParams(history.location.search)
    setSelectedValueLoc(getOptionfromValue(parseInt(searchParams.location_id), 'location'));
    setSelectedValueType(getOptionfromValue(searchParams.lesson_type, 'type'));
    setSelectedValueDate(parseInt(searchParams.start_time))
    
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