
import React, { useState, useEffect } from "react";
import { MerchantSidebar } from "@/components/merchant/MerchantSidebar";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import TransactionTable from "@/components/TransactionTable";
import { useAuthenticated } from "@/lib/hooks";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { CircleDollarSign } from "lucide-react";

export default function TransactionHistory() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const authenticated = useAuthenticated();

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockTransactions = [
      {
        id: "TX_123456",
        amount: 5000,
        date: new Date().toISOString(),
        status: "successful",
        invoiceUrl: "#"
      },
      {
        id: "TX_789012",
        amount: 3500,
        date: new Date(Date.now() - 86400000).toISOString(), // yesterday
        status: "pending",
        invoiceUrl: "#"
      },
      {
        id: "TX_345678",
        amount: 2000,
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        status: "cancelled",
        invoiceUrl: "#"
      }
    ];
    
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTransactions(transactions);
      return;
    }
    
    const filtered = transactions.filter(transaction => 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      new Date(transaction.date).toLocaleDateString().includes(searchTerm) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredTransactions(filtered);
  };

  if (!authenticated) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MerchantSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="md:pl-64 flex flex-col min-h-screen">
        <MerchantHeader 
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
            </div>
            
            {filteredTransactions.length > 0 ? (
              <TransactionTable 
                transactions={filteredTransactions} 
                onSearch={handleSearch} 
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <CircleDollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No transactions yet</h3>
                <p className="text-gray-500">
                  Your transaction history will appear here once you start processing payments.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
