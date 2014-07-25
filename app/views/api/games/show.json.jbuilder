json.extract! @game, :id, :name, :game_type, :min_players, :max_players, :year_released

json.genres @game.genres do |genre| 
  json.extract! genre, :name
end