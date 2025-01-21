import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Resturant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      menuItemId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "deliverd"],
  },
  createdAt: { type: Date, default: Date.now },
});

// orderSchema.post("find", async (docs) => {
//   const dateNow = new Date().toLocaleString("en-US", {
//     timeZone: "Africa/Cairo",
//   });
//   const dateNowObj = new Date(dateNow);
//   for (const doc of docs) {
//     if (doc.status !== "place") {
//       const created = new Date(doc.createdAt);
//       created.setHours(created.getHours() - 2);
//       const estimatedDeliveryTime = doc.restaurant.estimatedDeliveryTime;
//       const difference = dateNowObj.getTime() - created.getTime();
//       const differenceInMinutes = Math.floor(difference / (1000 * 60));
//       const thirtyThreePercent = (estimatedDeliveryTime * 33) / 100;
//       const sixtySixPercent = (estimatedDeliveryTime * 66) / 100;
//       if (differenceInMinutes >= estimatedDeliveryTime) {
//         doc.status = "deliverd";
//       } else if (differenceInMinutes < thirtyThreePercent) {
//         doc.status = "paid";
//       } else if (
//         differenceInMinutes >= thirtyThreePercent &&
//         differenceInMinutes < sixtySixPercent
//       ) {
//         doc.status = "inProgress";
//       } else if (differenceInMinutes >= sixtySixPercent) {
//         doc.status = "outForDelivery";
//       }
//       await doc.save();
//     }
//   }
// });
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
