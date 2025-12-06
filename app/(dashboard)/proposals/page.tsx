"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, Calendar, DollarSign, Briefcase, FileText, 
  Clock, CheckCircle, ShieldCheck, XCircle, AlertCircle, 
  Search, Filter, ChevronRight, Eye
} from "lucide-react";

// ==============================================================================
// 1. REUSABLE UI COMPONENTS
// ==============================================================================

const Button = ({ variant = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2";
  const variants = {
    default: "bg-black text-white hover:bg-black/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
    blue: "bg-[#009bf2] text-white hover:bg-[#008cdb]",
    ghost: "hover:bg-gray-100 text-gray-600",
  };
  // @ts-ignore
  return <button className={`${baseStyles} ${variants[variant] || variants.default} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ variant = "default", className = "", children }: any) => {
  const baseStyles = "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants = {
    default: "bg-gray-100 text-gray-900",
    pending: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    destructive: "bg-red-100 text-red-700",
    warning: "bg-orange-100 text-orange-800",
  };
  // @ts-ignore
  return <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>{children}</div>;
};

const Card = ({ className = "", children }: any) => <div className={`rounded-xl border bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;

// ==============================================================================
// 2. MOCK DATA (All Proposal History)
// ==============================================================================

type ProposalStatus = "Pending" | "Awarded" | "Declined" | "Withdrawn";

interface Proposal {
  id: number;
  title: string;
  category: string;
  description: string; // Project Description
  budget: string; // Client's Budget
  submittedOn: string;
  status: ProposalStatus;
  
  // User's Submitted Proposal Details
  myBid: string;
  myDuration: string;
  coverLetter: string;
  attachments: string[];
  
  // Client Details
  clientName: string;
  clientLocation: string;
  clientVerified: boolean;
}

const ALL_PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: "CAB APP DEVELOPMENT",
    category: "FLUTTER",
    description: "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens, offering new Lifestyle...",
    budget: "$4,500",
    submittedOn: "Oct 12, 2023",
    status: "Pending",
    myBid: "$137.00",
    myDuration: "7 Days",
    coverLetter: "Hi there, I have extensive experience with Flutter and UI/UX design. I have reviewed your requirements for the Cab App and I am confident I can deliver a high-quality interface similar to Uber/Lyft but with the luxury aesthetic you described.",
    attachments: ["portfolio_v2.pdf", "wireframes.png"],
    clientName: "Adarsh Group",
    clientLocation: "New York, USA",
    clientVerified: true,
  },
  {
    id: 2,
    title: "Real Estate Portal App",
    category: "FLUTTER",
    description: "Full stack development for a property listing app. Geolocation, Maps integration, and Chat support needed.",
    budget: "$8,000",
    submittedOn: "Aug 15, 2023",
    status: "Awarded",
    myBid: "$8,000",
    myDuration: "2 Months",
    coverLetter: "I specialize in map-based applications using Flutter. I have built similar real estate platforms before...",
    attachments: ["case_study_realestate.pdf"],
    clientName: "EstateFindr Inc.",
    clientLocation: "London, UK",
    clientVerified: true,
  },
  {
    id: 3,
    title: "Crypto Wallet Integration",
    category: "BLOCKCHAIN",
    description: "Need a developer to integrate MetaMask wallet connect into our existing React application.",
    budget: "$3,000",
    submittedOn: "Sept 10, 2023",
    status: "Declined",
    myBid: "$2,800",
    myDuration: "14 Days",
    coverLetter: "I am a Web3 developer with 3 years of experience. I can integrate MetaMask/WalletConnect efficiently.",
    attachments: [],
    clientName: "CryptoSecure",
    clientLocation: "Berlin, Germany",
    clientVerified: false,
  },
];

// ==============================================================================
// 3. SUB-COMPONENTS
// ==============================================================================

// --- DETAIL VIEW: Shows Project + User's Proposal Input ---
const ProposalDetailView = ({ proposal, onBack }: { proposal: Proposal; onBack: () => void }) => {
  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      {/* Header / Back */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Proposals
        </button>
        <div className="h-6 w-px bg-gray-300"></div>
        <span className="text-sm font-semibold text-gray-900">Proposal Details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Project Context */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900 uppercase">{proposal.title}</h1>
                  <div className="flex gap-2 mt-2">
                     <Badge variant="default">{proposal.category}</Badge>
                     <span className="text-sm text-gray-500 flex items-center"><Clock className="h-3 w-3 mr-1"/> Posted: {proposal.submittedOn}</span>
                  </div>
               </div>
               <Badge 
                  variant={proposal.status === "Awarded" ? "success" : proposal.status === "Declined" ? "destructive" : "pending"}
                  className="px-3 py-1 text-xs"
               >
                  {proposal.status}
               </Badge>
            </div>
            
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Original Project Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{proposal.description}</p>
          </Card>

          {/* 2. User's Submitted Proposal */}
          <Card className="p-6 border-blue-100 bg-blue-50/10">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
               <FileText className="h-5 w-5 text-blue-600"/> Your Submitted Proposal
            </h2>

            {/* Cover Letter */}
            <div className="mb-6">
               <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">Cover Letter</h3>
               <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-700 leading-relaxed text-sm whitespace-pre-line shadow-sm">
                  {proposal.coverLetter}
               </div>
            </div>

            {/* Attachments */}
            {proposal.attachments.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">Attachments</h3>
                    <div className="flex flex-wrap gap-3">
                        {proposal.attachments.map((file, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 border bg-white rounded-md text-sm text-blue-600 hover:underline cursor-pointer">
                                <FileText className="h-4 w-4" /> {file}
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </Card>
        </div>

        {/* RIGHT: SIDEBAR INFO */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Bid Summary Card */}
           <Card className="p-6 bg-[#fafafa]">
              <h3 className="font-bold text-gray-900 mb-4">Bid Summary</h3>
              
              <div className="flex justify-between items-center mb-3 pb-3 border-b">
                 <span className="text-gray-600 text-sm">Your Bid</span>
                 <span className="text-xl font-bold text-gray-900">{proposal.myBid}</span>
              </div>
              
              <div className="flex justify-between items-center mb-3 pb-3 border-b">
                 <span className="text-gray-600 text-sm">Client Budget</span>
                 <span className="text-sm font-medium text-gray-500">{proposal.budget}</span>
              </div>

              <div className="flex justify-between items-center">
                 <span className="text-gray-600 text-sm">Duration</span>
                 <span className="text-sm font-medium text-gray-900 flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" /> {proposal.myDuration}
                 </span>
              </div>
           </Card>

           {/* Client Info Card */}
           <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Client Details</h3>
              <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                      {proposal.clientName.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                      <div className="font-medium text-sm">{proposal.clientName}</div>
                      <div className="text-xs text-gray-500">{proposal.clientLocation}</div>
                  </div>
              </div>
              {proposal.clientVerified && (
                  <div className="flex items-center text-xs text-green-600 font-medium bg-green-50 p-2 rounded">
                      <ShieldCheck className="h-4 w-4 mr-1" /> Payment Verified
                  </div>
              )}
           </Card>

           {/* Actions */}
           {proposal.status === "Pending" && (
             <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
               Withdraw Proposal
             </Button>
           )}
        </div>

      </div>
    </div>
  );
};

// ==============================================================================
// 4. MAIN PAGE COMPONENT
// ==============================================================================

export default function ProposalsPage() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  // If a proposal is selected, show detailed view
  if (selectedProposal) {
    return (
      <div className="p-4 md:p-8 pt-10 max-w-6xl mx-auto font-sans text-gray-900 bg-gray-50 min-h-screen">
        <ProposalDetailView 
          proposal={selectedProposal} 
          onBack={() => setSelectedProposal(null)} 
        />
      </div>
    );
  }

  // Otherwise, show LIST view (Dashboard)
  return (
    <div className="p-4 md:p-8 pt-10 max-w-6xl mx-auto font-sans text-gray-900 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
          <p className="text-gray-500 mt-1">Track your applied projects and proposal history.</p>
        </div>
        
        {/* Simple Search */}
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
           <input 
              type="text" 
              placeholder="Search proposals..." 
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
           />
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {ALL_PROPOSALS.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              
              {/* Left Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-lg font-bold text-gray-900 uppercase group-hover:text-blue-600 transition-colors">
                      {proposal.title}
                   </h3>
                   <Badge 
                      variant={proposal.status === "Awarded" ? "success" : proposal.status === "Declined" ? "destructive" : "pending"}
                      className="text-[10px] px-2"
                   >
                      {proposal.status}
                   </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 mb-4">
                   <span className="px-2 py-0.5 bg-gray-100 rounded">{proposal.category}</span>
                   <span>Submitted: {proposal.submittedOn}</span>
                </div>

                <div className="flex items-center gap-8">
                   <div>
                      <span className="text-xs text-gray-400 uppercase font-bold">Your Bid</span>
                      <p className="text-lg font-bold text-gray-900">{proposal.myBid}</p>
                   </div>
                   <div>
                      <span className="text-xs text-gray-400 uppercase font-bold">Client Budget</span>
                      <p className="text-sm font-medium text-gray-600 mt-1">{proposal.budget}</p>
                   </div>
                   <div>
                      <span className="text-xs text-gray-400 uppercase font-bold">Duration</span>
                      <p className="text-sm font-medium text-gray-600 mt-1">{proposal.myDuration}</p>
                   </div>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex flex-col justify-center items-end shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <Button 
                   onClick={() => setSelectedProposal(proposal)} 
                   variant="blue"
                   className="w-full md:w-auto font-semibold flex items-center gap-2"
                >
                   <Eye className="h-4 w-4" /> View Proposal
                </Button>
                <p className="text-xs text-gray-400 mt-2 text-center md:text-right w-full">
                   Click to view full submission details
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}