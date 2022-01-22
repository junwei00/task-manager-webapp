class UsersController < ApplicationController
  def index
    users = User.all
    render :json => users.to_json()
  end

  def create
    users = User.create(user_params)
    render json: users
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
