class Api::GamesController < ApplicationController

  wrap_parameters include: [:name, :game_type, :genres, :min_players, :max_players, :year_released]

  def index
    games = Game.all
    render json: games
  end

  def create
    # convert genre names to genre objects
    if game_params[:genres]
      game_params[:genres].map! do |name| 
        Genre.find_by_name(name)
      end
    end
    game = Game.new(game_params)
    if game.save 
      render json: game
    else
      render json: game.errors.full_messages
    end
  end

  def show
    game = Game.find(params[:id])
    render json: game
  end

  private
  def game_params
    params.require(:game).permit(:name, :game_type, :genres, :min_players, :max_players, :year_released)
  end

end