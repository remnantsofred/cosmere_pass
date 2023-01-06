import './SearchNav.css';
import Row from '../row/Row';
import Column from '../column/Column';


export const SearchNav = ({children, id='', className="SearchNav" }) => {
  
  return (
    <Row className={className} id={id}>
      <Column>
        <div className="dropdown">
          Fitness
        </div>
        <div className="dropdown">
          Activities
        </div>
        <div className="dropdown">
          Amenities
        </div>
        <div className="dropdown">
          Distance
        </div>
      </Column>
      <Column>
        Magic Lessons in Your Area
      </Column>
      {children}
    </Row>
  )
}

export default SearchNav;