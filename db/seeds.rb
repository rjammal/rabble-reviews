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

  puerto_rico.reviews.create!(review_body: "It's a great game", rating: 5, author: guest)
  puerto_rico.reviews.create!(review_body: "It's my favorite board game", rating: 5, author: rosemary)
  minecraft.reviews.create!(review_body: "What's the point? Graphics are awful!", rating: 2, author: guest)
  minecraft.reviews.create!(review_body: "I like building things!", rating: 4, author: rosemary)

  total_users = 300
  user_count = 2
  while user_count < total_users
    u = User.new(name: Faker::Internet.user_name + rand(5).to_s, password: Faker::Internet.password)
    if u.save
      user_count += 1
    end
  end

  raw_reviews = [
    [
      "The game was so boring, I didn't bother to finish it", 
      "What a waste of money!", 
      "The graphics are awful and the plot is really weak.", 
      "This game was a real disappointment. The controls were confusing and clunky. Also, the graphics were very choppy and felt hacked together. The plot was predictable and trite and voice acting also made me groan. Avoid this game at all costs!", 
      "Falls flat in every way."
    ], 
    [
      "The gameplay was pretty fun, but it was over so quickly. There's no replay value either. Not worth the money.", 
      "The design was good, but it was so buggy it was almost unplayable. ", 
      "Nothing innovative about it, but at least the controls were pretty smooth.", 
      "The gameplay was pretty boring, but it had a good plot and sense of humor.", 
      "I nearly gave this game the lowest possible rating. Its one saving grace is multiplayer mode. The single player mode was really forced, and unlocking all the items was more of a chore than enjoyable. However, once those items are unlocked, it makes a good multiplayer party game. If you're a hardcore fan, it might be worth it, but otherwise, don't bother. "
    ], 
    [
      "Pretty average.", 
      "A good way to spend a couple hours, but nothing that memorable.", 
      "Hardcore fans of the genre will really enjoy this game, but a lot of the inside jokes will fall flat for others.", 
      "The graphics are really breathtaking, but it doesn't have much of a story to back it up. Also, the controls are clumsy and the camera angles are pretty weak. ",
      "I've come to expect a lot more from this game studio. Their last few releases have been earth shattering, but now it's clear they are just resting on their laurels. "
    ], 
    [
      "This game was hours of solid enjoyment. It may not have implemented anything groundbreaking, but what it did, it did to perfection. Really fun game!", 
      "The game was very short, but the gameplay was a lot of fun. It also has great replay value. ", 
      "The game controls weren't my favorite, but I can easily look past that given how great the plot and characters were. ", 
      "Graphics were good, but there wasn't anything I hadn't seen before. There were some really innovative parts in the game design, but I found myself wanting more. That said, it is still an amazing game. I would definitely recommend it to fans of the genre. ", 
      "I love this genre, and this game is a fine addition to it. "
    ], 
    [
      "This game is a must play! It's pure gold! ", 
      "I spent so many hours playing, and I'm still not tired of it! It's really amazing. THe graphics are superb, the story is interesting, the characters are engaging, the gameplay is smooth and doesn't get tiresome. I'll be playing this game for a long time.", 
      "This is my new favorite game! I can't put it down!", 
      "Wow! I can't believe how good this game is- it's immersive and engaging. I can't get enough!", 
      "This game sets a new bar for the genre. It's groundbreaking! I can't wait for the sequel!"
    ]
  ]

  current_game = ""
  users = User.all
  File.open('db/game_review_counts.txt').each do |line|
    if line[0] != ","
      current_game = line
      next
    else
      count_array = line.split(",")
      if count_array[1] != ""
        rating = count_array[1].to_i
        counter = count_array[2].to_i
      else 
        next # skip games with no reviews
      end
    end
    game = Game.find_by(name: current_game) || Game.create!(name: current_game, game_type: "Video")
    while counter > 0
      review = game.reviews.new
      review.author = users.sample || User.first
      review.rating = rating
      review.review_body = raw_reviews[rating - 1].sample
      if !review.valid?
        review.errors.full_messages
      end
      if review.save
        counter -= 1
      end
    end
  end

  File.open("db/seed_games/board_games.txt").each do |line|
    Game.create!(name: line, game_type: "Board")
  end
end