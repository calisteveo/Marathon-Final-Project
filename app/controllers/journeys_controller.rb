class JourneysController < ApplicationController

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
