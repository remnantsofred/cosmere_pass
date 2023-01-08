import './AccountPage.css';
import Panel from '../panel/Panel';
import Panels from '../panels';
import Row from '../row/Row';

export const AccountPage = () => {


  return(
    <Panels className='AccountPagePanels'>
      <Panel className='AcctPagePanelL'>
        
        <Row>Name</Row>
        <Row>Upcoming</Row>
        <Row>Attended</Row>
        <Row>Favorites</Row>
        <Row>Reviews</Row>
      </Panel>
      <Panel className='AcctPagePanelR'>
        

      </Panel>
    </Panels>
  )
}

export default AccountPage;