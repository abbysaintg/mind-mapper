class MapsController < ApplicationController
    before_action :set_map, only: [:show, :nodes, :node, :create_node, :update_node, :destroy_node, :edges, :edge, :create_edge, :update_edge, :destroy_edge, :update, :destroy]

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

    def node
        node = @map.nodes.find(params[:node_id])
        render json: node.to_json
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Node not found" }, status: :not_found
    end

    def create_node
        node = @map.nodes.build(node_params)

        if node.save
            render json: node, status: :created
        else
            render json: { errors: node.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update_node
        node = @map.nodes.find(params[:node_id])

        if node.update(node_params)
            render json: node
        else
            render json: { errors: node.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy_node
        node = @map.nodes.find(params[:node_id])
        node.destroy

         head :no_content
    end

    def edges
        edges = @map.edges
        render json: [edges].to_json
      end

    def edge
        edge = @map.edges.find(params[:edge_id])
        render json: edge, serializer: EdgeSerializer
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Edge not found" }, status: :not_found
    end

    def create_edge
        edge = @map.edges.build(edge_params)

        if edge.save
            render json: edge, status: :created
        else
            render json: { errors: edge.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update_edge
        edge = @map.edges.find(params[:edge_id])

        if edge.update(edge_params)
            render json: edge
        else
            render json: { errors: edge.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy_edge
        edge = @map.edges.find(params[:edge_id])
        edge.destroy

        head :no_content
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

    def node_params
        params.permit(:label, :x, :y, :color, :parent_id, :map_id)
    end

    def edge_params
        params.permit(:source, :target, :map_id)
    end
end
