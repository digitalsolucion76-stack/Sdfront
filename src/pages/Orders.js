import React from 'react';
import PageTitle from '../components/Typography/PageTitle'; // Import PageTitle
import OrdersTable from '../components/OrdersTable'; // Import OrdersTable

const Orders = () => {
  return (
    <>
      <PageTitle>Administración de Órdenes</PageTitle>

      <OrdersTable />
    </>
  );
};

export default Orders;