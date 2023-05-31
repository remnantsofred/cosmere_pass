@reservations.each do |reservation|
  json.set! reservation.id do
    json.extract! reservation, :id, :student_id, :lesson_date_id, :user_reserved, :start_time, :end_time, :status, :location_id, :lesson_id, :lesson_title, :lesson_type, :lesson_description, :location_name, :location_description, :lesson_image_url, :location_image_url
    
  end

end