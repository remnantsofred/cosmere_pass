import './MapInfoBlurb.css';



export const MapInfoBlurb = ({className="", id="", location}) => {


  return (  
    <Row className={`locationIdxItmRow ${className} MapInfoBlurbContainer`} onClick={() => {history.push(`/locations/${location.id}`)}}>
      <Column className='locationIdxItmImgCol'>
        <img src={location.imageURL} alt="" className='locationIdxImg'/>
      </Column>
      <Column className={`${className} map-info-blurb-info-col locationIdxItminfoCol`}>
        <h3 className="locationIdxItmLessonType">{location.lessonTypes.join(", ")}</h3>
        <NavLink to={`/locations/${location.id}`} className="locationIdxItmLink">{location.locationName}</NavLink>
        <h3 className="locationIdxItmLoc">{location.world}</h3>
        <Row className='LocIdxItmratingsRow'>
          <h4 className="locationIdxItmRating">{location.averageRating.toFixed(1)}</h4>
          <StarIcon className='starIcon'/>
          <p className='locRevCt'>({location.reviewCount})</p>
        </Row>
      </Column>
    </Row>
  )
}

export default MapInfoBlurb;