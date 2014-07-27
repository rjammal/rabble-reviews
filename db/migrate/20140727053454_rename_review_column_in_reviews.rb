class RenameReviewColumnInReviews < ActiveRecord::Migration
  def change
    change_table :reviews do |t|
      t.rename :review, :review_body
    end
  end
end
