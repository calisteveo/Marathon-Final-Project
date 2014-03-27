class JourneysController < ApplicationController
  def new
    @journey=Journey.new
  end

  def create
    @list = []
    new_journey = params.require(:journey)
    @journey = Journey.create(origin: new_journey["start"], destination: new_journey["end"], user_id: id)

    flash[:message]="Your route has been saved"
    redirect_to '/runthere'
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
