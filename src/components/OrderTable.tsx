import React, { useState } from "react";
import "./OrderTable.css";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAvatar: string;
  orderDate: string;
  status: "Pending" | "Completed" | "Refunded";
  totalAmount: number;
  paymentStatus: "Unpaid" | "Paid";
}

const OrderTable: React.FC = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Dummy data matching the design
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "#ORD008",
      customerName: "Esther Kahn",
      customerAvatar: "👩‍💼",
      orderDate: "17 Dec 2024",
      status: "Pending",
      totalAmount: 30.5,
      paymentStatus: "Unpaid",
    },
    {
      id: "2",
      orderNumber: "#ORD007",
      customerName: "Denise Kuhn",
      customerAvatar: "👩‍🦰",
      orderDate: "16 Dec 2024",
      status: "Pending",
      totalAmount: 300.5,
      paymentStatus: "Unpaid",
    },
    {
      id: "3",
      orderNumber: "#ORD006",
      customerName: "Clint Hoppe",
      customerAvatar: "👨‍💻",
      orderDate: "16 Dec 2024",
      status: "Completed",
      totalAmount: 60.5,
      paymentStatus: "Paid",
    },
    {
      id: "4",
      orderNumber: "#ORD005",
      customerName: "Darin Decker",
      customerAvatar: "👨‍🔧",
      orderDate: "16 Dec 2024",
      status: "Refunded",
      totalAmount: 640.5,
      paymentStatus: "Paid",
    },
    {
      id: "5",
      orderNumber: "#ORD004",
      customerName: "Jacquelyn Robert",
      customerAvatar: "👩‍🎨",
      orderDate: "15 Dec 2024",
      status: "Completed",
      totalAmount: 39.5,
      paymentStatus: "Paid",
    },
    {
      id: "6",
      orderNumber: "#ORD003",
      customerName: "Clint Hoppe",
      customerAvatar: "👨‍💻",
      orderDate: "15 Dec 2024",
      status: "Completed",
      totalAmount: 29.5,
      paymentStatus: "Paid",
    },
    {
      id: "7",
      orderNumber: "#ORD002",
      customerName: "Erin Bliss",
      customerAvatar: "👩‍🏫",
      orderDate: "15 Dec 2024",
      status: "Completed",
      totalAmount: 902.35,
      paymentStatus: "Paid",
    },
    {
      id: "8",
      orderNumber: "#ORD001",
      customerName: "Gretchen Quitz",
      customerAvatar: "👩‍⚕️",
      orderDate: "14 Dec 2024",
      status: "Refunded",
      totalAmount: 223.5,
      paymentStatus: "Paid",
    },
    {
      id: "9",
      orderNumber: "#ORD000",
      customerName: "Stewart Kutss",
      customerAvatar: "👨‍🎓",
      orderDate: "14 Dec 2024",
      status: "Completed",
      totalAmount: 29.5,
      paymentStatus: "Paid",
    },
  ];

  const filterOptions = ["All", "Incomplete", "Overdue", "Ongoing", "Finished"];

  const filteredOrders = orders.filter((order) => {
    if (currentFilter === "All") return true;
    if (currentFilter === "Incomplete") return order.status === "Pending";
    if (currentFilter === "Overdue") return order.paymentStatus === "Unpaid";
    if (currentFilter === "Ongoing") return order.status === "Pending";
    if (currentFilter === "Finished") return order.status === "Completed";
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map((order) => order.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#ff9800";
      case "Completed":
        return "#4caf50";
      case "Refunded":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="order-table-container">
      {/* Filter Tabs */}
      <div className="filter-tabs">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`filter-tab ${currentFilter === filter ? "active" : ""}`}
            onClick={() => setCurrentFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedOrders.length > 0 && (
        <div className="action-buttons">
          <span className="selected-count">
            {selectedOrders.length} Selected
          </span>
          <button className="action-btn duplicate-btn">📄 Duplicate</button>
          <button className="action-btn print-btn">🖨️ Print</button>
          <button className="action-btn delete-btn">🗑️ Delete</button>
          <button className="close-btn" onClick={() => setSelectedOrders([])}>
            ✕
          </button>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={
                    selectedOrders.length === currentOrders.length &&
                    currentOrders.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Order Number ↕</th>
              <th>Customer Name ↕</th>
              <th>Order Date ↕</th>
              <th>Status ↕</th>
              <th>Total Amount ↕</th>
              <th>Payment Status ↕</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className={selectedOrders.includes(order.id) ? "selected" : ""}
              >
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </td>
                <td className="order-number">{order.orderNumber}</td>
                <td className="customer-info">
                  <div className="customer-cell">
                    <span className="avatar">{order.customerAvatar}</span>
                    <span className="name">{order.customerName}</span>
                  </div>
                </td>
                <td>{order.orderDate}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="amount">{formatCurrency(order.totalAmount)}</td>
                <td>
                  <span
                    className={`payment-status ${order.paymentStatus.toLowerCase()}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="action-menu">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
          {filteredOrders.length} entries
        </div>
        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {totalPages > 3 && <span className="page-dots">...</span>}
          <button
            className="page-btn"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;

