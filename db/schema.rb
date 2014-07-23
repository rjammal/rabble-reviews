# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140723202904) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: true do |t|
    t.string   "name",          null: false
    t.string   "type",          null: false
    t.integer  "year_released"
    t.integer  "min_players"
    t.integer  "max_players"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "games", ["max_players"], name: "index_games_on_max_players", using: :btree
  add_index "games", ["min_players"], name: "index_games_on_min_players", using: :btree
  add_index "games", ["name"], name: "index_games_on_name", using: :btree
  add_index "games", ["type"], name: "index_games_on_type", using: :btree
  add_index "games", ["year_released"], name: "index_games_on_year_released", using: :btree

  create_table "reviews", force: true do |t|
    t.integer  "author_id",  null: false
    t.integer  "game_id",    null: false
    t.integer  "rating",     null: false
    t.text     "review",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reviews", ["author_id"], name: "index_reviews_on_author_id", using: :btree
  add_index "reviews", ["game_id"], name: "index_reviews_on_game_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name",            null: false
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["name"], name: "index_users_on_name", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
