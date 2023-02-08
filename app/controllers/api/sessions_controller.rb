class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      @user = set_user_details(@user)
      render 'api/users/show'
    else  
      render json: { user: nil }
    end 
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user 
      login!(@user)
      @user = set_user_details(@user)
      render 'api/users/show'
    else   
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end 

  end

  def destroy
    logout! if logged_in?
    render json: { message: 'success' }
  end

  private

  def set_user_details(user)
    all_reservation_datetimes = []
    user.reservations.each do |reservation|
      all_reservation_datetimes << [reservation.lesson_date.start_time, reservation.lesson_date.end_time]
    end
    user.reservation_datetimes = all_reservation_datetimes
    p '---------------------------RESERVATIONS BELOW!!!!!! -------------------------------------'
    p user.reservation_datetimes
    p all_reservation_datetimes
    p '---------------------------RESERVATIONS ABOVE!!!!!! -------------------------------------'
    # debugger 
    return user
  end
end
