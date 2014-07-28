class ReviewVotesController < ApplicationController

  def create
    review_vote = ReviewVote.new(author_id: current_user.id, review_id: params[:review_id])
    if @review_vote.save
      render json: review_vote
    else
      render json: review_vote.errors.full_messages, status: 422
    end
  end

  def destroy
    review_vote = ReviewVote.find(params[:id])
    review_vote.destroy
    render json: review_vote
  end

end