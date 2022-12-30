import { GiMagicPalm } from 'react-icons/gi';
import './Icon.css'

// class Icon extends React.Component {
//   render() {
//     return (
//       <GiMagicPalm />
//     );
//   }
// }

export const Icon = ({children, id="", className="icon"}) => {
  return (
    <GiMagicPalm className={className} id={id}/>
  );
}

export default Icon;