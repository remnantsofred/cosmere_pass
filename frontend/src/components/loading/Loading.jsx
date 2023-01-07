import './Loading.css';
import cosmere from '../LoginFormPage/Cosmere_symbol.png';
import Panel from '../panel/Panel';

export const Loading = () => {

  return (
    <Panel className='LoadingPanel'>
      <img src={cosmere} id="spinningCosmere"/>
      <p className='loadingText'>Loading ...</p>
    </Panel>
  )
}

export default Loading;