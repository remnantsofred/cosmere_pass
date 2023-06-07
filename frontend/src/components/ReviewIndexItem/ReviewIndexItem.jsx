import './ReviewIndexItem.css';
import Row from '../row/Row';
import Rows from '../rows/Rows';
import { FiEdit, FiTrash } from 'react-icons/fi'
import { getCurrentUser } from '../../store/session';
import { NavLink } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';


export const ReviewIndexItem = ({id="", className="ReviewIndexItem", review, currentUser, setModalStatus, handleDeleteReview, handleEditReviewClick, source}) => {
  
  const getTimeAgo = (review) => {
    if (review.minutesAgo < 0){
      return `just now` 
    } else if (review.minutesAgo > 0 && review.minutesAgo < 2){
      return `${review.minutesAgo} minute ago`
    } else if (review.minutesAgo > 2) {
      return `${review.minutesAgo} minutes ago`
    } else if (review.hoursAgo > 0 && review.hoursAgo < 2){
      return `${review.hoursAgo} hour ago`
    } else if (review.hoursAgo > 2){
      return `${review.hoursAgo} hours ago`
    } else if (review.daysAgo > 0 && review.daysAgo < 2){
      return `${review.daysAgo} day ago`
    } else if (review.daysAgo > 2){
      return `${review.daysAgo} days ago`
    } else if (review.monthsAgo > 0 && review.monthsAgo < 2) {
      return `${review.monthsAgo} month ago`
    } else if (review.monthsAgo > 2) {
      return `${review.monthsAgo} months ago`
    } else if (review.yearsAgo > 0 && review.yearsAgo < 2) {
      return `${review.yearsAgo} year ago`
    } else if (review.yearsAgo > 2) {
      return `${review.yearsAgo} years ago`
    }
  }


  return (
    <Rows id={id} className={`${className} ${source}-review-index-item`} >
      <Row className={`reviewTitleRow ${source}-review-title-row`}>
        { review.lessonTitle } 
        <div className={`editDeleteReview ${source}-review-edit-delete-row`}>
          {/* {(currentUser && review.reviewerId === currentUser.id) && <FiEdit onClick={() => handleEditReviewClick(review)} className='reviewEditIcon'/>} */}
          {(review.currentUserReviewed) && <FiEdit onClick={() => handleEditReviewClick(review)} className='reviewEditIcon'/>}
          {/* {(currentUser && review.reviewerId === currentUser.id) && <FiTrash onClick={()=>handleDeleteReview(review.id)} className='reviewDeleteIcon'/>  } */}
          {(review.currentUserReviewed) && <FiTrash onClick={()=>handleDeleteReview(review.id)} className='reviewDeleteIcon'/>  }
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