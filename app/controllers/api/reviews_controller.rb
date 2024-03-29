class Api::ReviewsController < ApplicationController
  # include ActionView::Helpers::DateHelper
  extend ActionView::Helpers::DateHelper
  
  def index
    helpers.time_ago_in_words(Time.now)
    if params[:location_id]
      @reviews = Review.where("location_id = ?", params[:location_id].to_i).order(created_at: :desc).order(updated_at: :desc)      
    end

    if params[:user_id]
      @reviews = Review.where("reviewer_id = ?", params[:user_id].to_i).order(created_at: :desc).order(updated_at: :desc)  
    end

    # if @reviews.length == 0
    #   @reviews = Review.all
    # end
    
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
      @review = set_review_details(@review)
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      @review = set_review_details(@review)
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    head :no_content
  end 

  private
  def review_params
    params.require(:review).permit(:lesson_id, :reviewer_id, :rating, :body, :location_id)
  end

  def set_review_details(review)
    review.lesson_title = review.lesson.title

    if review.created_at == nil 
      review.minutes_ago = 1
      return review
    end

    now = Time.zone.now
    date_to_check = review.created_at
    if review.updated_at != nil
      date_to_check = review.updated_at
    end

    if current_user 
      current_user.set_user_details
      if current_user.id == review.reviewer_id
        review.current_user_reviewed = true
      else 
        review.current_user_reviewed = false
      end 
    end
    
    if now.year - date_to_check.year > 0
      review.years_ago = now.year - date_to_check.year
    elsif now.month - date_to_check.month > 0
      review.months_ago = now.month - date_to_check.month
    elsif now.day - date_to_check.day > 0
      review.days_ago = now.day - date_to_check.day 
    elsif now.hour - date_to_check.hour > 0
      review.hours_ago = now.hour - date_to_check.hour 
    else
      review.minutes_ago = now.min - date_to_check.min   
    end

    review.reviewer_username = review.reviewer.username



    return review
  end

end
