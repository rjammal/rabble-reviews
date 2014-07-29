json.extract! game, :id, :name, :game_type, :min_players, :max_players, :year_released, :rating

json.image game.image(:small)

json.genres game.genres do |genre| 
  json.extract! genre, :name
end

json.reviews game.reviews do |review|
  json.extract! review, :id, :review_body, :author, :game_id, :rating, :created_at, :updated_at

  json.review_votes review.review_votes do |vote|
    json.extract! vote, :id, :user_id
  end
end