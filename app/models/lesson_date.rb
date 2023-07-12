# == Schema Information
#
# Table name: lesson_dates
#
#  id         :bigint           not null, primary key
#  lesson_id  :bigint           not null
#  start_time :datetime         not null
#  end_time   :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class LessonDate < ApplicationRecord
  validates :lesson_id, :start_time, :end_time, presence: true

  belongs_to :lesson,
    foreign_key: :lesson_id,
    class_name: :Lesson

  has_many :reservations,
    foreign_key: :lesson_date_id,
    class_name: :Reservation,
    dependent: :destroy

  # has_one :location, through: :lesson


  attr_accessor :max_capacity, :reserved_slots, :remaining_slots, :credits, :user_has_reservation, :current_user_reservation_id, :location_id, :lesson_type, :current_user_would_be_doublebooked

end
