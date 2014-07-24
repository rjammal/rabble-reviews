# == Schema Information
#
# Table name: game_genres
#
#  id         :integer          not null, primary key
#  game_id    :integer          not null
#  genre_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class GameGenre < ActiveRecord::Base
  
  validates :game_id, :genre_id, presence: true

  belongs_to :games
  belongs_to :genres

end