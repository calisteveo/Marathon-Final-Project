class JourneysController < ApplicationController
  
  def index
    @user=current_user
    @journeys= @user.journeys

    respond_to do |f|
      f.html
      f.json {render :json => @journeys.to_json(:include => { :users => { :only => :username} })}
    end
  end

  def new
    @journey=Journey.new
  end

  def create
    @list = []
    new_journey = params.require(:journey)
    signed_in? ? id = current_user.id : nil
    @journey = Journey.create(origin: new_journey["start"], destination: new_journey["end"], user_id: id)

    redirect_to '/runit'
  end

  def show
    @journey = Journey.find(params[:id])
  end

  def destroy
    journey = Journey.find(params[:id])
    journey.delete
    user_id = current_user.id
    redirect_to "/users/#{user_id}"
  end
end
