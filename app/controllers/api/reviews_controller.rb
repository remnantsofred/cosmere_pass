class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
  end 

  def show
    @review = Review.find(params[:id])
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
end
