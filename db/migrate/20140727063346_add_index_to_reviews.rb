class AddIndexToReviews < ActiveRecord::Migration
  def change
    add_index :reviews, [:game_id, :author_id], unique: true
  end
end
