class Api::ReviewsController < ApplicationController

  def create
    @review = Review.new(review_params)
    @review.author_id = current_user.id
    if @review.save
      render "show"
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:game_id, :rating, :review_body)
  end
end