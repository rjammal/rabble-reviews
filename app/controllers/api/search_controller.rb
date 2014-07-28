class Api::SearchController < ApplicationController

  def create
    begin
      @games = Game.search(params[:query])
      render "index"
    rescue KeywordSearch::ParseError
      render json: "parse error", status: 422
    end
  end

end