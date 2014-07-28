# == Schema Information
#
# Table name: review_votes
#
#  id        :integer          not null, primary key
#  review_id :integer          not null
#  user_id   :integer          not null
#

class ReviewVote < ActiveRecord::Base

  validates :review, :user, presence: true
  validates :review, uniqueness: {scope: :user}

  belongs_to :review 
  belongs_to :user 
end
