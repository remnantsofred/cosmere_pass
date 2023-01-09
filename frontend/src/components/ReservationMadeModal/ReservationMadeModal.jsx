import './ReservationMadeModal.css';

import Panels from '../panels';
import Panel from '../panel/Panel';
import Row from '../row/Row';
import { formatTime, formatDate, formatDateShort } from '../../utils/date_util';
import modalCloseButton from '../ReservationConfirmModal/modalCloseButton.png';
import reservationMadeImg from './ReservationMade.jpeg';
import { CalendarIcon } from '../icon/Icon'


export const ReservationMadeModal = ({children, id='', className="ReservationMadeModal", lessonDate, lesson, location, handleResConfModalClose}) => {
  return (
    <>
      <div className='resModalBackground'></div>
      <Panels id={id} className={className}>
        {/* <button className='resModalCloseBtn' onClick={handleModalClose} backgroundImage={modalCloseButton} >
          X
        </button> */}
        <img src={modalCloseButton} className='resModalCloseBtn' onClick={handleResConfModalClose} /> 
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
              Reservation Confirmed
            </p>
          </Row>
          <Row className='resModalCredits'>
            <p>
              For a limited time, invite your friends to join CosmerePass & earn 40 marks for every one who becomes a paying 
              member. Get 3 friends to join & we'll top it up to 10 broam. Limited time only. 
            </p>
          </Row>
          <Row>
            <button className='resModalButtonEmail' onClick={email} >
              Email invite
            </button>
          </Row>

          <Row>
            
          </Row>
        </Panel>
      </Panels>
    </>
  )
}

export default ReservationMadeModal;