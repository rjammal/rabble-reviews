class CreateGameGenres < ActiveRecord::Migration
  def change
    create_table :game_genres do |t|
      t.integer :game_id, null: false
      t.integer :genre_id, null: false

      t.timestamps
    end

    add_index :game_genres, :game_id
    add_index :game_genres, :genre_id
    add_index :game_genres, [:genre_id, :game_id], unique: true
  end
end
