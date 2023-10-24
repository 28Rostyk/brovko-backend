const crypto = require("crypto");

const { merchantSecretKey } = process.env;

function generateMerchantSignature(data) {
  const fields = [
    data.merchantAccount,
    data.merchantDomainName,
    data.orderReference,
    data.orderDate,
    data.amount,
    data.currency,
    ...data.productName,
    ...data.productCount,
    ...data.productPrice,
  ];

  const dataString = fields.join(";");
  const hmac = crypto.createHmac("md5", merchantSecretKey);
  hmac.update(dataString, "utf-8");

  return hmac.digest("hex");
}

const generateSignature = (req, res) => {
  const paymentData = req.body;

  try {
    const merchantSignature = generateMerchantSignature(paymentData);
    console.log(merchantSignature);
    res.json({ success: true, signature: merchantSignature });
  } catch (error) {
    console.error("Помилка генерації підпису:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { generateSignature };
