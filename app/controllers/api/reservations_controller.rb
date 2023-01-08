class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.all

    
  end 

  def show
    @reservation = Reservation.find(params[:id])

  end 
  
  def create
    @reservation = Reservation.new(reservation_params)


    if @reservation.save 
      render :show
    else 
      render json: @reservation.errors.full_messages, status: 422
    end 
  end

  def destroy 
    @reservation.destroy
  end 

  private
  def reservation_params
    params.require(:reservation).permit(:student_id, :lesson_date_id)
  end
end
