json.extract! game, :id, :name, :game_type, :min_players, :max_players, :year_released, :rating

json.genres game.genres do |genre| 
  json.extract! genre, :name
end

json.reviews game.reviews do |review|
  json.extract! review, :review, :author, :game_id, :rating, :created_at, :updated_at
end