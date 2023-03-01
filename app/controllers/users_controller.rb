class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        @users = User.all
        render json: @users
    end

    def create
        @user = User.new(user_params)

        if @user.save
        session[:user_id] = @user.id
        render json: { user: @user }, status: :created
        else
        render json: { error: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
