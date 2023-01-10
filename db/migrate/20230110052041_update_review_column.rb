class UpdateReviewColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :location_id
    add_reference :reviews, :location, foreign_key: true, null: false
  end
end
