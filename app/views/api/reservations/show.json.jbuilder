json.extract! @reservation, :id, :student_id, :lesson_date_id
json.user_reserved @reservation.user_reserved
json.start_time @reservation.start_time
json.end_time @reservation.end_time
json.status @reservation.status
json.location_id @reservation.location_id
json.lesson_title @reservation.lesson_title
json.lesson_type @reservation.lesson_type
json.lesson_description @reservation.lesson_description
json.location_name @reservation.location_name
json.location_description @reservation.location_description 
json.lesson_image_url @reservation.lesson_image_url
json.location_image_url @reservation.location_image_url


