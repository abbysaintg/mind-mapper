class MapsController < ApplicationController
    before_action :set_user

    def index
        @maps = @user.maps
        render json: @maps
    end

    def show
        @map = @user.maps.find(params[:id])
        render json: @map
    end

    def create
        @map = @user.maps.build(map_params)
        if @map.save
        render json: @map, status: :created
        else
        render json: @map.errors, status: :unprocessable_entity
        end
    end

    private

    def set_user
        @user = User.find(params[:user_id])
    end

    def map_params
        params.require(:map).permit(:title)
    end
end
