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
  validates :student_id, uniqueness: { scope: :lesson_date_id }

  belongs_to :student,
    foreign_key: :student_id,
    class_name: :User

  belongs_to :lesson_date,
    foreign_key: :lesson_date_id,
    class_name: :LessonDate

  

  attr_accessor :user_reserved, :start_time, :end_time, :status, :location_id, :lesson_id,
  :lesson_title, :lesson_type, :lesson_description, :location_name, :location_description, :lesson, :location, :lesson_image_url, :location_image_url


end
