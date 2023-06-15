require 'test_helper'

class SeccionesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get secciones_index_url
    assert_response :success
  end

end
