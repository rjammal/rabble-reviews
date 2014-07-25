# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ActiveRecord::Base.transaction do 
  Genre.create!(name: "RPG")
  Genre.create!(name: "Shooter")
  Genre.create!(name: "Strategy")
  Genre.create!(name: "Cooperative")
  Genre.create!(name: "Puzzle")
  Genre.create!(name: "World Building")
  Genre.create!(name: "Card Game")
  Genre.create!(name: "Racing")
  Genre.create!(name: "Fighting")
  Genre.create!(name: "Sports")
  Genre.create!(name: "Party Game")

  
end