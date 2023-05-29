import './ReservationIndexItem.css';
import Row from '../row/Row';
import Panel from '../panel/Panel';

export const ReservationIndexItem = ({reservation, type}) =>{


  return (
    <Row className='reservation-index-item-container'>
      <img src="" alt="" />
      <Panel className='reservation-index-item-info-panel'>
        
      </Panel>
      {type == 'upcoming' && <Panel className='reservation-index-item-button-panel'>
        <button> Bring a friend </button>
        <button> Cancel Reservation </button>
      </Panel >}
    </Row>
  )
}


export default ReservationIndexItem