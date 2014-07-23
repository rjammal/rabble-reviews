class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :author_id, null: false
      t.integer :game_id, null: false
      t.integer :rating, null: false
      t.text :review, null: false

      t.timestamps
    end

    add_index :reviews, :author_id
    add_index :reviews, :game_id
  end
end
