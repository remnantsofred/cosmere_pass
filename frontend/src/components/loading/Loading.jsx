import './Loading.css';
import cosmere from '../LoginFormPage/Cosmere_symbol.png';

export const Loading = () => {

  return (
    <>
      <img src={cosmere} id="spinningCosmere"/>
      <p className='loadingText'>...Loading</p>
    </>
  )
}

export default Loading;