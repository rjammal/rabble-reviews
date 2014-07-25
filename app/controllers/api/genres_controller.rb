class Api::GenresController < ApplicationController

  def index
    genres = Genre.order(:name)
    render json: genres
  end
end