json.partial! 'location', location: @location

# json.lesson_types do
#   @location.lessons.each do |lesson|
#     json.set! lesson.id do
#       json.extract! lesson, :id, :title, :lesson_type, :description, :max_capacity
#     end
#   end
# end