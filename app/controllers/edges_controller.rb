class EdgesController < ApplicationController
    before_action :set_map

    def index
        @edges = Edge.where(map_id: params[:map_id])
        render json: @edges
    end

    def create
        @edge = @map.edges.build(edge_params)

        if @edge.save
          render json: @edge, status: :created
        else
          render json: @edge.errors, status: :unprocessable_entity
        end
    end

    private

    def set_map
        @map = Map.find(params[:map_id])
    end

    def edge_params
        params.permit(:id, :source, :target, :map_id)
    end
end
