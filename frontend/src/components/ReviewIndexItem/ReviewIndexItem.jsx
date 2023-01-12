import './ReviewIndexItem.css';
import Row from '../row/Row';
import Rows from '../rows/Rows';
import { FiEdit, FiTrash } from 'react-icons/fi'
import { getCurrentUser } from '../../store/session';
import { NavLink } from 'react-router-dom';


export const ReviewIndexItem = ({id="", className="ReviewIndexItem", review, currentUser, setModalStatus, handleDeleteReview, handleEditReviewClick}) => {
  


  return (
    <Rows id={id} className={className} >
      <Row className='reviewTitleRow'>
        { review.lessonTitle } 
        <div className='editDeleteReview'>
          {(currentUser && review.reviewerId === currentUser.id) && <FiEdit onClick={() => handleEditReviewClick(review)} className='reviewEditIcon'/>}
          {(currentUser && review.reviewerId === currentUser.id) && <FiTrash onClick={()=>handleDeleteReview(review.id)} className='reviewDeleteIcon'/>  }
        </div>

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