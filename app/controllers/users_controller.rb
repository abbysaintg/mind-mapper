class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    before_action :set_user, only: [:show, :update, :destroy]

    def index
        @users = User.all
        render json: @users
    end

    def show
        render json: @user
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

    def update
        if @user.update(user_params)
        render json: @user
        else
        render json: { error: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
    end

    def destroy
        @user.destroy
        head :no_content
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :avatar_seed, :password, :password_confirmation)
    end

    def set_user
        @user = User.find(params[:id])
    end
end
