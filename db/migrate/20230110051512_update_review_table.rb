class UpdateReviewTable < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :location_id, :integer, foreign_key: true
  end
end
