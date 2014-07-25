class Api::GamesController < ApplicationController

  def index
    games = Game.all
    render json: games
  end

  def create
    
    game = Game.new(game_params)

    genres = params[:genres] || []
    # convert genre names to genre objects
    genres.each do |name| 
      game.genres << Genre.find_by_name(name)
    end

    if game.save 
      render json: game
    else
      render json: game.errors.full_messages, status: 422
    end
  end

  def show
    game = Game.find(params[:id])
    render json: game
  end

  private
  def game_params
    params.require(:game).permit(:name, :game_type, :min_players, :max_players, :year_released, genres: [])
  end

end