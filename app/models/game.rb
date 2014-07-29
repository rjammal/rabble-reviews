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
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Game < ActiveRecord::Base

  validates :name, :game_type, presence: true
  validates :game_type, inclusion: { in: ["Video", "Board"] }

  has_many :reviews
  has_many :game_genres
  has_many :genres, through: :game_genres, source: :genre

  has_attached_file :image, :styles => {
    :small => "200x200>"
  }
  validates_attachment_content_type(
    :image,
    :content_type => /\Aimage\/.*\Z/
  )

  def rating
    (reviews.average(:rating) || 0).round(2)
  end

  def self.search(terms)

    clauses = []
    arguments = []

    # where values on game
    KeywordSearch.search(terms) do |with| 

      with.default_keyword :name

      with.keyword :name do |values|
        clauses << "name like ?"
        arguments << "%#{values.join(' ')}%"
      end

      with.keyword :game_type do |values|
        clauses << "game_type like ?"
        arguments << "%#{values[0].capitalize}%"
      end

    end

    query = clauses.map { |clause| "(#{clause})"}.join(" AND ")
    results = Game.where(query, *arguments)

    # searching on reviews using having
    clauses = []
    arguments = []
    KeywordSearch.search(terms) do |with|
      
      with.keyword :min_reviews do |values|
        clauses << "count(reviews.id) >= ?"
        arguments << "#{values[0].to_i}"
      end

      with.keyword :max_reviews do |values|
        clauses << "count(reviews.id) <= ? OR count(reviews.id) IS NULL"
        arguments << "#{values[0].to_i}"
      end      

      with.keyword :min_rating do |values|
        clauses << "avg(rating) >= ?"
        arguments << "#{values[0].to_f}"
      end

      with.keyword :max_rating do |values|
        clauses << "avg(rating) <= ? OR avg(rating) IS NULL"
        arguments << "%#{values[0].to_f}%"
      end
    end

    query = clauses.map { |clause| "(#{clause})"}.join(" AND ")
    results
      .joins("LEFT JOIN reviews ON games.id = reviews.game_id")
      .group("games.id")
      .having(query, *arguments)
  end

end
