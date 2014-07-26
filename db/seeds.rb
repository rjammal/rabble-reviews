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

  guest = User.create!(name: "Guest", password: "password")
  rosemary = User.create!(name: "rosemary", password: "password")

  puerto_rico = Game.create!(name: "Puerto Rico", game_type: "Board", min_players: 2, max_players: 5, genres: [strategy, world_building])
  mariokart = Game.create!(name: "MarioKart", game_type: "Video", min_players: 1, max_players: 4, genres: [racing])
  dominion = Game.create!(name: "Dominion", game_type: "Board", min_players: 2, max_players: 4, genres: [card_game])
  minecraft = Game.create!(name: "Minecraft", game_type: "Video")

  puerto_rico.reviews.create!(review: "It's a great game", rating: 5, author: guest)
  puerto_rico.reviews.create!(review: "It's my favorite board game", rating: 5, author: rosemary)
  minecraft.reviews.create!(review: "What's the point? Graphics are awful!", rating: 2, author: guest)
  minecraft.reviews.create!(review: "I like building things!", rating: 4, author: rosemary)
  mariokart.reviews.create!(review: "Great party game, and good solo too.", rating: 5, author: rosemary)

end