# README


<!-- Brief explanation of what the app is and does -->
<!-- Link to live site -->
<!-- Discussion of technologies used -->
<!-- Delve deep into ~2 features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions. -->
<!-- Code snippets to highlight your best code (markdown code snippets, NOT screenshots) -->

![Cosmerepass Splash](./frontend/src/assets/cosmerepass_readme_splash.png)

## Cosmerepass
Cosmerepass is a clone of the fitness app Classpass. Instead of finding and booking fitness classes, users will search for and book magic lessons in Brandon Sanderson's Cosmere universe (a fictional fantasy universe where the common thread is the unit of energy called investiture which allows for different expressions of magic-like powers).

***
[Cosmerepass Live Link](https://cosmere-pass.onrender.com/ "Cosmerepass")

Users will be able to browse lessons, check out locations, and filter by investiture type and location. Users can make lessondate reservations from the search page or reserve lessondates from the Location show page. Users can also read, write, edit, and delete their own reviews for Locations. A logged in user can navigate to the account page to view all their upcoming reservations (with the option to cancel or invite a friend along), view attended reservations, and view, edit, or delete their reviews. 

### Technologies Used

Cosmerepass was developed using:
* Backend: Ruby on Rails
* Database: PostgreSQL
* Frontend: React/Redux, CSS3 and HTML5

Cosmerepass also utilizes the Google Maps API. 

### Featured Features
***
#### Dynamic Reserve Button
One of the most fun and powerful aspects of working with React was dynamically rendering content based on conditions. At first I really enjoyed using ternaries to show one of two possible components. Eventually I had so many different conditions I had to pull out the logic into a helper function rather than rely solely on ternaries.  

Below is an example of dynamically rendered content in my app. When a user is not logged in and is on a Location show page, they will see a "Sign up" button for each lessondate. The signup button takes them to the sign up page. 
When a user is logged in, there are four possible scenarios:
* user has booked this lessondate: the button will show "Cancel" with text under stating "reserved"
* user has not booked this lessondate, but there are no remaining slots: the button will be grayed out and show "Lesson full" with text below stating "No available slots". The cursor becomes "no-drop" type at hover.
* user has not booked this lessondate, and there are remaining slots: the button will show "Reserve" and list the number of availble slots.
* user has not booked this lessondate, and there are remaining slots BUT user has already reserved another lesson that overlaps with this one: the button appears like the scenario above, but upon hover a tool tip will pop up warning the user they will be doubled booked and will have to cancel a reservation in order to not be charged a no-show fee. 

![image](https://user-images.githubusercontent.com/114616864/218896396-3a4fabc5-92f9-475d-abc0-7751a5240030.png)
![image](https://user-images.githubusercontent.com/114616864/218905111-0b635ca5-5812-4cc7-92f5-4f63b3fc0e46.png)


I used the same idea and similar code to dynamically render a Review button, which would be different depending on:
* user logged out
* user logged in:
  * user has taken a lesson at that location
  * user has not yet taken a lesson at that location

#### Dynamic Reserve Button code snippet:
```jsx
// From LessonDatesIndexItem.jsx file
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



#### Review Modal with Dynamic Dropdown Options
I really enjoyed creating modals for the first time during this project. In total I have 5 different types of modals, each utilizing the same core component. 

The create review modal includes a dropdown menu with options. The options vary by location and are the lesson types offered at that location. Additionally, the options are made available only if the logged in user has taken that particular lesson. Otherwise, a tooltip text will appear beneath the dropdown option, explaining why the user cannot select that option, either "You have already reviewed this lesson" or "You have not yet taken this lesson." The option will also be disabled, with further context given via changing the cursor to no-drop. 

![image](https://user-images.githubusercontent.com/114616864/218906014-ef31e78c-6e7c-4c4f-8c8b-15aa9e358376.png)


#### Review Modal with Dynamic Dropdown Options code snippet:
```jsx
// From ReviewFormModal.jsx file 

// Map the dropdown options
const dropdownOptions = lessons.map( lesson => {
  if (currentUser.lessonsTaken.includes(lesson.id) && !currentUser.lessonsReviewed.includes(lesson.id)) {
    return {value: lesson.id, label: lesson.title, isDisabled: false}
  }
  else if(currentUser.lessonsTaken.includes(lesson.id) && currentUser.lessonsReviewed.includes(lesson.id)) {
    return {value: lesson.id, label: lesson.title, isDisabled: "alreadyReviewed"}
  }
  else if (!currentUser.lessonsTaken.includes(lesson.id)) {
    return {value: lesson.id, label: lesson.title, isDisabled: "notYetTaken"}
  }
})

// If new review (create review modal), then render dropdown of options mapped above. If edit review modal, render the already reviewed lessonTitle 
const reviewLessonTitle = () => {
  if (!review) {
    return (
      <DropdownMenu location={location} placeholder="Select..." options={dropdownOptions} setReviewLessonFromDropdown={setReviewLessonFromDropdown} update={update} source="reviewForm" />
    )
  }
  else {
    return (
      <div className='editReviewLessonTitle'>{review.lessonTitle}</div>
    )
  }
}

// From DropdownMenu.jsx file

// Disabled dropdown menu options will show the corresponding tool tip. Regular dropdown menu options will hae an onClick which selects that menu option
const dropDownOptions = options.map( option => {
    if (option.isDisabled === false) {
      return (
        <div 
          onClick={() => onItemClick(option)} 
          key={option.value} 
          className={`dropdown-item ${isSelected(option) && "selected"} ${option.isDisabled}`} 
          >
          {option.label}
        </div>
      )
    } else {
      return (
        <div 
          
          key={option.value} 
          className={`dropdown-item ${isSelected(option) && "selected"} ${option.isDisabled}`} 
          disabled='true'
          onMouseEnter={()=>setToolTipIsShown(`${option.value}-${option.isDisabled}`)}
          onMouseLeave={()=>setToolTipIsShown(false)}
          >
          {option.label}

          {toolTipIsShown === `${option.value}-alreadyReviewed` && <ToolTip className="review-already-reviewed" text="You have already reviewed this lesson." />}
          {toolTipIsShown === `${option.value}-notYetTaken` && <ToolTip className="review-already-reviewed" text="You have not yet taken this lesson." />}
        </div>
      )
    }
    
  })

```


#### Beefing up the Backend
Something else I learned to do with Cosmerepass was do a lot of the heavy lifting of calcuations on the backend versus the frontend. I learned to add attr_accessors to create fields, then I would write out the logic for the fields in the corresponding controller. Finally, I would make sure to update the corresponding jbuilder file so that you would have access to those fields from the frontend.


```rb
## From lesson_date.rb file
## Start by adding attr_accessors to the model file
attr_accessor :max_capacity, :reserved_slots, :remaining_slots, :credits, :user_has_reservation, :current_user_reservation_id, :location_id, :lesson_type, :current_user_would_be_doublebooked

## From lesson_dates_controller.rb file
## Here is a helper function set_lesson_date_details that would add all the fields I wanted for additional information I didn't want to keep in the database but needed to utilize

def set_lesson_date_details(lesson_date)
  lesson_date.max_capacity = lesson_date.lesson.max_capacity
  lesson_date.reserved_slots = lesson_date.reservations.length
  lesson_date.remaining_slots = lesson_date.max_capacity - lesson_date.reserved_slots
  lesson_date.reservation_ids = lesson_date.reservations.map do |reservation|
    reservation.id
  end
  if current_user 
    current_user.set_user_details

    lesson_date.reservations.each do |reservation|
      if reservation.student_id == current_user.id
        lesson_date.user_has_reservation = true
        lesson_date.current_user_reservation_id = reservation.id
      end
    end

    # each reservation_datetime is an array of a start and end time
    current_user.reservation_datetimes.each do |reservation_datetime| 
      if lesson_date.start_time.between?(reservation_datetime[0], reservation_datetime[1]) || lesson_date.end_time.between?(reservation_datetime[0], reservation_datetime[1])
        lesson_date.current_user_would_be_doublebooked = true
      end
    end
    lesson_date.current_user_would_be_doublebooked = false if lesson_date.current_user_would_be_doublebooked != true

  end

  lesson_date.location_id = lesson_date.lesson.location_id
  lesson_date.lesson_type = lesson_date.lesson.lesson_type

  return lesson_date
end

## From the index.json.jbuilder file for lesson_dates
## Make sure to set the attr_accessor fields so that they are available in the frontend

@lesson_dates.each do |lesson_date|
  json.set! lesson_date.id do
    json.extract! lesson_date, :id, :lesson_id, :start_time, :end_time, :max_capacity, :reserved_slots, :remaining_slots, :reservation_ids
    json.photoURL lesson_date.lesson.photo.url
    json.user_has_reservation lesson_date.user_has_reservation
    json.current_user_reservation_id lesson_date.current_user_reservation_id
    json.location_id lesson_date.location_id
    json.lesson_type lesson_date.lesson_type
    json.current_user_would_be_doublebooked lesson_date.current_user_would_be_doublebooked
  end
end

```
### Screencaptures

#### Login & search page
![cosmerepass-login-search](https://user-images.githubusercontent.com/114616864/220213028-173c16cb-2e15-4e7f-a01c-1b78b69b8efb.gif)

#### Map marker info blurb
![cosmerepass-map-info-blurb](https://user-images.githubusercontent.com/114616864/220213001-2de05fd0-1046-45e8-8a1d-513330212ebd.gif)

#### Make & cancel reservation
![cosmerepass-make-cancel-res](https://user-images.githubusercontent.com/114616864/220212987-8de9f0bf-7182-4e52-9a92-edd6e80ae891.gif)

#### Double-booked tool tip
![cosmerepass-doublebooked](https://user-images.githubusercontent.com/114616864/220212963-5ced5224-e26f-4c2b-a997-505db043c951.gif)

#### Leave a review
![cosmerepass-leave-review](https://user-images.githubusercontent.com/114616864/220212915-365fdabd-702d-4907-9637-55744c54dbc7.gif)

#### Edit review
![cosmerepass-edit-review](https://user-images.githubusercontent.com/114616864/220212936-b94bb3c0-f998-464b-9f40-725d00fec304.gif)


