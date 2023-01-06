# == Schema Information
#
# Table name: lessons
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  lesson_type  :string           not null
#  description  :text             not null
#  max_capacity :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  location_id  :bigint           not null
#
class Lesson < ApplicationRecord
  validates :title, :lesson_type, :description, :max_capacity, :location_id, presence: true
  validates :lesson_type, inclusion: { in: %w(Allomancy Awakening Surgebinding Feruchemy Stormlight) }

  belongs_to :location,
    foreign_key: :location_id,
    class_name: :Location

  has_one_attached :photo
end
