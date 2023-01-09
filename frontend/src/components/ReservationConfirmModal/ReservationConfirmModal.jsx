import './ReservationConfirmModal.css';
import Panels from '../panels';
import Panel from '../panel/Panel';
import Row from '../row/Row';
import { formatTime, formatDate, formatDateWithDay } from '../../utils/date_util';
import modalCloseButton from './modalCloseButton.png';

export const ReservationConfirmModal = ({children, id='', className="ReservationConfirmModal", lessonDate, lesson, location, handleModalClose, handleResSubmit}) => {
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
    </>
  )
}

export default ReservationConfirmModal;