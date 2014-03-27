class SessionsController < ApplicationController
  def new
  end

  def create
    user=User.find_by_username(params[:session][:username].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      redirect_to '/'
    else
      #flash error message and render sign-in form
      flash.now[:error]='Invalid username/password combination'
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to '/'
  end
end
