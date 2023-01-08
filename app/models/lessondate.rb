class LessonDate < ApplicationRecord
  validates :lesson_id, :start_time, :end_time, presence: true

  belongs_to :lesson,
    foreign_key: :lesson_id,
    class_name: :Lesson

  has_many :reservations,
    foreign_key: :lesson_date_id,
    class_name: :Reservation,
    dependent: :destroy

  attr_accessor :max_capacity
  attr_accessor :remaining_slots

end