class LinesController < ApplicationController
    before_action :set_map
    before_action :set_line, only: [:show, :update, :destroy]

    def index
        @lines = @map.lines
        render json: @lines
    end

    def show
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

    def update
        if @line.update(line_params)
        render json: @line
        else
        render json: @line.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @line.destroy
        head :no_content
    end

    private

    def set_map
        @map = Map.find(params[:map_id])
    end

    def set_line
        @line = @map.lines.find(params[:id])
    end

    def line_params
        params.require(:line).permit(:parent_id, :child_id)
    end
end
