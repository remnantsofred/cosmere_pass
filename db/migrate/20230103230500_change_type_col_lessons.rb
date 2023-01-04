class ChangeTypeColLessons < ActiveRecord::Migration[7.0]
  def change
    change_column :lessons, :type, :string, null: false
    rename_column :lessons, :type, :lesson_type
  end
end
