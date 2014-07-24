class Api::GamesController < ApplicationController

  def index
    @games = Game.all
  end

  def create

  end

  private
  def game_params
    params.require(:game).permit(:name, :type, :genre, :min_players, :max_players, :year_released)
  end

end