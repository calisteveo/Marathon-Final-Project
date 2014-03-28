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
    new_journey = params.require(:journey).permit(:name, :origin, :orig_lat, :orig_lng, :destination, :dest_lat, :dest_lng, :user_id)
    @journey = Journey.create(origin: new_journey["start"], destination: new_journey["end"])
    render :show
  end

  def show
    @journey = Journey.find(params[:id])
    respond_to do |f|
      f.json {render :json => @journey.to_json(:include => { :users => { :only => :username} })}
    end
  end

  def destroy
    journey_id = params[:id]
    journey = Journey.find_by_id(journey_id)
  
    journey.destroy
    redirect_to :root
  end
end
