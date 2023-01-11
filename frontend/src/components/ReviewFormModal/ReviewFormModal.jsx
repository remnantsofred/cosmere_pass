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
    lesson_id: 15,
    reviewer_id: currentUser.id,
    rating: 5,
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
        <Panel className="reviewModalInfoPanel">
          <Row className='resModalResConf'>
            <p>Rate your experience at</p>
            <p>{location.locationName}</p>
          </Row>
          <Row className='resModalLessonLoc'>
            {/* put dropdown here */}
          </Row>
          <Row className='reviewModalStarRow'>
            {/* <label className='reviewModalLabel'>Rating: */}
              <StarRatingResponsive className='reviewModalStarRating'/>

            {/* </label> */}

          </Row>
          <Row className='reviewFormInputRow'>
            <textarea className='reviewFormTextBox' value={reviewBody} onChange={e => setReviewBody(e.target.value)} placeholder="What did you like about the lesson? How was the instructor? What was the space like?" ></textarea>
          </Row>
          <Row>
            <button className='resModalButton' onClick={() => handleReviewSubmit(reviewData)}>
              Submit
            </button>
          </Row>
          
        </Panel>
      </Panels>
    </>
  )
}

export default ReviewFormModal;