# == Schema Information
#
# Table name: games
#
#  id            :integer          not null, primary key
#  name          :string(255)      not null
#  game_type     :string(255)      not null
#  year_released :integer
#  min_players   :integer
#  max_players   :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class Game < ActiveRecord::Base

  validates :name, :game_type, presence: true
  validates :type, inclusion: { in: ["video", "board"] }

  has_many :game_genres
  has_many :genres, through: :game_genres, source: :genre

end
