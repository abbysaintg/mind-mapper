class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        user = User.find_by(email: params[:session][:email])
        if user && user.authenticate(params[:session][:password])
            session[:user_id] = user.id
            render json: {
            status: :created,
            user: user
            }
        else
            render json: { status: 401 } 
        end
    end

    def destroy
        session[:user_id] = nil
        render json: { status: 200, logged_out: true }
    end

    def is_logged_in?
        if current_user
            render json: { logged_in: true, user: current_user }
        else
            render json: { logged_in: false }
        end
    end
end
