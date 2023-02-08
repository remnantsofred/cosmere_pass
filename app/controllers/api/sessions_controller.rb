class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      @user.set_user_details
      render 'api/users/show'
    else  
      render json: { user: nil }
    end 
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user 
      login!(@user)
      @user.set_user_details
      render 'api/users/show'
    else   
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end 

  end

  def destroy
    logout! if logged_in?
    render json: { message: 'success' }
  end


end
