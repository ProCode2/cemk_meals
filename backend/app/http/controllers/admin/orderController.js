const { prisma } = require("../../../models/db");
const moment = require("moment");

const orderController = () => {
  return {
    async getOrder(req, res) {
      const orders = await prisma.order.findMany({
        where: {
          status: {
            not: "completed"
          }
        },
        include: {
          user: true
        }
      });
      res.render("admin/orders", { orders, moment })
    }
  }
}

module.exports = orderController;
