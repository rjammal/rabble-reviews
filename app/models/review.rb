# == Schema Information
#
# Table name: reviews
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  game_id     :integer          not null
#  rating      :integer          not null
#  review_body :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Review < ActiveRecord::Base

  validates :author, :game, :rating, :review_body, presence: true
  validates :author_id, uniqueness: {scope: :game_id}

  belongs_to :game
  belongs_to :author, foreign_key: :author_id, class_name: "User"

end
