class Api::ReservationsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def index
    @reservations = Reservation.all

    @reservations = @reservations.map do |reservation|
      if current_user && reservation.student_id == current_user.id
        reservation.user_reserved = true
      else 
        reservation.user_reserved = false
      end
      reservation
    end
  end 

  def show
    @reservation = Reservation.find(params[:id])

    if current_user && @reservation.student_id == current_user.id
      @reservation.user_reserved = true
    else 
      @reservation.user_reserved = false
    end
  end 
  
  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save 
      @reservation.user_reserved = true
      render :show
    else 
      render json: @reservation.errors.full_messages, status: 422
    end 
  end

  def destroy 
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    head :no_content
  end 

  private
  def reservation_params
    params.require(:reservation).permit(:student_id, :lesson_date_id)
  end

  def user_reserved?(current_user, lesson_date_id)
    @reservation = Reservation.find_by(student_id: current_user.id, lesson_date_id: lesson_date_id)
    if @reservation
      return true
    else
      return false
    end
  end

end
