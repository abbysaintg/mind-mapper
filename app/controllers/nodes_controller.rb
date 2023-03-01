class NodesController < ApplicationController
    before_action :set_map

    def index
        @nodes = @map.nodes
        render json: @nodes
    end

    def show
        @node = @map.nodes.find(params[:id])
        render json: @node
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
        params.require(:node).permit(:name, :x, :y)
    end
end
