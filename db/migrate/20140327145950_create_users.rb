class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :password_conf
      t.string :remember_token

      t.timestamps
    end
  end
end
