json.extract! @user, :id, :email, :username
json.reservation_datetimes @user.reservation_datetimes
json.reservations @user.reservations
