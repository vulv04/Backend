import Order from "./order.model.js";
import PayOS from "@payos/node";
import {
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  PAYOS_CLIENT_ID,
} from "../../common/configs/enviroments.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";

export const payOS = new PayOS(
  PAYOS_CLIENT_ID,
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY
);

// 🧾 Tạo đơn hàng & tạo link thanh toán PayOS
export const createPayosPayment = handleAsync(async (req, res) => {
  const { shippingAddress, phoneNumber, note, orderItems, totalPrice } =
    req.body;
  console.log(req.user);
  const orderCode = Number(String(Date.now()).slice(-6));

  const newOrder = await Order.create({
    userId: req.user._id,
    shippingAddress,
    phoneNumber,
    note,
    orderItems,
    totalPrice, // 👈 thêm dòng này
    orderCode,
  });

  const bodyPayos = {
    orderCode,
    amount: totalPrice,
    description: `Thanh toán #${orderCode}`,
    cancelUrl: "http://localhost:5173/cart",
    returnUrl: "http://localhost:5173/checkout-success/:orderId",
  };

  const payment = await payOS.createPaymentLink(bodyPayos);

  return res.status(200).json(
    createResponse(true, 200, "Tạo link thanh toán thành công", {
      checkoutUrl: payment.checkoutUrl,
      orderCode,
    })
  );
});

// 🧩 Webhook từ PayOS
export const handlePayOsWebhook = handleAsync(async (req, res) => {
  const body = req.body;
  const webhookData = payOS.verifyPaymentWebhookData(body);
  if (webhookData.code === "00" && webhookData.orderCode !== 123) {
    const order = await Order.findOne({
      orderCode: webhookData.orderCode,
      isPaid: false,
    });

    if (!order) {
      throw createError(400, "Đơn hàng không tồn tại hoặc đã thanh toán");
    }

    order.isPaid = true;
    order.status = "processing";
    await order.save();
  }

  return res.status(200).json({ message: "Webhook received" });
});

// ✅ Các hàm quản lý đơn hàng khác

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Không có sản phẩm nào trong đơn hàng." });
    }

    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const newCode = lastOrder ? lastOrder.orderCode + 1 : 100001;

    const newOrder = new Order({
      userId: req.user._id,
      orderCode: newCode,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: paymentMethod === "COD" ? false : true, // COD thì chưa thanh toán
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi tạo đơn hàng" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId"); // bạn có thể chọn thêm trường nếu muốn
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { reason } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Chỉ được hủy đơn hàng đang chờ xử lý" });
    }

    order.status = "cancelled";
    order.cancelReason = reason;
    await order.save();

    res.status(200).json({ success: true, message: "Đã hủy đơn hàng" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Lỗi hủy đơn hàng" });
  }
};
