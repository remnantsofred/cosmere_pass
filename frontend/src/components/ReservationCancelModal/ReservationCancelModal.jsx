import './ReservationCancelModal.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Row from '../row/Row';
import { formatTime, formatDate, formatDateWithDay } from '../../utils/date_util';
import modalCloseButton from '../ReservationConfirmModal/modalCloseButton.png';

export const ReservationCancelModal = ({children, id='', className="ReservationCancelModal", lessonDate, lesson, location, handleModalClose, handleCancelModalConfirm, source}) => {

  return (
    <>
      <div className='resModalBackground'></div>
      <Panels id={id} className={className}>
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
          <Row className='resCancelModalLessonTime'>
            <p>
              {formatDateWithDay(lessonDate.startTime)}
            </p>
            <p>
              {formatTime(lessonDate.startTime)} - {formatTime(lessonDate.endTime)}
            </p>
          </Row>
          <Row className='resCancelModalCredits'>
            <p className='resModalNumCredits'>3</p>
            credits
          </Row>
          <Row>
            <button className='resModalCancelButton' onClick={() => handleCancelModalConfirm(lessonDate)}>
              Cancel this reservation
            </button>
          </Row>
          <Row className='resModalCancelRow'>
            <p className='resCancelModalCancelText'>We'll refund you your 
            <span className='resCancelModalNumCredits2'>3 credits</span>
            </p>
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

export default ReservationCancelModal;