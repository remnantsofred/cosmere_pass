# == Schema Information
#
# Table name: reservations
#
#  id             :bigint           not null, primary key
#  student_id     :bigint           not null
#  lesson_date_id :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Reservation < ApplicationRecord
  validates :student_id, :lesson_date_id, presence: true

  belongs_to :student,
    foreign_key: :student_id,
    class_name: :User

  belongs_to :lesson_date,
    foreign_key: :lesson_date_id,
    class_name: :LessonDate
end
