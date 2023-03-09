class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    before_action :authorize

    private

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def authorize
        @current_user = User.find_by(id: session[:user_id])

        # if the current user can't be found, render unauthorized message
        if @current_user.nil?
            render json: { errors: ["Not authorized, please log in"] }, status: :unauthorized
        # if the user_id parameter is present in the request and is not equal to the current/logged-in user's id, then return unauthorized error message
        elsif params[:user_id].present? && params[:user_id].to_i != @current_user.id
            render json: { errors: ["Not authorized to access this resource"] }, status: :unauthorized
        end
    end

    def record_not_found(exception)
        render json: { error: "#{exception.model} not found" }, status: :not_found
    end

    def record_invalid(exception)
        render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
