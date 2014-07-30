class Api::SearchController < ApplicationController

  def create
    begin
      @page_number = params[:page] || 1
      @games = Game.search(params[:query]).page(@page_number)
      render "index"
    rescue KeywordSearch::ParseError
      render json: "parse error", status: 422
    end
  end

end