class Api::LessonsController < ApplicationController
  before_action :set_lesson, only: [:show, :update, :destroy]

  
  def index
    @lessons = Lesson.all

  end 

  def show
    @lesson = Lesson.find(params[:id])

    
  end

  def create
    @lesson = Lesson.new(post_params)

    if @lesson.save
      render :show
    else
      render json: @lesson.errors.full_messages, status: 422
    end
  end

  def update
    if @lesson.update(post_params)
      render :show
    else
      render json: @lesson.errors.full_messages, status: 422
    end
  end

  def destroy
    @lesson.destroy
    head :no_content # return header only
  end


  private
  def set_lesson
    @lesson = Lesson.find(params[:id])
  rescue
    render json: ['Lesson not found'], status: :not_found
  end


  def lesson_params
    params.require(:lesson).permit(:title, :lesson_type, :description, :max_capacity, :location_id)
  end
end
