json.extract! @review, :id, :lesson_id, :reviewer_id, :rating, :body, :location_id
json.lesson_title @review.lesson_title
json.months_ago @review.months_ago
json.days_ago @review.days_ago
json.hours_ago @review.hours_ago
json.minutes_ago  @review.minutes_ago
json.reviewer_username @review.reviewer_username
json.current_user_reviewed @review.current_user_reviewed



