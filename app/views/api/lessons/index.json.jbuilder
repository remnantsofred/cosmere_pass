# @lessons.each do |lesson|
#   json.set! lesson.id do
#     json.partial! 'lesson', lesson: lesson
#   end
# end

json.array! @lessons do |lesson|
  json.extract! lesson, :id, :title, :lesson_type, :description, :location_id, :max_capacity
  json.photoURL url_for(lesson.photo)
end