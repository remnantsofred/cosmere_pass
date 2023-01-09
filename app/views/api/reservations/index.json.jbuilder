@reservations.each do |reservation|
  json.set! reservation.id do
    json.extract! reservation, :id, :student_id, :lesson_date_id, :user_reserved
    
  end

end