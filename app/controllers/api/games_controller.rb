class Api::GamesController < ApplicationController

  wrap_parameters include: [:name, :game_type, :min_players, :max_players, :year_released, :image, genres: []]

  def index
    begin 
      @page_number = params[:page] || 1
      @query = params[:query] || ""
      @games = Game.page(params[:page]).search(@query).includes(:reviews, :genres)
      render :index
    rescue KeywordSearch::ParseError
      render json: "parse error", status: 422
    end
  end

  def create
    @game = Game.new(game_params)
    puts game.image.url(:thumbnail)

    genres = params[:genres] || []
    # convert genre names to genre objects
    genres.each do |name| 
      @game.genres << Genre.find_by_name(name)
    end

    if @game.save 
      render :show
    else
      render json: @game.errors.full_messages, status: 422
    end
  end

  def show
    @game = Game.find(params[:id])
    render :show
  end

  def update
    @game = Game.find(params[:id])

    genres = params[:genres] || []
    @game.genres = []
    genres.each do |name|
      @game.genres << Genre.find_by_name(name)
    end

    if @game.update_attributes(game_params)
      render :show
    else 
      render json: game.errors.full_messages, status: 422
    end
  end

  private
  def game_params
    params.require(:game).permit(:name, :game_type, :min_players, :max_players, :year_released, :image, genres: [])
  end

end