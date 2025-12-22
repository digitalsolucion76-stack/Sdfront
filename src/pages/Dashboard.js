import React, { useState, useEffect } from "react";

import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import { getClients } from "../api/clients";
import { getAdminOrders } from "../api/orders";

import LoadingSpinner from "../components/AccessibleNavigationAnnouncer";

function Dashboard() {
  const [totalClients, setTotalClients] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([getClients(), getAdminOrders()])
      .then(([clientsResponse, ordersResponse]) => {
        setTotalClients(clientsResponse.total);

        const total = ordersResponse.orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        setTotalRevenue(total);

        const pendingOrders = ordersResponse.orders.filter(
          (order) => order.status === "Pending"
        ).length;
        setNewOrders(pendingOrders);

        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <PageTitle>Tablero</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Clientes Totales" value={totalClients}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Ingresos Totales" value={`$ ${totalRevenue.toFixed(2)}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Nuevos Pedidos" value={newOrders}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

    
      </div>
    </>
  );
}

export default Dashboard;
