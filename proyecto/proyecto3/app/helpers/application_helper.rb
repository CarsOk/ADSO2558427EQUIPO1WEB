module ApplicationHelper
    def is_active_controller(*controllers)
        controllers.include?(controller_name) ? 'active' : ''
      end
    
      def is_active_action(*actions)
        actions.include?(action_name) ? 'active' : ''
      end

      def percentage(value, total)
        return 0 if total.nil? || total.zero?
        (value / total.to_f * 100).to_i
      end

      def current_order
        if !session[:order_id].nil?
          Order.find(session[:order_id])
        else
          Order.new
        end
      end
end
