import './ReviewIndexItem.css';
import Row from '../row/Row';
import Rows from '../rows/Rows';


export const ReviewIndexItem = ({id="", className="ReviewIndexItem", review}) => {

  return (
    <Rows id={id} className={className} >
      <Row className='reviewTitleRow'>
        { review.lessonTitle } 
      </Row>
      <Row className='reviewStarsRow'>
        <div className='reviewRatingNum'> { review.rating } stars </div><span className='reviewTimeAgo'> time ago</span>
      </Row>
      <Row className='reviewBodyRow'>
        <p className='reviewBody'>{ review.body }</p>
      </Row>
      
    </Rows>

  )
}

export default ReviewIndexItem;