class UpdateReviewsAddUniqueIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :reviews, [:lesson_id, :reviewer_id], unique: true
  end
end
