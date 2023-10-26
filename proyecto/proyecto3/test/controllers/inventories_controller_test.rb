require "test_helper"

class InventoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get inventories_index_url
    assert_response :success
  end

  test "should get edit" do
    get inventories_edit_url
    assert_response :success
  end

  test "should get new" do
    get inventories_new_url
    assert_response :success
  end
end
