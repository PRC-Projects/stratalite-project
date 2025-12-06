"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Phone,
  Search,
  MessageSquare,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useState, useMemo } from "react";

// --- 1. Define Types for Strict TypeScript ---
interface Transaction {
  id: string;
  project: string;
  client: string;
  milestone: string;
  amount: number;
  status: "Funded" | "Released" | "Pending";
  date: string;
  logo: string;
  color: string;
}

// --- 2. Mock Data with Types ---
const MOCK_DATA: Transaction[] = [
  {
    id: "TXN-8832",
    project: "Food Delivery App",
    client: "RestoCorp Inc.",
    milestone: "UI/UX Design Phase",
    amount: 18000,
    status: "Funded",
    date: "2025-10-12",
    logo: "FD",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "TXN-9941",
    project: "E-Commerce Platform",
    client: "Shopify Clone",
    milestone: "Backend Architecture",
    amount: 45000,
    status: "Released",
    date: "2025-10-05",
    logo: "EC",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "TXN-7721",
    project: "CRM System Dashboard",
    client: "SalesForce Lite",
    milestone: "API Integration",
    amount: 22500,
    status: "Pending",
    date: "2025-10-01",
    logo: "CR",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "TXN-6619",
    project: "Portfolio Website",
    client: "John Doe Design",
    milestone: "Final Deployment",
    amount: 12000,
    status: "Released",
    date: "2025-09-28",
    logo: "PW",
    color: "bg-pink-100 text-pink-600",
  },
];

export default function PaymentHistoryPage() {
  const [rows, setRows] = useState<Transaction[]>(MOCK_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // --- DERIVED STATS ---
  const totalEarned = rows
    .filter((r) => r.status === "Released")
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalPending = rows
    .filter((r) => r.status === "Pending" || r.status === "Funded")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // --- FILTER LOGIC ---
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.project.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            row.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;
      const matchesDate = !dateFilter || row.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [rows, searchQuery, statusFilter, dateFilter]);

  // --- CSV EXPORT ---
  const handleExportCSV = useCallback(() => {
    const header = ["Transaction ID", "Project", "Milestone", "Amount", "Status", "Date"];
    const csvRows = [
      header.join(","),
      ...filteredRows.map((r) =>
        [r.id, r.project, r.milestone, r.amount, r.status, r.date].join(",")
      ),
    ];

    const csvText = csvRows.join("\n");
    const blob = new Blob([csvText], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "herofreelancer_payments.csv";
    link.click();
  }, [filteredRows]);

  // --- HELPER: BADGE COLOR ---
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Funded":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 shadow-none font-medium px-3">In Escrow</Badge>;
      case "Released":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 shadow-none font-medium px-3">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200 shadow-none font-medium px-3">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 space-y-8 font-sans">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 mt-1">Manage your milestones, invoices, and earnings.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm">
                <FileText className="w-4 h-4 mr-2" />
                Tax Report
            </Button>
            <Button 
                onClick={handleExportCSV}
                className="bg-[#14A9F9] hover:bg-[#0f90d6] text-white shadow-md shadow-blue-500/20"
            >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
            </Button>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-[#14A9F9] to-[#0B8BCF] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wallet className="w-24 h-24" />
            </div>
            <CardContent className="p-6">
                <p className="text-blue-100 text-sm font-medium mb-1">Total Earnings</p>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold">₹{totalEarned.toLocaleString()}</h2>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center text-white">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12%
                    </span>
                </div>
            </CardContent>
        </Card>

        {/* Escrow / Pending */}
        <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">In Escrow / Pending</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-1">₹{totalPending.toLocaleString()}</h2>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <CreditCard className="w-6 h-6 text-amber-500" />
                    </div>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[65%]" />
                </div>
                <p className="text-xs text-slate-400 mt-2">65% of monthly goal</p>
            </CardContent>
        </Card>

        {/* Available for Withdrawal */}
        <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Available Withdrawal</p>
                        <h2 className="text-3xl font-bold text-slate-800 mt-1">₹{(totalEarned * 0.9).toLocaleString()}</h2>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg">
                        <ArrowUpRight className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 h-8">
                    Request Payout
                </Button>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 3. MAIN TABLE SECTION */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        placeholder="Search projects or IDs..."
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/20 focus:border-[#14A9F9] transition"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#14A9F9] text-slate-600 cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Funded">Funded</option>
                        <option value="Released">Released</option>
                        <option value="Pending">Pending</option>
                    </select>
                    
                    <div className="relative">
                         {/* Simple Date Input disguised as a button-like element */}
                        <input 
                            type="date" 
                            className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:border-[#14A9F9]"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-medium">
                                <th className="p-5">Transaction Details</th>
                                <th className="p-5">Milestone</th>
                                <th className="p-5">Date</th>
                                <th className="p-5">Amount</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                            {filteredRows.length > 0 ? filteredRows.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${row.color}`}>
                                                {row.logo}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{row.project}</p>
                                                <p className="text-xs text-slate-500 font-mono">{row.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-slate-600">{row.milestone}</td>
                                    <td className="p-5 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            {row.date}
                                        </div>
                                    </td>
                                    <td className="p-5 font-bold text-slate-900">₹{row.amount.toLocaleString()}</td>
                                    <td className="p-5">{getStatusBadge(row.status)}</td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#14A9F9]">
                                                <ArrowDownToLine className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-800">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Filter className="w-8 h-8 text-slate-300" />
                                            <p>No transactions found matching your filters.</p>
                                            <Button 
                                                variant="link" 
                                                className="text-[#14A9F9]" 
                                                onClick={() => {setSearchQuery(""); setStatusFilter("All"); setDateFilter("")}}
                                            >
                                                Clear Filters
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

        {/* 4. SIDEBAR - RELATIONSHIP MANAGER & HELP */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
             <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-[#14A9F9]/5 border-b border-blue-100 pb-4">
                    <CardTitle className="text-sm font-semibold text-[#14A9F9] flex items-center gap-2">
                        PREMIUM SUPPORT
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="text-center mb-6">
                        <div className="relative inline-block">
                             <img 
                                src="https://i.pravatar.cc/150?img=11" 
                                className="w-20 h-20 rounded-full border-4 border-white shadow-lg mx-auto"
                                alt="Relationship Manager"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <h3 className="mt-3 font-bold text-slate-800 text-lg">Amit Sharma</h3>
                        <p className="text-sm text-slate-500">Relationship Manager</p>
                        <div className="mt-2 inline-flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-200">
                            ● Online Now
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full bg-[#14A9F9] hover:bg-[#0f90d6] shadow-md shadow-blue-500/20">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Start Chat
                        </Button>
                        <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50">
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Call
                        </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-xs text-slate-400 text-center">
                            Usually replies within 5 minutes <br/> during business hours (10 AM - 7 PM).
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">Need a detailed Invoice?</h4>
                <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                    Download monthly consolidated statements for your tax filing.
                </p>
                <Button variant="secondary" className="w-full bg-white text-indigo-900 hover:bg-indigo-50">
                    <Download className="w-4 h-4 mr-2" />
                    Download Statement
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}