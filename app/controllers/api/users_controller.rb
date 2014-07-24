class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    @user.password = user_params["password"]
    if @user.save
      log_in!(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
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