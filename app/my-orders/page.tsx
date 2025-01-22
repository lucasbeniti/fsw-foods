import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
    where: {
      userId: session.user.id,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">Meus pedidos</h2>

        <div className="space-y-3 py-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
