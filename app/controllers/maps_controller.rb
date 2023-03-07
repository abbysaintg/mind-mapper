class MapsController < ApplicationController
    before_action :set_user
    before_action :set_map, only: [:show, :update, :destroy]

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
        @map.nodes.build(label: 'Root Node', color: 'green', x: 800, y: 350)

        if @map.save
          render json: @map, status: :created
        else
          render json: @map.errors, status: :unprocessable_entity
        end
    end


    def update
        if @map.update(map_params)
          render json: @map
        else
          render json: @map.errors, status: :unprocessable_entity
        end
      end

    def destroy
        @map.destroy
        head :no_content
    end

    private

    def set_user
        @user = User.find(params[:user_id])
    end

    def set_map
        @map = @user.maps.find(params[:id])
    end

    def map_params
        params.require(:map).permit(:title)
    end
end
