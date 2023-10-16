class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    include ApplicationHelper
    include Pundit::Authorization
    def user
      @user = current_user
    end
  end
  