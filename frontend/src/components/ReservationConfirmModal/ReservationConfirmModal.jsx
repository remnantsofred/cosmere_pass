import './ReservationConfirmModal.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Row from '../row/Row';
import { formatTime, formatDate, formatDateWithDay } from '../../utils/date_util';
import modalCloseButton from './modalCloseButton.png';

export const ReservationConfirmModal = ({children, id='', className="ReservationConfirmModal", lessonDate, lesson, location, handleModalClose, handleResSubmit, source}) => {
  return (
    < >
      <div className={source === "search" ? 'resModalBackground' : 'LocResModalBackground'}>
        
      </div>
      <Panels id={id} className={source === "search" ? "ReservationConfirmModal" : "LocReservationConfirmModal"} style={{position: source === "location" ? "absolute" : "", top:source === "location" ? window.scrollY + 24 : ""}}>
        {/* <button className='resModalCloseBtn' onClick={handleModalClose} backgroundImage={modalCloseButton} >
          X
        </button> */}
        <img src={modalCloseButton} className='resModalCloseBtn' onClick={handleModalClose} />
        <div className='resModalImgDiv'>
          <img src={lesson.photoURL} alt="" className='resModalImg'/>
        </div>
        {children}
        <Panel className="resModalInfoPanel">
          <Row className='resModalLessonName'>
            <p>{lesson.title}</p>
          </Row>
          <Row className='resModalLessonLoc'>
            <p>{location.locationName}</p>
          </Row>
          <Row className='resModalLessonTime'>
            <p>
              {formatDateWithDay(lessonDate.startTime)}
            </p>
            <p>
              {formatTime(lessonDate.startTime)} - {formatTime(lessonDate.endTime)}
            </p>
          </Row>
          <Row className='resModalCredits'>
            <p className='resModalNumCredits'>3</p>
            Credits
          </Row>
          <Row>
            <button className='resModalButton' onClick={() => handleResSubmit(lessonDate)}>
              Reserve
            </button>
          </Row>
          <Row className='resModalCancelRow'>
            <p className='resModalCancelText'>Cancel 12 hours in advance to avoid a 5 mark late cancellation fee.</p>
          </Row>
          <Row>

          </Row>
          <Row>

          </Row>
        </Panel>
      </Panels>
      {/* </div> */}
    </>
  )
}

export default ReservationConfirmModal;