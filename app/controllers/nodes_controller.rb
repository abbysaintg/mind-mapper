class NodesController < ApplicationController
    before_action :set_map

    def index
        @nodes = Node.where(map_id: params[:map_id])
        render json: @nodes
    end

    def create
        @node = @map.nodes.build(node_params)

        if @node.save
          render json: @node, status: :created
        else
          render json: @node.errors, status: :unprocessable_entity
        end
    end

    private

    def set_map
        @map = Map.find(params[:map_id])
    end

    def node_params
        params.permit(:id, :label, :x, :y, :color, :parent_id, :map_id)
    end
end
