class Api::LocationsController < ApplicationController
  def index
    @locations = Location.all

    @locations = @locations.map do |location|
      set_location_details(location)
    end
    
  end 

  def show
    @location = Location.find(params[:id])
    
    @location = set_location_details(@location)
    
  end

  


  private
  def location_params
    params.require(:location).permit(:location_name, :description)
  end

  def set_location_details(location)
    location.lesson_types = []
    location.lessons.each do |lesson|
      location.lesson_types.push(lesson.lesson_type)
    end
    location.lesson_types.uniq!

    location_ratings_arr = location.reviews.map do |review|
      review.rating
    end

    numerator = location_ratings_arr.sum 
    denominator = location_ratings_arr.length

    location.average_rating = (numerator * 1.00) / (denominator * 1.00)
    location.review_count = location.reviews.length


    if location.location_name == "Hallandren"
      location.world = "Nalthis" 
    elsif location.location_name == "Elendel" || location.location_name == "Luthadel" || location.location_name == "Homeland"
      location.world = "Scadrial"
    else
      location.world = "Roshar"
    end

    return location
  end

end