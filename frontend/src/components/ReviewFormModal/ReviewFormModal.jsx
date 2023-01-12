import './ReviewFormModal.css';
import StarRatingResponsive from '../StarRatingResponsive';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import Row from '../row/Row';
import ReviewFormModalImg from './Vin.jpeg';
import Panels from '../panels';
import Panel from '../panel/Panel';
import modalCloseButton from '../ReservationConfirmModal/modalCloseButton.png';
import { formatTime, formatDate, formatDateShort, formatDateWithDay } from '../../utils/date_util';
import { FiEdit } from 'react-icons/fi'
import { CalendarIcon } from '../icon/Icon'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// lessons being passed in are already lessons just for that location
export const ReviewFormModal = ({children, id='', className="ReviewFormModal", currentUser, location, handleModalClose, handleReviewSubmit, source, lessons, handleReviewEditSubmit, review}) => {
  const [lessonID, setLessonID] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewBody, setReviewBody] = useState("");
 


  const setStarReviewRating = (rating) => {
    setRating(rating);
  }

  const setReviewLessonFromDropdown = (lessonId) => {
    setLessonID(lessonId); 
  }

  const dropdownOptions = lessons.map( lesson => ({value: lesson.id, label: lesson.title}))
    
  const reviewLessonTitle = () => {
    if (!review) {
      return (
        <DropdownMenu location={location} placeholder="Select..." options={dropdownOptions} setReviewLessonFromDropdown={setReviewLessonFromDropdown}/>
      )
    }
    else {
      return (
        <div className='editReviewLessonTitle'>{review.lessonTitle}</div>
      )
    }
  }

  const editReviewBodyTextArea = () => {
    if (!review) {
      return (
        <textarea className='reviewFormTextBox' value={reviewBody} onChange={e => setReviewBody(e.target.value)} placeholder="What did you like about the lesson? How was the instructor? What was the space like?" ></textarea>
      )
    }
    else {
      return (
        <textarea className='reviewFormTextBox' value={reviewBody} onChange={e => setReviewBody(e.target.value)} placeholder={review.body} ></textarea>
      )
    }
  }
  
  

  return (
    <>
      <div className='resModalBackground'>
      </div>
      <Panels id={id} className={className} >
        <img src={modalCloseButton} className='resModalCloseBtn' onClick={handleModalClose} />
        <div className='resModalImgDiv'>
          <img src={ReviewFormModalImg} alt="" className='resModalImg'/>
        </div>
        <Panel className="reviewModalInfoPanel">
          <Row className='resModalResConf'>
            <p>Rate your experience at</p>
            <p>{location.locationName}</p>
          </Row>
          <Row className='reviewModalLessonLoc'>
            {/* <DropdownMenu location={location} placeholder="Select..." options={dropdownOptions} setReviewLessonFromDropdown={setReviewLessonFromDropdown}/> */}
            {reviewLessonTitle()}
          </Row>
          <Row className='reviewModalStarRow'>
            {/* <label className='reviewModalLabel'>Rating: */}
            <StarRatingResponsive setStarReviewRating={setStarReviewRating} id='reviewModalStarRating' />

            {/* </label> */}

          </Row>
          <Row className='reviewFormInputRow'>
            {/* <textarea className='reviewFormTextBox' value={reviewBody} onChange={e => setReviewBody(e.target.value)} placeholder="What did you like about the lesson? How was the instructor? What was the space like?" ></textarea> */}
            {editReviewBodyTextArea()}
          </Row>
          <Row>
            {className === "ReviewFormModal" ? <button className='resModalButton' onClick={() => {
                const reviewData = {
                  lesson_id: lessonID,
                 
                  reviewer_id: currentUser.id,
                  rating,
                  body: reviewBody,
                  location_id: location.id
                }
                handleReviewSubmit(reviewData)
              }}>
              Submit
            </button> :
            <button className='resModalButton' onClick={() => {
              const reviewData = {
                lesson_id: review.lessonId,
                review_id: review.id,
                reviewer_id: currentUser.id,
                rating,
                body: reviewBody,
                location_id: location.id
              }
              handleReviewEditSubmit(reviewData)
            }}>
            Update Review
          </button>}
          </Row>
          
        </Panel>
      </Panels>
    </>
  )
}

export default ReviewFormModal;