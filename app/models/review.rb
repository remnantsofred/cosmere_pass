# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  lesson_id   :bigint           not null
#  reviewer_id :bigint           not null
#  rating      :integer          not null
#  body        :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  location_id :bigint           not null
#
class Review < ApplicationRecord
  validates :lesson_id, :reviewer_id, :rating, :body, :location_id, presence: true
  validates :rating, inclusion: { in: (1..5) }
  validates :lesson_id, uniqueness: { scope: :reviewer_id }

  belongs_to :lesson,
    foreign_key: :lesson_id,
    class_name: :Lesson

  belongs_to :reviewer,
    foreign_key: :reviewer_id,
    class_name: :User

  belongs_to :location,
    foreign_key: :location_id,
    class_name: :Location

  attr_accessor :lesson_title, :months_ago, :weeks_ago, :days_ago, :hours_ago, :minutes_ago, :reviewer_username

end
