
@reviews.each do |review|
  json.set! review.id do
    json.extract! review, :id, :lesson_id, :reviewer_id, :rating, :body, :location_id
    json.location_id review.location_id
  end
end
