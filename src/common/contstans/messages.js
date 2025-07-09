const MESSAGES = {
  GENERAL: {
    SUCCESS: "Thành công",
    SERVER_ERROR: "Lỗi server, vui lòng thử lại sau",
    NOT_FOUND: "Không tìm thấy tài nguyên",
    BAD_REQUEST: "Yêu cầu không hợp lệ",
    UNAUTHORIZED: "Không được phép truy cập",
    FORBIDDEN: "Truy cập bị cấm",
  },
  AUTH: {
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGOUT_SUCCESS: "Đăng xuất thành công",
    REGISTER_SUCCESS: "Đăng ký thành công",
    LOGIN_FAILED: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
    UNAUTHORIZED: "Bạn cần đăng nhập để thực hiện hành động này",
    INVALID_TOKEN: "Token không hợp lệ hoặc đã hết hạn",
    EMAIL_NOT_VERIFIED: "Email chưa được xác minh",
    EMAIL_VERIFIED: "Email đã được xác minh",
    PASSWORD_RESET_SUCCESS: "Đặt lại mật khẩu thành công",
    PASSWORD_RESET_FAILED: "Đặt lại mật khẩu thất bại, vui lòng thử lại",
    PASSWORD_CHANGE_SUCCESS: "Đổi mật khẩu thành công",
    PASSWORD_CHANGE_FAILED: "Đổi mật khẩu thất bại, vui lòng thử lại",
    EMAIL_ALREADY_EXISTS: "Email đã được sử dụng",
    USERNAME_ALREADY_EXISTS: "Tên người dùng đã được sử dụng",
    INVALID_EMAIL: "Email không hợp lệ",
    INVALID_PASSWORD: "Mật khẩu không hợp lệ",
    AUTH_ACCOUNT_INACTIVE:
      "Tài khoản của bạn chưa được kích hoạt hoặc đã bị vô hiệu hóa",
  },
  USER: {
    GET_SUCCESS: "Lấy danh sách người dùng thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin người dùng thành công",
    CREATE_SUCCESS: "Tạo người dùng thành công",
    UPDATE_SUCCESS: "Cập nhật người dùng thành công",
    DELETE_SUCCESS: "Xóa người dùng thành công",
    NOT_FOUND: "Không tìm thấy người dùng",
    NAME_REQUIRED: "Tên người dùng là bắt buộc",
    EMAIL_REQUIRED: "Email là bắt buộc",
    EMAIL_EXISTS: "Email đã tồn tại",
    INVALID_CREDENTIALS: "Thông tin đăng nhập không hợp lệ",
  },
  PRODUCT: {
    // SUCCESS
    LIST_SUCCESS: "Lấy danh sách sản phẩm thành công",
    DETAIL_SUCCESS: "Lấy chi tiết sản phẩm thành công",
    CREATE_SUCCESS: "Tạo sản phẩm thành công",
    UPDATE_SUCCESS: "Cập nhật sản phẩm thành công",
    DELETE_SUCCESS: "Xoá mềm sản phẩm thành công",
    HARD_DELETE_SUCCESS: "Xoá cứng sản phẩm khỏi hệ thống",
    RESTORE_SUCCESS: "Khôi phục sản phẩm thành công",

    // ERROR / NOT FOUND
    NOT_FOUND: "Không tìm thấy sản phẩm",
    LIST_ERROR: "Lỗi khi lấy danh sách sản phẩm",
    CREATE_ERROR: "Lỗi khi tạo sản phẩm",
    UPDATE_NOT_FOUND: "Không tìm thấy sản phẩm để cập nhật",
    DELETE_NOT_FOUND: "Không tìm thấy sản phẩm để xoá",
    RESTORE_FAILED: "Sản phẩm không thể khôi phục",
  },

  CATEGORY: {
    GET_SUCCESS: "Lấy danh sách danh mục thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin danh mục thành công",
    CREATE_SUCCESS: "Tạo danh mục thành công",
    SOFT_DELETE_SUCCESS: "Xóa mềm danh mục thành công",
    RESTORE_SUCCESS: "Khôi phục danh mục thành công",
    SOFT_DELETE_FAILED: "Xóa mềm danh mục thất bại",
    RESTORE_FAILED: "Khôi phục danh mục thất bại",
    CREATE_ERROR: "Lỗi khi tạo danh mục",
    CREATE_ERROR_EXISTS: "Danh mục đã tồn tại",
    UPDATE_SUCCESS: "Cập nhật danh mục thành công",
    DELETE_SUCCESS: "Xóa danh mục thành công",
    NOT_FOUND: "Không tìm thấy danh mục",
    NAME_REQUIRED: "Tên danh mục là bắt buộc",
    HAS_SUBCATEGORIES: "Danh mục này có danh mục con, không thể xóa",
  },

  SUBCATEGORY: {
    GET_SUCCESS: "Lấy danh sách danh mục con thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin danh mục con thành công",
    CREATE_SUCCESS: "Tạo danh mục con thành công",
    UPDATE_SUCCESS: "Cập nhật danh mục con thành công",
    DELETE_SUCCESS: "Xóa danh mục con thành công",
    CREATE_ERROR: "Lỗi khi tạo danh mục con",
    UPDATE_ERROR: "Lỗi khi cập nhật danh mục con",
    DELETE_ERROR: "Lỗi khi xóa danh mục con",
    CREATE_ERROR_EXISTS: "Danh mục con đã tồn tại",
    NOT_FOUND: "Không tìm thấy danh mục con",
    NAME_REQUIRED: "Tên danh mục con là bắt buộc",
  },

  ATTRIBUTE: {
    GET_SUCCESS: "Lấy danh sách thuộc tính thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin thuộc tính thành công",
    CREATE_SUCCESS: "Tạo thuộc tính thành công",
    UPDATE_SUCCESS: "Cập nhật thuộc tính thành công",
    DELETE_SUCCESS: "Xóa thuộc tính thành công",
    CREATE_ERROR: "Lỗi khi tạo thuộc tính",
    UPDATE_ERROR: "Lỗi khi cập nhật thuộc tính",
    DELETE_ERROR: "Lỗi khi xóa thuộc tính",
    CREATE_ERROR_EXISTS: "Thuộc tính đã tồn tại",
    NOT_FOUND: "Không tìm thấy thuộc tính",
    NAME_REQUIRED: "Tên thuộc tính là bắt buộc",
    VALUE_REQUIRED: "Giá trị thuộc tính là bắt buộc",
  },

  ORDER: {
    GET_SUCCESS: "Lấy danh sách đơn hàng thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin đơn hàng thành công",
    CREATE_SUCCESS: "Tạo đơn hàng thành công",
    UPDATE_SUCCESS: "Cập nhật đơn hàng thành công",
    DELETE_SUCCESS: "Xóa đơn hàng thành công",
    CREATE_ERROR: "Lỗi khi tạo đơn hàng",
    UPDATE_ERROR: "Lỗi khi cập nhật đơn hàng",
    DELETE_ERROR: "Lỗi khi xóa đơn hàng",
    CREATE_ERROR_EXISTS: "Đơn hàng đã tồn tại",
    NOT_FOUND: "Không tìm thấy đơn hàng",
    INVALID_STATUS: "Trạng thái đơn hàng không hợp lệ",
  },

  EMAIL: {
    SEND_SUCCESS: "Gửi email thành công",
    SEND_FAILED: "Gửi email thất bại, vui lòng thử lại sau",
    VERIFICATION_SUBJECT: "Xác minh tài khoản của bạn",
    RESET_PASSWORD_SUBJECT: "Đặt lại mật khẩu cho tài khoản của bạn",
    VERIFICATION_BODY:
      "Vui lòng nhấp vào liên kết sau để xác minh tài khoản của bạn: ",
    RESET_PASSWORD_BODY:
      "Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link dưới đây để tiếp tục: ",
  },

  VARIANT: {
    CREATE_SUCCESS: "Tạo biến thể thành công",
    CREATE_FAILED: "Tạo biến thể thất bại",
    UPDATE_SUCCESS: "Cập nhật biến thể thành công",
    DELETE_SUCCESS: "Xoá biến thể thành công",
    NOT_FOUND: "Không tìm thấy biến thể",
  },

  // ADDRESS
  ADDRESS: {
    CREATE_SUCCESS: "Tạo địa chỉ thành công",
    GET_SUCCESS: "Lấy địa chỉ thành công",
    UPDATE_SUCCESS: "Cập nhật địa chỉ thành công",
    DELETE_SUCCESS: "Xoá địa chỉ thành công",
    NOT_FOUND: "Không tìm thấy địa chỉ",
  },
  // BLOG
  BLOG: {
    LIST_SUCCESS: "Lấy danh sách blog thành công",
    LIST_ERROR: "Lỗi khi lấy danh sách blog",
    NOT_FOUND: "Không tìm thấy bài viết blog",
    CREATE_SUCCESS: "Tạo blog thành công",
    CREATE_FAILED: "Tạo blog thất bại",
    UPDATE_SUCCESS: "Cập nhật blog thành công",
    UPDATE_FAILED: "Cập nhật blog thất bại",
    DELETE_SUCCESS: "Xoá blog thành công",
    DELETE_FAILED: "Xoá blog thất bại",
  },

  // NEWS
  NEWS: {
    LIST_SUCCESS: "Lấy danh sách tin tức thành công",
    LIST_ERROR: "Lỗi khi lấy danh sách tin tức",
    NOT_FOUND: "Không tìm thấy tin tức",
    CREATE_SUCCESS: "Tạo tin tức thành công",
    CREATE_FAILED: "Tạo tin tức thất bại",
    UPDATE_SUCCESS: "Cập nhật tin tức thành công",
    UPDATE_FAILED: "Cập nhật tin tức thất bại",
    DELETE_SUCCESS: "Xoá tin tức thành công",
    DELETE_FAILED: "Xoá tin tức thất bại",
  },

  // SYSTEM
  SYSTEM: {
    SERVER_ERROR: "Lỗi server, vui lòng thử lại sau",
    VALIDATION_ERROR: "Dữ liệu không hợp lệ",
  },
};

export default MESSAGES;
