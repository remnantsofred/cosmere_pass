class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :student, null: false, foreign_key: { to_table: :users }
      t.references :lesson_date, null: false, foreign_key: true

      t.timestamps
    end
  end
end
