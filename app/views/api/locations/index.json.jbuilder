@locations.each do |location|
  @lessons = location.lessons
  json.set! location.id do
    json.extract! location, :id, :location_name, :description
    json.imageURL location.photo.url
    # json.set! :lessons do #whatever you want to call the field inside the object
    #     json.extract! location.lessons, :id, :title, :lesson_type, :description, :max_capacity
    #     # info you're getting from the associations
    # end
    # json.array! @lessons, :id, :title, :lesson_type, :description, :max_capacity
   
    # json.set! :lesson_ids, location.lesson_ids
    json.lesson_types location.lesson_types
  end
end

# json.lesson_types do
#   @location.lessons.each do |lesson|
#     json.set! lesson.id do
#       json.extract! lesson, :id, :title, :lesson_type, :description, :max_capacity
#     end
#   end
# end