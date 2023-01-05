# @lessons.each do |lesson|
#   json.set! lesson.id do
#     json.partial! 'lesson', lesson: lesson
#   end
# end

@lessons.each do |lesson|
  json.set! lesson.id do
    json.extract! lesson, :id, :title, :lesson_type, :description, :location_id, :max_capacity
    json.photoURL lesson.photo.url
  end
end