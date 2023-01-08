# == Schema Information
#
# Table name: locations
#
#  id            :bigint           not null, primary key
#  location_name :string           not null
#  description   :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Location < ApplicationRecord
  validates :location_name, :description, presence: true
  # validates :location_name, inclusion: { in: ("Elendel" "Hallandren" "Kharbranth" "Kholinar" "Luthadel" "Homeland" "Thaylen City" "Purelake" "Urithiru"), message: "%{value} is not a valid location"}
  
  has_many :lessons,
    foreign_key: :location_id,
    class_name: :Lesson,
    dependent: :destroy

  has_many :lesson_dates,
    through: :lessons,
    source: :lesson_dates

  has_many :reviews,
    through: :lessons,
    source: :reviews

  has_one_attached :photo


  attr_accessor :lesson_types
  
end
