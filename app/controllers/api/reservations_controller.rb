class Api::ReservationsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def index
    
    if params[:user_id]
      @reservations = Reservation.where("student_id = ?", params[:user_id])
    end

    if @reservations.length == 0
      @reservations = Reservation.all
    end


    @reservations = @reservations.map do |reservation|
      if current_user && reservation.student_id == current_user.id
        reservation.user_reserved = true
      else 
        reservation.user_reserved = false
      end
      reservation
    end


    @reservations = @reservations.map do |reservation|
      set_reservation_details(reservation)
    end

    return @reservations
  end 

  def show
    @reservation = Reservation.find(params[:id])

    if current_user && @reservation.student_id == current_user.id
      @reservation.user_reserved = true
    else 
      @reservation.user_reserved = false
    end

    @reservation = set_reservation_details(@reservation)
    return @reservation
  end 
  
  def create
    @reservation = Reservation.new(reservation_params)
    @reservation = set_reservation_details(@reservation)
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

  def set_reservation_details(reservation)
    
    reservation.start_time = reservation.lesson_date.start_time
    reservation.end_time = reservation.lesson_date.end_time

    if reservation.lesson_date.end_time.past? 
      reservation.status = 'past'
    elsif reservation.lesson_date.end_time.future? 
      reservation.status = 'upcoming'
    end  
    
    reservation.location_id = reservation.lesson_date.lesson.location_id

    # new below:
    reservation.lesson_id = reservation.lesson_date.lesson_id
    reservation.lesson_title = reservation.lesson_date.lesson.title
    reservation.lesson_type = reservation.lesson_date.lesson.lesson_type
    reservation.lesson_description = reservation.lesson_date.lesson.description
    reservation.location_name = reservation.lesson_date.lesson.location.location_name
    reservation.location_description = reservation.lesson_date.lesson.location.description
    reservation.lesson_image_url = reservation.lesson_date.lesson.photo.url
    reservation.location_image_url = reservation.lesson_date.lesson.location.photo.url


    return reservation
  end

end
