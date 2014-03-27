class LocationsController < ApplicationController
  def new
    @location = Location.new
  end

  def create
    new_journey = params.require(:location).permit(:name, :origin, :orig_lat, :orig_lng, :destination, :dest_lat, :dest_lng, :user_id)
    @location = Location.create(new_location)
    render :show
  end

  def show
    @location = Location.find(params[:id])
  end

  def destroy
    location = Location.find(params[:id])
    location.delete
    redirect_to(locations_path)
  end
end
