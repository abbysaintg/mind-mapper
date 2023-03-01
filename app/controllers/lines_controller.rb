class LinesController < ApplicationController
    before_action :set_map

    def index
        @lines = @map.lines
        render json: @lines
    end

    def show
        @line = @map.lines.find(params[:id])
        render json: @line
    end

    def create
        @line = @map.lines.build(line_params)
        if @line.save
        render json: @line, status: :created
        else
        render json: @line.errors, status: :unprocessable_entity
        end
    end

    private

    def set_map
        @map = Map.find(params[:map_id])
    end

    def line_params
        params.require(:line).permit(:node_id_1, :node_id_2)
    end
end
