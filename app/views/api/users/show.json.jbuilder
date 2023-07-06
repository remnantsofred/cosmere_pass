json.extract! @user, :id, :email, :username
json.reservation_datetimes @user.reservation_datetimes
json.reservations @user.reservations
json.lessons_taken @user.lessons_taken
json.lessons_reviewed @user.lessons_reviewed
json.past_reservations @user.past_reservations
json.upcoming_reservations @user.upcoming_reservations
json.locations_visited @user.locations_visited
json.reviews @user.reviews
json.lessondates_taken @user.lessondates_taken
json.lessondates_upcoming @user.lessondates_upcoming