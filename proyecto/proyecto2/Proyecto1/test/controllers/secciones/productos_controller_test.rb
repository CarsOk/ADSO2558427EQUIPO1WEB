require 'test_helper'

class Secciones::ProductosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get secciones_productos_index_url
    assert_response :success
  end

  test "should get show" do
    get secciones_productos_show_url
    assert_response :success
  end

  test "should get create" do
    get secciones_productos_create_url
    assert_response :success
  end

end
