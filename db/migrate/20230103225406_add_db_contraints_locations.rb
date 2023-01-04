class AddDbContraintsLocations < ActiveRecord::Migration[7.0]
  def change
    change_column :locations, :location_name, :string, null: false
    change_column :locations, :description, :text, null: false
  end
end
