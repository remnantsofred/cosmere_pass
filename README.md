# README


<!-- Brief explanation of what the app is and does -->
<!-- Link to live site -->
<!-- Discussion of technologies used -->
<!-- Delve deep into ~2 features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions. -->
<!-- Code snippets to highlight your best code (markdown code snippets, NOT screenshots) -->

![Cosmerepass Splash](./frontend/src/assets/cosmerepass_readme_splash.png)

## Cosmerepass
Cosmerepass is a clone of the fitness app Classpass. Instead of finding and booking fitness classes, users will search for and book magic lessons in Brandon Sanderson's Cosemere universe (a fictional fantasy universe where the common thread is the unit of energy called investiture which allows for different expressions of magic-like powers).

***
[Cosmerepass Live Link](https://cosmere-pass.onrender.com/ "Cosmerepass")

Users will be able to browse lessons, check out locations, and filter by investiture type and location. Users can make lessondate reservations from the search page or reserve lessondates from the Location show page. Users can also read, write, edit, and delete their own reviews for Locations.

### Technologies Used

Cosmerepass was developed using:
* Backend: Ruby on Rails
* Database: PostgreSQLL
* Frontend: React/Redux, CSS3 and HTML5

Cosmerepass also utilizes the Google Maps API. 

### Featured Features

#### Dynamic Reserve Button
One of the most fun and powerful aspects of working with React was dynamically rendering content based on conditions. At first I really enjoyed using ternaries to show one of two possible components. Eventually I had so many different conditions I had to pull out the logic into a helper function rather than rely solely on ternaries.  

Below is an example of dynamically rendered content in my app. When a user is not logged in and is on a Location show page, they will see a "Sign up" button for each lessondate. The signup button takes them to the sign up page. 
When a user is logged in, there are four possible scenarios:
* user has booked this lessondate: the button will show "Cancel" with text under stating "reserved"
* user has not booked this lessondate, but there are no remaining slots: the button will be grayed out and show "Lesson full" with text below stating "No available slots". The cursor becomes "no-drop" type at hover.
* user has not booked this lessondate, and there are remaining slots: the button will show "Reserve" and list the number of availble slots.
* user has not booked this lessondate, and there are remaining slots BUT user has already reserved another lesson that overlaps with this one: the button appears like the scenario above, but upon hover a tool tip will pop up warning the uesr they will be doubled booked and will have to cancel a reservation in order to not be charged a no-show fee. 


```jsx
const renderLoggedIn = (lessonDate, location, handleResClick, handleCancel, source, currentUser) => {
    if (lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation && !lessonDate.currentUserWouldBeDoublebooked) {
      // if logged in and reservation available and user has not reserved it and it wouldn't be double booked
      return (
        <>
          <button onClick={ () => handleResClick(lessonDate, lesson, location)} className={'lessonDateIdxItmReserve'}>Reserve</button> 
          <p className='remainingSlots'>Available slots: {lessonDate.remainingSlots}</p>
        </>
      )
    } else if (lessonDate.remainingSlots > 0 && !lessonDate.userHasReservation && lessonDate.currentUserWouldBeDoublebooked) {
      // if logged in and reservation available and user has not reserved it BUT WOULD BE double booked
      return (
        <>
          <button 
            onClick={ () => handleResClick(lessonDate, lesson, location)} 
            className={'lessonDateIdxItmReserve double-booked'}
            onMouseEnter={()=>setToolTipIsShown(true)}
            onMouseLeave={()=>setToolTipIsShown(false)}
            >
              Reserve
          </button> 
          
          <p className='remainingSlots'>Available slots: {lessonDate.remainingSlots}</p>
        </>
      )
    } else if (currentUser && lessonDate.userHasReservation) {
      // if logged in and already reserved (show cancel)
      return (
        <>
          <button onClick={ () => handleCancel(lessonDate, lesson, location)} className="lessonDateIdxItmCancel">Cancel</button>
          <p className={source === "search" ? "reserved" : "reservedLocShow"}>reserved</p>
        </>
      )
    } else if (!lessonDate.remainingSlots  && !lessonDate.userHasReservation) {
      // if logged in and reservation full
      return (
        <>
          <button  className='lessonDateIdxItmReserveFull'>Lesson full</button> 
          <p className='remainingSlots'>No available slots</p>
        </>
      )
    }
  }
  
  const renderLoggedOut = () => {
    return (
      <>
        <NavLink to='/signup' className='lessonDateIdxItmReserve loggedOutSignUp'>Sign up</NavLink> 
      </>
    )
  }

```

#### Second feature

#### Code snippet:



