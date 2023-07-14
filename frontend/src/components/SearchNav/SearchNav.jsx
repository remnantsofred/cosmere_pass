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

  const getParams = (params) => {
    const paramsString = params.slice(1)
    const paramsArray = paramsString.split('&')
    const paramsMap = {};
    for (const param of paramsArray){
      const [key, value] = param.split('=')
      paramsMap[key] = value
    } 
    return paramsMap;
  }

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

    if (selectedValueLoc && selectedValueType && selectedValueDate !== 0){
      history.push(`/search/?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)
      console.log(1)

    } else if (selectedValueLoc && !selectedValueType && selectedValueDate !== 0){
      history.push(`/search/?location_id=${selectedValueLoc.value}&start_time=${selectedValueDate}`)
      console.log(2)
      // GOOD
    } else if (selectedValueLoc && selectedValueType && selectedValueDate === 0){
      history.push(`/search/?location_id=${selectedValueLoc.value}&lesson_type=${selectedValueType.value}`)
      console.log(3) 
      // GOOD

    } else if (!selectedValueLoc && selectedValueType && selectedValueDate !== 0){
      history.push(`/search/?&lesson_type=${selectedValueType.value}&start_time=${selectedValueDate}`)
      console.log(4)

    } else if (!selectedValueLoc && !selectedValueType && selectedValueDate !== 0){
      history.push(`/search/?start_time=${selectedValueDate}`)
      console.log(5)

    } else if (!selectedValueLoc && selectedValueType && selectedValueDate === 0){
      history.push(`/search/?lesson_type=${selectedValueType.value}`)
      console.log(6)
      // GOOD
    } else if (selectedValueLoc && !selectedValueType && selectedValueDate === 0){
      history.push(`/search/?location_id=${selectedValueLoc.value}`)
      console.log(7)
      //GOOD
    }

  }, [selectedValueLoc, selectedValueType, selectedValueDate])


  useEffect(()=>{
    const searchParams = getParams(history.location.search)
    setSelectedValueLoc(getOptionfromValue(parseInt(searchParams.location_id), 'location'));
    setSelectedValueType(getOptionfromValue(searchParams.lesson_type, 'type'));
    setSelectedValueDate(searchParams.start_time ? parseInt(searchParams.start_time) : 0)

    
    // if (history.location.search === ''){
    //   setSelectedValueLoc(null);
    //   setSelectedValueType(null);
    //   setSelectedValueDate(0)

    //   // none - confirmed
    // } else if (history.location.search.includes("location_id") && !history.location.search.includes("lesson_type") && !history.location.search.includes("start_time")){
    //   setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
    //   setSelectedValueType(null);
    //   setSelectedValueDate(0)

    //   // only location - confirmed 

    // } else if (history.location.search.includes("location_id") && !history.location.search.includes("lesson_type") && history.location.search.includes("start_time")){
    //   setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
    //   setSelectedValueType(null);
    //   setSelectedValueDate(parseInt(history.location.search.split("=")[2]))
    //   // location and date - confirmed

    // } else if (history.location.search.includes("location_id") && history.location.search.includes("lesson_type") && !history.location.search.includes("start_time")){
    //   setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
    //   setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[2]));
    //   setSelectedValueDate(0)
    //   // location and type - maybe???

    // } else if (!history.location.search.includes("location_id") && history.location.search.includes("lesson_type") && !history.location.search.includes("start_time")){
    //   setSelectedValueLoc(null)
    //   setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]));
    //   setSelectedValueDate(0)
    //   // type and date - ??? --- 

    // } else if (!history.location.search.includes("location_id") && !history.location.search.includes("lesson_type") && history.location.search.includes("start_time")){
    //   setSelectedValueLoc(null)
    //   setSelectedValueType(null);
    //   setSelectedValueDate(parseInt(history.location.search.split("=")[1]))
    //   // type and date - ???  ---- 

    // } else if (!history.location.search.includes("location_id") && history.location.search.includes("lesson_type") && history.location.search.includes("start_time")){
    //   setSelectedValueLoc(null)
    //   setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]));
    //   setSelectedValueDate(parseInt(history.location.search.split("=")[2]))
    //   // type and date - ??? 

    // } else if (history.location.search.includes("location_id") && history.location.search.includes("lesson_type") && history.location.search.includes("start_time")){
    //   setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
    //   setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[2]));
    //   console.log(history.location.search, "history search")
    //   setSelectedValueDate(parseInt(history.location.search.split("=")[3]))
    //   console.log('7other')


      // location, type, and date 

    // } else if (history.location.search.includes("lesson_type") && !history.location.search.includes("location_id")){
    //   setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]))
    //   setSelectedValueLoc(null);


    // } else if (history.location.search.includes("lesson_type") && history.location.search.includes("location_id")){ 
    //   const locationIndex = history.location.search.indexOf("location_id")
    //   const typeIndex = history.location.search.indexOf("lesson_type")


    //   if (locationIndex < typeIndex){
    //     setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[2]))
    //     setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
    //   } else {
    //     setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]))
    //     setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[2])))
    //   }



    //   if (locationIndex < typeIndex){
    //     setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[2]))
    //     setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[1])))
    //   } else {
    //     setSelectedValueType(dropdownTypeOptions.find( option => option.value === history.location.search.split("=")[1]))
    //     setSelectedValueLoc(dropdownLocationOptions.find( option => option.value === parseInt(history.location.search.split("=")[2])))
    //   }
    // }
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