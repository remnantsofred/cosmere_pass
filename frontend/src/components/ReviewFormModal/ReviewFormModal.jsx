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
  const [errors, setErrors] = useState("");



  const setStarReviewRating = (rating) => {
    setRating(rating);
  }

  const setReviewLessonFromDropdown = (lessonId) => {
    setLessonID(lessonId); 
  }

  

  // const dropdownOptions = lessons.map( lesson => ({value: lesson.id, label: lesson.title}))

  const newDropdownOptions = lessons.map( lesson => {
    if (currentUser.lessonsTaken.includes(lesson.id) && !currentUser.lessonsReviewed.includes(lesson.id)) {
      return {value: lesson.id, label: lesson.title, isDisabled: false}
    }
    else if(currentUser.lessonsTaken.includes(lesson.id) && currentUser.lessonsReviewed.includes(lesson.id)) {
      return {value: lesson.id, label: lesson.title, isDisabled: "alreadyReviewed"}
    }
    else if (!currentUser.lessonsTaken.includes(lesson.id)) {
      return {value: lesson.id, label: lesson.title, isDisabled: "notYetTaken"}
    }
  })
    
  // const update = (e, field) => {
  //   let setState;
  //   const value = e.currentTarget.value;
  //   const newErrors = {...errors};
  //   switch (field) {
  //     case 'title':
  //       setState = setTitle;
  //       if (value.length > 100) {
  //         newErrors[field] = 'Skeleton title is required and must be between 1 and 100 characters';
  //       } else if (value.length < 1){
  //         newErrors[field] = 'Skeleton title is required and must be between 1 and 100 characters';
  //       } else {
  //         delete newErrors[field];
  //       }
  //       setErrors(newErrors);
  //       break;
  //     case 'prompt':
  //       setState = setPrompt;
  //       if (value.length > 150) {
  //         newErrors[field] = 'Prompt must be less than 150 characters';
  //       } else {
  //         delete newErrors[field];
  //       }
  //       setErrors(newErrors);
  //       break;
  //     case 'maxBones':
  //       setState = setMaxBones;
  //       let num = parseInt(value);
  //       if (num < 5) {
  //         newErrors[field] = 'Skeleton should have at least 5 bones and no more than 50 bones';
  //       } else if (num > 50) {
  //         newErrors[field] = 'Skeleton should have at least 5 bones and no more than 50 bones';
  //       } else {
  //         delete newErrors[field];
  //       }
  //       setErrors(newErrors);
  //       break;
  //     case 'maxCollaborators':
  //       setState = setMaxCollaborators;
  //       let numCollab = parseInt(value);
  //       if (numCollab < 1) {
  //         newErrors[field] = 'Skeleton should have at least 1 collaborator and no more than 50 collaborators';
  //       } else if (numCollab > 50) {
  //         newErrors[field] = 'Skeleton should have at least 1 collaborator and no more than 50 collaborators';
  //       } else {
  //         delete newErrors[field];
  //       }
  //       setErrors(newErrors);
  //       break;
  //     case 'tags':
  //       setState = setTags;
  //       break;
  //     default:
  //       throw Error('Unknown field in Signup Form');
  //   }

  //   setState(value);
  // }
    
    
  const reviewLessonTitle = () => {
    if (!review) {
      return (
        <DropdownMenu location={location} placeholder="Select..." options={newDropdownOptions} setReviewLessonFromDropdown={setReviewLessonFromDropdown} source="reviewForm" />
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
  
  const reviewSubmitClick = () => {
    if (reviewBody) {
      const reviewData = {
        lesson_id: lessonID,
       
        reviewer_id: currentUser.id,
        rating,
        body: reviewBody,
        location_id: location.id
      }
      handleReviewSubmit(reviewData)
    } else {
      setErrors("Review body cannot be empty")
    }
  }

  const reviewEditSubmitClick = () => {
    const newErrors = {...errors};
    if (reviewBody) {
      const reviewData = {
        lesson_id: review.lessonId,
        review_id: review.id,
        reviewer_id: currentUser.id,
        rating,
        body: reviewBody,
        location_id: location.id
      }
      handleReviewEditSubmit(reviewData)

    } else {
      setErrors("Review body cannot be empty")
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
          <Row className='reviewModalStarRow'>
            {/* <label className='reviewModalLabel'>Rating: */}
            <StarRatingResponsive setStarReviewRating={setStarReviewRating} id='reviewModalStarRating' assignedRating={review ? review.rating : 5} />
            {/* </label> */}

          </Row>
          <Row className='reviewModalLessonLoc'>
            {/* <DropdownMenu location={location} placeholder="Select..." options={dropdownOptions} setReviewLessonFromDropdown={setReviewLessonFromDropdown}/> */}
            {reviewLessonTitle()}
          </Row>
          <Row className='reviewFormInputRow'>
            {/* <textarea className='reviewFormTextBox' value={reviewBody} onChange={e => setReviewBody(e.target.value)} placeholder="What did you like about the lesson? How was the instructor? What was the space like?" ></textarea> */}
            {editReviewBodyTextArea()}
          </Row>
          <Row>
            {className === "ReviewFormModal" ? <button className='resModalButton' onClick={reviewSubmitClick} >
              Submit
            </button> :
            <button className='resModalButton' onClick={reviewEditSubmitClick}>
            Update Review
          </button>}
          </Row>
          {errors && <Row className='reviewFormErrorRow'>{errors}</Row>}
        </Panel>
      </Panels>
    </>
  )
}

export default ReviewFormModal;