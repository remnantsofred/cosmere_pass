class AddForeignKeyLocationIdtoLessons < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :lessons, :locations
  end
end
