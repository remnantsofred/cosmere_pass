import './ReservationMadeModal.css';

import Panels from '../panels';
import Panel from '../panel/Panel';
import Row from '../row/Row';
import { formatTime, formatDateShort } from '../../utils/date_util';
import modalCloseButton from '../ReservationConfirmModal/modalCloseButton.png';
import reservationMadeImg from './ReservationMade.jpeg';
import { CalendarIcon } from '../icon/Icon'
import { useState } from 'react';


export const ReservationMadeModal = ({children, id='', className="ReservationMadeModal", lessonDate, lesson, location, handleModalClose, source, handleEmailInvite}) => {
  const [email, setEmail] = useState('');

  
  const renderButton = ()=>{
    if (source !== 'account-page'){
      return (
        <a className='resModalButtonEmail' href={`mailto:${email}?cc=d.huff.lam@gmail.com&subject=Hey! Check out this cool lesson I'm taking via Cosmerepass by Daphne Lam&body=Here%20is%20the%20link:%20https://cosmere-pass.onrender.com/`}>
          Email invite
        </a>
      )
    } else {
      return (
        <a className='resModalButtonEmail' href={`mailto:${email}?cc=d.huff.lam@gmail.com&subject=Hey! Check out this cool project Cosmerepass by Daphne Lam&body=Here%20is%20the%20link:%20https://cosmere-pass.onrender.com/`}>
          Email invite
        </a>
      )
    }
  }


  return (
    <>
      <div className='resModalBackground'></div>
      <Panels id={id} className={className}>
        <img src={modalCloseButton} className='resModalCloseBtn' onClick={handleModalClose} /> 
        <div className='resModalImgDiv'>
          <img src={reservationMadeImg} alt="" className='resModalImg'/>
        </div>
        {children}
        <Panel className="resModalInfoPanel2">
          <Row className='resModalInfoRow'>
            <p>{lesson.title} on {formatDateShort(lessonDate.startTime)} at {formatTime(lessonDate.startTime)}</p> <CalendarIcon className='signupIcon resModalIcon'/>
          </Row>
          {/* <Row className='resModalLessonLoc'>
            <p>{location.locationName}</p>
          </Row> */}
          <Row className='resModalResConf'>
            <p>
              {source === 'account-page' ? 'Invite a friend!' : 'Reservation Confirmed'}
            </p>
          </Row>
          <Row className='resModalCredits'>
            <p>
              For a limited time, invite your friends to join CosmerePass & earn 40 marks for every one who becomes a paying 
              member. Get 3 friends to join & we'll top it up to 10 broam. Limited time only. 
            </p>
          </Row>
            
            
          <Row className='email-form-and-invite-button-row'>
            <form action="" className='resModal-email-form'>
              <input type="text" placeholder='Enter email below' onChange={(e) => setEmail(e.target.value) } className='resModal-email-form-email-field'/>
            </form>
            {renderButton()}
          </Row>

          <Row>
            
          </Row>
        </Panel>
      </Panels>
    </>
  )
}

export default ReservationMadeModal;