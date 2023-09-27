module ApplicationHelper
    def is_active_controller(*controllers)
        controllers.include?(controller_name) ? 'active' : ''
      end
    
      def is_active_action(*actions)
        actions.include?(action_name) ? 'active' : ''
      end
end
