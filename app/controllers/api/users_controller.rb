class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      @user = set_user_details(@user)
      render 'api/users/show'
    else 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def show
  end 


  private

  # def set_user_details(user)
  #   all_reservation_datetimes = []
  #   user.reservations.each do |reservation|
  #     all_reservation_datetimes << [reservation.lesson_date.start_time, reservation.lesson_date.end_time]
  #   end
  #   user.reservation_datetimes = all_reservation_datetimes
  #   p '---------------------------RESERVATIONS BELOW!!!!!! -------------------------------------'
  #   p user.reservation_datetimes
  #   p all_reservation_datetimes
  #   p '---------------------------RESERVATIONS ABOVE!!!!!! -------------------------------------'
  #   debugger 
  #   return user
  # end

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
