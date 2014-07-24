# == Schema Information
#
# Table name: genres
#
#  id         :integer          not null, primary key
#  name       :text             not null
#  created_at :datetime
#  updated_at :datetime
#

class Genre < ActiveRecord::Base
  validates :name, presence: true

  has_many :game_genres
  has_many :games, through: :game_genres, source: :games
end
