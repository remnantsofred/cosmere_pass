
@reviews.each do |review|
  json.set! review.id do
    json.extract! review, :id, :lesson_id, :reviewer_id, :rating, :body, :location_id
    json.lesson_title review.lesson_title
    json.months_ago review.months_ago
    json.days_ago review.days_ago
    json.hours_ago review.hours_ago
    json.minutes_ago  review.minutes_ago
  end
end
