const { Schema, model, SchemaTypes } = require("mongoose");

const { handleSchemaErrors } = require("../midlewares");

const optionSchema = new Schema({
  value: Number,
  text: String,
});

const fieldSchema = new Schema({
  label: String,
  name: String,
  type: String,
  options: [optionSchema],
});

const orderSchema = new Schema(
  {
    info: {
      webhookType: String,
      webhookEvent: String,
      account: String,
    },
    data: {
      id: Number,
      formId: Number,
      version: Number,
      ord_delivery_data: SchemaTypes.Mixed,
      contacts: [
        {
          id: Number,
          formId: Number,
          version: Number,
          active: Number,
          createTime: String,
          lName: String,
          fName: String,
          mName: String,
          phone: [String],
          email: [String],
          company: SchemaTypes.Mixed,
          comment: String,
          userId: SchemaTypes.Mixed,
          leadsCount: Number,
          leadsSalesCount: Number,
          leadsSalesAmount: Number,
          telegram: SchemaTypes.Mixed,
        },
      ],
      products: [SchemaTypes.Mixed],
      comment: String,
      payment_method: Number,
      shipping_method: Number,
      shipping_address: String,
      ord_delivery: String,
      timeEntryOrder: SchemaTypes.Mixed,
      holderTime: SchemaTypes.Mixed,
      ord_rozetka_delivery: SchemaTypes.Mixed,
      orderTime: String,
      typeId: Number,
      statusId: Number,
      paymentDate: SchemaTypes.Mixed,
      rejectionReason: SchemaTypes.Mixed,
      discountAmount: SchemaTypes.Mixed,
      paymentAmount: Number,
      commissionAmount: Number,
      costPriceAmount: Number,
      shipping_costs: SchemaTypes.Mixed,
      expensesAmount: Number,
      profitAmount: Number,
      payedAmount: SchemaTypes.Mixed,
      restPay: Number,
      userId: SchemaTypes.Mixed,
      call: SchemaTypes.Mixed,
      document_ord_check: SchemaTypes.Mixed,
      organizationId: SchemaTypes.Mixed,
      sajt: Number,
      utmPage: String,
      utmMedium: String,
      campaignId: SchemaTypes.Mixed,
      utmSourceFull: String,
      utmSource: String,
      utmCampaign: String,
      utmContent: String,
      utmTerm: String,
      externalId: String,
      ord_novaposhta: {
        backDeliverySum: Number,
        statusCode: Number,
        manualEN: Number,
        legal: Number,
        addressType: Number,
        liftToFloor: Number,
        floor: Number,
        elevator: Number,
      },
    },
    meta: {
      fields: {
        payment_method: fieldSchema,
        shipping_method: fieldSchema,
        typeId: fieldSchema,
        statusId: fieldSchema,
        rejectionReason: fieldSchema,
        userId: fieldSchema,
        sajt: fieldSchema,
        contacts: {
          fields: {
            userId: fieldSchema,
          },
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post("save", handleSchemaErrors);

const Order = model("orders", orderSchema);

module.exports = Order;
