import './ReviewFormModal.css';
import StarRatingResponsive from '../StarRatingResponsive';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Row from '../row/Row';
import ReviewFormModalImg from './Vin.jpeg';
import Panels from '../panels';
import Panel from '../panel/Panel';
import modalCloseButton from '../ReservationConfirmModal/modalCloseButton.png';
import { useState, useEffect } from 'react';

// lessons being passed in are already lessons just for that location
export const ReviewFormModal = ({id='', className="ReviewFormModal", currentUser, location, handleModalClose, handleReviewSubmit, lessons, handleReviewEditSubmit, review}) => {
  const [lessonID, setLessonID] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewBody, setReviewBody] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (review) {
      setReviewBody(review.body);
    }
    
  }, [])

  const setStarReviewRating = (rating) => {
    setRating(rating);
  }

  const setReviewLessonFromDropdown = (lessonId) => {
    setLessonID(lessonId); 
    if (errors["lessonID"]){
      delete errors["lessonID"];
    }
  }


  const dropdownOptions = lessons.map( lesson => {
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
    
  const update = (e, field) => {
    let setState;
    const value = e.currentTarget.value;
    const newErrors = {...errors};
    switch (field) {
      case 'reviewBody':
        setState = setReviewBody;
        if (value.length < 1){
          newErrors[field] = 'Review body is required';
        } else {
          delete newErrors[field];
        }
        setErrors(newErrors);
        break;

      default:
        throw Error('Unknown field in Signup Form');
    }

    setState(value);
  }
    
    
  const reviewLessonTitle = () => {
    if (!review) {
      return (
        <DropdownMenu 
          location={location} 
          placeholder="Select..." 
          options={dropdownOptions} 
          setReviewLessonFromDropdown={setReviewLessonFromDropdown} 
          update={update} 
          source="reviewForm" />
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
        <textarea 
          className='reviewFormTextBox' 
          value={reviewBody} 
          onChange={e => update(e, 'reviewBody')} 
          placeholder="What did you like about the lesson? How was the instructor? What was the space like?" >

        </textarea>
      )
    }
    else {
      return (
        <textarea 
          className='reviewFormTextBox' 
          value={reviewBody} 
          onChange={e => update(e, 'reviewBody')}  >

        </textarea>
      )
    }
  }
  
  const reviewSubmitClick = () => {
    const newErrors = {...errors};
    if (!lessonID && !reviewBody) {
      newErrors["lessonID"] = 'You must select a lesson to review';
      newErrors["reviewBody"] = 'Review body is required';
      setErrors(newErrors)
    } else if (!lessonID && reviewBody) {
      newErrors["lessonID"] = 'You must select a lesson to review';
      setErrors(newErrors)
    } else if (lessonID && !reviewBody) {
      newErrors["reviewBody"] = 'Review body is required';
      setErrors(newErrors)
    } else if (reviewBody && lessonID) {
      const reviewData = {
        lesson_id: lessonID,
       
        reviewer_id: currentUser.id,
        rating,
        body: reviewBody,
        location_id: location.id
      }
      handleReviewSubmit(reviewData)
    }
  }

  const reviewEditSubmitClick = (reviewBody) => {
    const newErrors = {...errors};
    if (!reviewBody) {
      newErrors["reviewBody"] = 'Review body is required';
      setErrors(newErrors)
    } else {
      const reviewData = {
        lesson_id: review.lessonId,
        review_id: review.id,
        reviewer_id: currentUser.id,
        rating,
        body: reviewBody,
        location_id: location.id
      }
      handleReviewEditSubmit(reviewData)
    }
  }

  return (
    <>
      <div className='resModalBackground'>
      </div>
      <Panels id={id} className={className} >
        <img src={modalCloseButton} className='resModalCloseBtn' onClick={handleModalClose} />
        <div className='resModalImgDiv review-modal-img-div'>
          <img src={ReviewFormModalImg} alt="" className='resModalImg'/>
        </div>
        <Panel className="reviewModalInfoPanel">
          <Row className='resModalResConf'>
            <p>Rate your experience at</p>
            <p>{location.locationName}</p>
          </Row>
          <Row className='reviewModalStarRow'>
            <StarRatingResponsive setStarReviewRating={setStarReviewRating} id='reviewModalStarRating' assignedRating={review ? review.rating : 5} />

          </Row>
          <Row className='reviewModalLessonLoc'>
            {reviewLessonTitle()}
          </Row>
          <Row className='reviewFormInputRow'>
            {editReviewBodyTextArea()}
          </Row>
          <Row>
            {className === "ReviewFormModal" ? <button className='resModalButton' onClick={reviewSubmitClick} >
              Submit
            </button> :
            <button className='resModalButton' onClick={() => reviewEditSubmitClick(reviewBody)}>
            Update Review
          </button>}
          </Row>
          <div className='review-form-errors'>{errors?.reviewBody}</div>
          <div className='review-form-errors'>{errors?.lessonID}</div>
          

        </Panel>
      </Panels>
    </>
  )
}

export default ReviewFormModal;