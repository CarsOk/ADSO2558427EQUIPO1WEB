class ResetOrdersCounter
    def self.execute
      Order.where("created_at >= ? AND created_at <= ?", Time.zone.now.beginning_of_day, Time.zone.now.end_of_day).update_all(order_number: nil)
      puts 'Contador de órdenes reiniciado correctamente.'
    end
end
  