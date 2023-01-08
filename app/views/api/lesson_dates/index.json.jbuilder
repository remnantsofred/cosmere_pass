
@lesson_dates.each do |lesson_date|
  json.set! lesson_date.id do
    json.extract! lesson_date, :id, :lesson_id, :start_time, :end_time
    # json.photoURL lesson.photo.url
  end
end
