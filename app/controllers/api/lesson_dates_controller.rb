class Api::LessonDatesController < ApplicationController
  def index 
    @lesson_dates = LessonDate.all

    @lesson_dates = @lesson_dates.map do |lesson_date|
      set_lesson_date_details(lesson_date)
    end
  end 

  def show 
    @lesson_date = LessonDate.find(params[:id])

    @lesson_date = set_lesson_date_details(@lesson_date)

  end 

  def create
    @lesson_date = LessonDate.new(lesson_date_params)

    if @lesson_date.save
      render :show
    else
      render json: @lesson_date.errors.full_messages, status: 422
    end
  end

  def update
    if @lesson_date.update(lesson_date_params)
      render :show
    else
      render json: @lesson_date.errors.full_messages, status: 422
    end
  end

  def destroy
    @lesson_date.destroy
  end

  private
  def lesson_date_params
    params.require(:lesson_date).permit(:lesson_id, :start_time, :end_time)
  end

  def set_lesson_date_details(lesson_date)
    lesson_date.max_capacity = lesson_date.lesson.max_capacity
    lesson_date.reserved_slots = lesson_date.reservations.length
    lesson_date.remaining_slots = lesson_date.max_capacity - lesson_date.reserved_slots
    lesson_date.reservation_ids = lesson_date.reservations.map do |reservation|
      reservation.id
    end
    if current_user 
      lesson_date.reservations.each do |reservation|
        if reservation.student_id == current_user.id
          lesson_date.user_has_reservation = true
          lesson_date.current_user_reservation_id = reservation.id
        end
      end
    end
    lesson_date.location_id = lesson_date.lesson.location_id

    return lesson_date
  end
end
