class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all

    @reviews = @reviews.map do |review|
      set_review_details(review)
    end 
  end 

  def show
    @review = Review.find(params[:id])

    @review = set_review_details(@review)
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    if @review.update(review_params)
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review.destroy
  end 

  private
  def review_params
    params.require(:review).permit(:lesson_id, :reviewer_id, :rating, :body)
  end

  def set_review_details(review)
    review.location_id = review.lesson.location_id
    return review
  end
end
