class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.decimal :lat
      t.decimal :lng
      t.string :user_id

      t.timestamps
    end
  end
end
