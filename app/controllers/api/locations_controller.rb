class Api::LocationsController < ApplicationController
  def index
    @locations = Location.all
    
  end 

  def show
    @location = Location.find(params[:id])
  end

  


  private
  def location_params
    params.require(:location).permit(:location_name, :description)
  end

end