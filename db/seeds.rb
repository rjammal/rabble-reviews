# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ActiveRecord::Base.transaction do 
  Genre.create!(name: "rpg")
  Genre.create!(name: "shooter")
  Genre.create!(name: "strategy")
  Genre.create!(name: "cooperative")
  Genre.create!(name: "puzzle")
  Genre.create!(name: "party game")
end