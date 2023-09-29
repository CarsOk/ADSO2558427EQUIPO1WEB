module ApplicationHelper
    def is_active_controller(*controllers)
        controllers.include?(controller_name) ? 'active' : ''
      end
    
      def is_active_action(*actions)
        actions.include?(action_name) ? 'active' : ''
      end


      def current_order
        if !session[:order_id].nil?
          Order.find(session[:order_id])
        else
          Order.new
        end
      end
end
