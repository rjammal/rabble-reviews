# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ActiveRecord::Base.transaction do 
  rpg = Genre.create!(name: "RPG")
  shooter = Genre.create!(name: "Shooter")
  strategy = Genre.create!(name: "Strategy")
  cooperative = Genre.create!(name: "Cooperative")
  puzzle = Genre.create!(name: "Puzzle")
  world_building = Genre.create!(name: "World Building")
  card_game = Genre.create!(name: "Card Game")
  racing = Genre.create!(name: "Racing")
  fighting = Genre.create!(name: "Fighting")
  sports = Genre.create!(name: "Sports")
  party_game = Genre.create!(name: "Party Game")

  User.create!(name: "Guest", password: "password")

  Game.create!(name: "Puerto Rico", game_type: "Board", min_players: 2, max_players: 5, genres: [strategy, world_building])
  Game.create!(name: "MarioKart", game_type: "Video", min_players: 1, max_players: 4, genres: [racing])
  Game.create!(name: "Dominion", game_type: "Board", min_players: 2, max_players: 4, genres: [card_game])
  Game.create!(name: "Minecraft", game_type: "Video")

end