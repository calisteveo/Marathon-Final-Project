class UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(params[:id])
    @journey = @user.journeys
    render :show
  end

  def new
    @user = User.new()
  end

  def create
    new_user = params.require(:user).permit(:username, :password, :password_confirmation)
    @user=User.new(new_user)
    if @user.save
      sign_in @user
      redirect_to journeys_path
    else
      render :new
    end
  end
end
