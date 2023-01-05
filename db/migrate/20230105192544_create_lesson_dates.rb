class CreateLessonDates < ActiveRecord::Migration[7.0]
  def change
    create_table :lesson_dates do |t|
      t.references :lesson, null: false, foreign_key: true
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false

      t.timestamps
    end
  end
end
