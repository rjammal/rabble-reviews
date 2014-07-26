# == Schema Information
#
# Table name: games
#
#  id                 :integer          not null, primary key
#  name               :string(255)      not null
#  game_type          :string(255)      not null
#  year_released      :integer
#  min_players        :integer
#  max_players        :integer
#  created_at         :datetime
#  updated_at         :datetime
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class Game < ActiveRecord::Base

  validates :name, :game_type, presence: true
  validates :game_type, inclusion: { in: ["Video", "Board"] }

  has_many :reviews
  has_many :game_genres
  has_many :genres, through: :game_genres, source: :genre

  has_attached_file :photo, styles: {
      thumbnail: "100x100>"
    }

  validates_attachment_content_type(
      :photo,
      :content_type => /\Aimage\/.*\Z/
    )

  def rating
    reviews.average(:rating)
  end

end
