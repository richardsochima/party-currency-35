import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import TransactionTable from "../components/TransactionTable";
import { getEvents } from "../services/eventService";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  // Calculate total stats
  const totalAmount = events.reduce((sum, event) => sum + (event.amount || 0), 0);
  const totalEvents = events.length;

  // Mock transactions data (replace with real API call when available)
  const transactions = events.map(event => ({
    id: event.id,
    amount: event.amount || 0,
    date: event.event_date,
    status: event.status || "pending",
    invoiceUrl: `/api/invoices/${event.id}` // Replace with real invoice URL
  }));

  // Filter transactions based on search
  const filteredTransactions = transactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <DashboardSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="md:pl-64">
        <DashboardHeader toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        <main className="p-6">
          <div className="gap-6 text-left grid grid-cols-1 md:grid-cols-2 mb-8">
            <StatsCard
              label="Total Transaction Amount"
              value={`₦${totalAmount.toLocaleString()}`}
              status="Host"
            />
            <StatsCard 
              label="Total Events Hosted" 
              value={totalEvents.toString()} 
            />
          </div>

          <section>
            <h2 className="mb-6 font-semibold text-xl">Transaction History</h2>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <TransactionTable
                transactions={filteredTransactions}
                onSearch={setSearchTerm}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}