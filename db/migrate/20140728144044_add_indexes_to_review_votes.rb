class AddIndexesToReviewVotes < ActiveRecord::Migration
  def change
    add_index :review_votes, :user_id
    add_index :review_votes, :review_id
    add_index :review_votes, [:user_id, :review_id], unique: true
  end
end
