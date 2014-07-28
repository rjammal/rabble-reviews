class CreateReviewVotes < ActiveRecord::Migration
  def change
    create_table :review_votes do |t|
      t.integer :review_id, null: false
      t.integer :user_id, null: false
    end
  end

end
