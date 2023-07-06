class Api::LessonDatesController < ApplicationController
  def index 

    @lesson_dates = []
    if params[:location_id] 
      @lessons = Lesson.where("location_id = ?", params[:location_id])
      lesson_ids = @lessons.map { |lesson| lesson.id }
      @lesson_dates = LessonDate.where("lesson_id in (?)", lesson_ids)
    end

    if params[:lesson_type]
      if @lesson_dates.length == 0
        @lesson_dates = LessonDate.all
      end
      @lesson_dates = @lesson_dates.select { |lesson_date|  lesson_date.lesson.lesson_type.include?(params[:lesson_type]) } 
      
    end   

    if params[:start_time]
      if @lesson_dates.length == 0
        @lesson_dates = LessonDate.all
      end
      @lesson_dates = @lesson_dates.select { |lesson_date| lesson_date.start_time.include?(params[:start_time]) } 
      
    end   
      
    if params[:user_id]
      user_reservations = Reservation.where("student_id = ?", params[:user_id])

      user_reservations_lessondate_ids = user_reservations.map {|reservation| reservation.lesson_date_id}
       
      @lesson_dates = LessonDate.find(user_reservations_lessondate_ids)
    end
   
    if @lesson_dates.length == 0
      @lesson_dates = LessonDate.all
    end
    
    @lesson_dates = @lesson_dates.map do |lesson_date|
      set_lesson_date_details(lesson_date)
    end
    return @lesson_dates
  end 

  def show 
    @lesson_date = LessonDate.find(params[:id])

    @lesson_date = set_lesson_date_details(@lesson_date)

  end 

  def create
    @lesson_date = LessonDate.new(lesson_date_params)
    @lesson_date = set_lesson_date_details(@lesson_date)
    if @lesson_date.save
      render :show
    else
      render json: @lesson_date.errors.full_messages, status: 422
    end
  end

  def update
   #set lesson date details for update?
    if @lesson_date.update(lesson_date_params)
      @lesson_date = set_lesson_date_details(@lesson_date)
      render :show
    else
      render json: @lesson_date.errors.full_messages, status: 422
    end
  end

  def destroy
    @lesson_date = LessonDate.find(params[:id])
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
      current_user.set_user_details

      lesson_date.reservations.each do |reservation|
        if reservation.student_id == current_user.id
          lesson_date.user_has_reservation = true
          lesson_date.current_user_reservation_id = reservation.id
        end
      end

      # each reservation_datetime is an array of a start and end time
      current_user.reservation_datetimes.each do |reservation_datetime| 
        if lesson_date.start_time.between?(reservation_datetime[0], reservation_datetime[1]) || lesson_date.end_time.between?(reservation_datetime[0], reservation_datetime[1])
          lesson_date.current_user_would_be_doublebooked = true
        end
      end
      lesson_date.current_user_would_be_doublebooked = false if lesson_date.current_user_would_be_doublebooked != true

    end

    lesson_date.location_id = lesson_date.lesson.location_id
    lesson_date.lesson_type = lesson_date.lesson.lesson_type

    return lesson_date
  end
end
