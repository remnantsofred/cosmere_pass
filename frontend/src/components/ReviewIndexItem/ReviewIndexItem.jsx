import './ReviewIndexItem.css';
import Row from '../row/Row';
import Rows from '../rows/Rows';
import { FiEdit, FiTrash } from 'react-icons/fi'
import { getCurrentUser } from '../../store/session';
import { NavLink } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';


export const ReviewIndexItem = ({id="", className="ReviewIndexItem", review, currentUser, setModalStatus, handleDeleteReview, handleEditReviewClick}) => {
  
  const getTimeAgo = (review) => {
    if (review.minutesAgo > 0){
      return `${review.minutesAgo} minutes ago`
    } else if (review.hoursAgo > 0){
      return `${review.hoursAgo} hours ago`
    } else if (review.daysAgo > 0){
      return `${review.daysAgo} days ago`
    } else if (review.monthsAgo > 0) {
      return `${review.monthsAgo} months ago`
    } else if (review.yearsAgo > 0) {
      return `${review.yearsAgo} years ago`
    }
  }


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
        <div className='reviewRatingNum'> <StarRating assignedRating={review.rating} givenFillColor="#676767" unfillColor="#e7e7e7" /> </div>
        <span className='reviewTimeAgo'>{getTimeAgo(review)}</span>
        <span className='reviewReviewerUsername'>{review.reviewerUsername}</span>
      </Row>
      <Row className='reviewBodyRow'>
        <p className='reviewBody'>{ review.body }</p>
      </Row>
      
    </Rows>

  )
}

export default ReviewIndexItem;