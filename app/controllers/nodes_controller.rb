class NodesController < ApplicationController
    before_action :set_map
    before_action :set_node, only: [:show, :update, :destroy]

    def index
        @nodes = @map.nodes
        render json: @nodes
    end

    def show
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

    def update
        if @node.update(node_params)
            render json: @node
        else
            render json: @node.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @node.destroy
        head :no_content
    end

    private

    def set_map
        @map = Map.find(params[:map_id])
    end

    def set_node
        @node = @map.nodes.find(params[:id])
    end

    def node_params
        params.require(:node).permit(:label, :x, :y)
    end
end
