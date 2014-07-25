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
  
  validates :game, :genre, presence: true

  belongs_to :game
  belongs_to :genre

end
