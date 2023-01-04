class AddForeignKeyLessons < ActiveRecord::Migration[7.0]
  def change
    add_column :lessons, :location_id, :bigint, null: false
    add_index :lessons, :location_id
  end
end
