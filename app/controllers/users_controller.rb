class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      redirect_to api_games_url
    else
      render json: @user.errors.full_messages
    end
  end

  def new
    @user = User.new()
  end

  private 
  def user_params
    params.require(:user).permit(:name, :password)
  end  

end