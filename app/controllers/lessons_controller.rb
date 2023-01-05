class Api::LessonsController < ApplicationController
  
  def index
    @lessons = Lesson.all
    
  end 

  def show
    @lesson = Lesson.find(params[:id])
  end


  private

  def lesson_params
    params.require(:lesson).permit(:title, :lesson_type, :description, :max_capacity, :location_id)
  end
end
