import { GiMagicPalm, GiBiceps, GiMagicPortal, GiMagicSwirl } from 'react-icons/gi';
import { GiBoltSpellCast, GiFireSpellCast, GiIceSpellCast, GiSpellBook } from 'react-icons/gi';
import { BsCalendarCheck } from 'react-icons/bs';
import { CgLockUnlock } from 'react-icons/cg';  
import { SiCodemagic } from 'react-icons/si';


import './Icon.css'

// class Icon extends React.Component {
//   render() {
//     return (
//       <GiMagicPalm />
//     );
//   }
// }

export const PalmIcon = ({children, id="", className="icon"}) => {
  return (
    <GiMagicPalm className={className} id={id}/>
  );
}

export const BicepIcon = ({children, id="", className="icon"}) => {
  return (
    <GiBiceps className={className} id={id}/>
  );
}

export const PortalIcon = ({children, id="", className="icon"}) => {
  return (
    <GiMagicPortal className={className} id={id}/>
  );
}

export const MagicSwirlIcon = ({children, id="", className="icon"}) => {
  return (
    <GiMagicSwirl className={className} id={id}/>
  );
}

export const MagicStarIcon = ({children, id="", className="icon"}) => {
  return (
    <SiCodemagic className={className} id={id}/>
  );
}

export const CalendarIcon = ({children, id="", className="icon"}) => {
  return (
    <BsCalendarCheck className={className} id={id}/>
  );
}

export const UnlockIcon = ({children, id="", className="icon"}) => {
  return (
    <CgLockUnlock className={className} id={id}/>
  );
}

export const SpellCastBoltIcon = ({children, id="", className="icon"}) => {
  return (
    <GiBoltSpellCast className={className} id={id}/>
  );
}

export const SpellCastFireIcon = ({children, id="", className="icon"}) => {
  return (
    <GiFireSpellCast className={className} id={id}/>
  );
}

export const SpellCastIceIcon = ({children, id="", className="icon"}) => {
  return (
    <GiIceSpellCast className={className} id={id}/>
  );
}

export const SpellBookIcon = ({children, id="", className="icon"}) => {
  return (
    <GiSpellBook className={className} id={id}/>
  );
}


