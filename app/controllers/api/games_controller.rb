class Api::GamesController < ApplicationController

  wrap_parameters include: [:name, :game_type, :genres, :min_players, :max_players, :year_released]

  def index
    games = Game.all
    render json: games
  end

  def create
    game = Game.new(game_params)
    if game.save 
      render json: game
    else
      render json: game.errors.full_messages
    end
  end

  private
  def game_params
    params.require(:game).permit(:name, :game_type, :genres, :min_players, :max_players, :year_released)
  end

end