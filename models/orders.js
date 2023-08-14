const { Schema, model } = require("mongoose");

const { handleSchemaErrors } = require("../midlewares");

const orderSchema = new Schema({
  info: {
    webhookType: String,
    webhookEvent: String,
    account: String,
  },
  data: {
    id: Number,
    formId: Number,
    version: Number,
    ord_delivery_data: Schema.Types.Mixed,
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
        company: Schema.Types.Mixed,
        comment: String,
        userId: Schema.Types.Mixed,
        leadsCount: Number,
        leadsSalesCount: Number,
        leadsSalesAmount: Number,
        telegram: Schema.Types.Mixed,
      },
    ],
    products: [Schema.Types.Mixed],
    comment: String,
    payment_method: Number,
    shipping_method: Number,
    shipping_address: String,
    ord_delivery: String,
    timeEntryOrder: Schema.Types.Mixed,
    holderTime: Schema.Types.Mixed,
    ord_rozetka_delivery: Schema.Types.Mixed,
    orderTime: String,
    typeId: Number,
    statusId: Number,
    paymentDate: Schema.Types.Mixed,
    rejectionReason: Schema.Types.Mixed,
    discountAmount: Schema.Types.Mixed,
    paymentAmount: Number,
    commissionAmount: Number,
    costPriceAmount: Number,
    shipping_costs: Schema.Types.Mixed,
    expensesAmount: Number,
    profitAmount: Number,
    payedAmount: Schema.Types.Mixed,
    restPay: Number,
    userId: Schema.Types.Mixed,
    call: Schema.Types.Mixed,
    document_ord_check: Schema.Types.Mixed,
    organizationId: Schema.Types.Mixed,
    sajt: Number,
    utmPage: String,
    utmMedium: String,
    campaignId: Schema.Types.Mixed,
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
      payment_method: {
        label: String,
        name: String,
        type: String,
        options: [
          {
            value: Number,
            text: String,
          },
        ],
      },
      shipping_method: {
        label: String,
        name: String,
        type: String,
        options: [
          {
            value: Number,
            text: String,
          },
        ],
      },
      typeId: {
        label: String,
        name: String,
        type: String,
        options: [
          {
            value: Number,
            text: String,
          },
        ],
      },
      statusId: {
        label: String,
        name: String,
        type: String,
        options: [
          {
            value: Number,
            text: String,
          },
        ],
      },
      rejectionReason: {
        label: String,
        name: String,
        type: String,
        options: [],
      },
      userId: {
        label: String,
        name: String,
        type: String,
        options: [],
      },
      sajt: {
        label: String,
        name: String,
        type: String,
        options: [
          {
            value: Number,
            text: String,
          },
        ],
      },
      contacts: {
        fields: {
          userId: {
            label: String,
            name: String,
            type: String,
            options: [],
          },
        },
      },
    },
  },
});

// {
//   customerName: {
//     type: String,
//     required: [true, "Set customer name"],
//   },
//   customerLocation: {
//     type: String,
//     required: true,
//   },
//   products: {
//     type: Array,
//   },
//   customerPhone: {
//     type: String,
//     required: true,
//   },
//   owner: {
//     type: String,
//     required: true,
//   },
//   priceAll: {
//     type: Number,
//     required: true,
//   },
// },
// { versionKey: false, timestamps: true }
orderSchema.post("save", handleSchemaErrors);

const Order = model("orders", orderSchema);

module.exports = Order;
