json.extract! @lesson_date, :id, :lesson_id, :start_time, :end_time, :max_capacity, :reserved_slots, :remaining_slots, :reservation_ids
json.photoURL @lesson_date.lesson.photo.url
json.user_has_reservation @lesson_date.user_has_reservation
json.current_user_reservation_id @lesson_date.current_user_reservation_id
json.location_id @lesson_date.location_id
json.lesson_type @lesson_date.lesson_type
json.current_user_would_be_doublebooked @lesson_date.current_user_would_be_doublebooked
