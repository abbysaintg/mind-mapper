class MapsController < ApplicationController
    before_action :set_map, only: [:show, :nodes, :edges, :update, :destroy]

    def index
        @maps = Map.all
        render json: @maps
    end

    def show
        render json: @map
    end

    def nodes
        nodes = @map.nodes
        render json: nodes.to_json
    end

    def edges
        edges = @map.edges
        render json: edges.to_json
    end

    def create
        @map = Map.new(map_params)

        if @map.save
            render json: @map, status: :created
        else
            render json: { errors: @map.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @map.update(map_params)
            render json: @map
        else
            render json: { errors: @map.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @map.destroy
        head :no_content
    end

    private

    def set_map
        @map = Map.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Map not found" }, status: :not_found
    end

    def map_params
        params.permit(:title)
    end
end
