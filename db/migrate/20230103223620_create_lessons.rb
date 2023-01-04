class CreateLessons < ActiveRecord::Migration[7.0]
  def change
    create_table :lessons do |t|
      t.string :title, null: false
      t.integer :type, null: false
      t.text :description, null: false
      
      t.integer :max_capacity, null: false

      t.timestamps
    end
  end
end
