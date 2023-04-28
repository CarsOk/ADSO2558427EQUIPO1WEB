require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get Inicio" do
    get home_Inicio_url
    assert_response :success
  end
end
