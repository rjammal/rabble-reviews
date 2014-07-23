class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.string :type, null: false
      t.integer :year_released
      t.integer :min_players
      t.integer :max_players

      t.timestamps
    end

    add_index :games, :name
    add_index :games, :type
    add_index :games, :year_released
    add_index :games, :min_players
    add_index :games, :max_players
  end
end
