import './ReviewFormModal.css';
import StarRatingResponsive from '../StarRatingResponsive';

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

export const ReviewFormModal = ({children, id='', className="ReviewFormModal", currentUser, location, handleModalClose, handleReviewSubmit, source}) => {
  const [lessonID, setLessonID] = useState("");
  const [rating, setRating] = useState("");
  const [reviewBody, setReviewBody] = useState("");

  const reviewData = {
    // lesson_id: lessonID,
    reviewer_id: currentUser.id,
    rating: rating,
    body: reviewBody,
    location_id: location.id
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
        {children}
        <Panel className="resModalInfoPanel">
          <Row className='resModalLessonName'>
            <p>Rate your experience at</p>
          </Row>
          <Row className='resModalLessonLoc'>
            <p>{location.locationName}</p>
          </Row>
          <Row className='reviewModalStarRow'>
            {/* <label className='reviewModalLabel'>Rating: */}
              <StarRatingResponsive className='reviewModalStarRating'/>

            {/* </label> */}
            <p>
              {/* {formatTime(lessonDate.startTime)} - {formatTime(lessonDate.endTime)} */}
            </p>
          </Row>
          <Row className='reviewFormInputRow'>
            
            <input type="text" />
          </Row>
          <Row>
            <button className='resModalButton' onClick={() => handleReviewSubmit(reviewData)}>
              Reserve
            </button>
          </Row>
          <Row className='resModalCancelRow'>
            {/* <p className='resModalCancelText'>Cancel 12 hours in advance to avoid a 5 mark late cancellation fee.</p> */}
          </Row>
          <Row>

          </Row>
          <Row>

          </Row>
        </Panel>
      </Panels>
    </>
  )
}

export default ReviewFormModal;