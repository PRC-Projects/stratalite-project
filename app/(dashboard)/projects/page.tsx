"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Added for redirection
import { 
  DollarSign, Calendar, Star, Filter, Bookmark, CheckCircle, 
  XCircle, AlertCircle, Send, Briefcase, ChevronDown, ChevronUp, 
  ArrowLeft, MapPin, Clock, ShieldCheck, Zap, User, ThumbsUp
} from "lucide-react";

// ==============================================================================
// 1. SHARED UI COMPONENTS
// ==============================================================================

const Button = ({ variant = "default", size = "default", className = "", children, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-[#14A4F9] text-white hover:bg-blue-600 shadow-sm",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
    // Added specific variants for Applied Section
    blue: "bg-[#14A4F9] text-white hover:bg-[#008cdb] shadow-sm", 
    blueOutline: "border border-[#009bf2] text-[#009bf2] bg-white hover:bg-blue-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };
  // @ts-ignore
  return <button className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ variant = "default", className = "", children }: any) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants = {
    default: "border-transparent bg-black text-white",
    outline: "text-gray-900 border-gray-200",
    pending: "border-transparent bg-blue-100 text-blue-800",
    success: "border-transparent bg-green-100 text-green-800",
    warning: "border-transparent bg-yellow-100 text-yellow-800",
    destructive: "border-transparent bg-red-100 text-red-800",
    purple: "border-transparent bg-purple-100 text-purple-800",
    // Added variant for Applied status tag
    info: "bg-[#009bf2] text-white border-transparent", 
  };
  // @ts-ignore
  return <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>{children}</div>;
};

const Card = ({ className = "", children }: any) => <div className={`rounded-xl border bg-white text-gray-950 shadow-sm transition-all ${className}`}>{children}</div>;
const CardHeader = ({ className = "", children }: any) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ className = "", children }: any) => <h3 className={`text-xl font-bold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ className = "", children }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({ className = "", children }: any) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;

// ==============================================================================
// 2. TYPES & MOCK DATA
// ==============================================================================

type Milestone = { name: string; description: string; amount: string; date: string; completed: boolean; };
type Applicant = { id: number; name: string; rating: number; earnings: string; appliedTime: string; about: string; avatar: string; };
type ClientInfo = { name: string; location: string; rating: number; totalSpent: string; memberSince: string; verified: boolean; };

type Project = {
  id: number; title: string; category: string; description: string; 
  budget: string; type: "Fixed" | "Hourly";
  dateRange: string; proposals: number; 
  status: "Pending" | "Applied" | "Awarded" | "Declined" | "Dispute";
  closed: string | null; rating: number | null; milestones: Milestone[] | null; isBookmarked: boolean;
  appliedDate?: string; declineReason?: string; disputeReason?: string;
  client?: ClientInfo; 
  applicants?: Applicant[];
  skills?: string[];
  // Added fields for Applied Section display
  myBidAmount?: string; 
  bidStatus?: "Pending" | "Accepted" | "Rejected";
};

// --- MOCK APPLICANTS ---
const MOCK_APPLICANTS: Applicant[] = [
  { id: 101, name: "Sarah J.", rating: 4.9, earnings: "$45k+", appliedTime: "2 hours ago", about: "Expert UI/UX designer with 5 years of experience in Figma.", avatar: "SJ" },
  { id: 102, name: "Mike R.", rating: 4.7, earnings: "$12k+", appliedTime: "5 hours ago", about: "Flutter developer focused on clean architecture.", avatar: "MR" },
  { id: 103, name: "Davide B.", rating: 5.0, earnings: "$120k+", appliedTime: "1 day ago", about: "Senior Full Stack Dev. I build scalable systems.", avatar: "DB" },
  { id: 104, name: "Anita P.", rating: 4.5, earnings: "$8k+", appliedTime: "1 day ago", about: "Creative designer specializing in mobile apps.", avatar: "AP" },
];

// --- INITIAL DATA ---
const INITIAL_PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "Cab App UI/UX Design", 
    category: "FIGMA", 
    type: "Fixed",
    description: "I will design UI UX for mobile app with figma for ios. Adarsh Group is venturing into homes Inspired by the millennial generation. We need a clean, modern interface that rivals Uber and Lyft but focuses on luxury travel.", 
    budget: "$4,500", 
    dateRange: "22 Jan - 22 Feb", 
    proposals: 12, 
    status: "Pending", 
    closed: null, rating: null, milestones: null, isBookmarked: false,
    skills: ["Figma", "Mobile Design", "Prototyping", "iOS"],
    client: { name: "Adarsh Group", location: "New York, USA", rating: 4.8, totalSpent: "$150k+", memberSince: "2018", verified: true },
    applicants: MOCK_APPLICANTS
  },
  { 
    id: 2, 
    title: "E-Commerce Shopify Redesign", 
    category: "REACT", 
    type: "Hourly",
    description: "Looking for an expert to redesign our Shopify store. Need modern aesthetic and improved conversion funnel. The current theme is slow and unresponsive.", 
    budget: "$45/hr", 
    dateRange: "15 Mar - 30 Apr", 
    proposals: 8, 
    status: "Pending", 
    closed: null, rating: null, milestones: null, isBookmarked: true,
    skills: ["Shopify", "React", "Liquid", "CSS"],
    client: { name: "TrendSetter Clothing", location: "London, UK", rating: 4.5, totalSpent: "$20k+", memberSince: "2021", verified: true },
    applicants: MOCK_APPLICANTS.slice(0, 2)
  },
  { 
    id: 3, 
    title: "CAB APP DEVELOPMENT", // Updated Title to match context 
    category: "FLUTTER", // Updated Category
    type: "Fixed", 
    description: "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens, offering new Lifestyle, with the same Trust, Quality & Consistency.....", 
    budget: "$4,500", 
    dateRange: "22-01-22 to 22-01-22", 
    proposals: 12, 
    status: "Applied", 
    closed: null, rating: null, milestones: null, isBookmarked: false, 
    appliedDate: "Oct 12, 2023",
    // Added fields for the Applied Card
    myBidAmount: "$137.00", 
    bidStatus: "Pending" 
  },
  { id: 4, title: "Real Estate Portal App", category: "FLUTTER", type: "Fixed", description: "Full stack development for a property listing app.", budget: "$8,000", dateRange: "Completed", proposals: 12, status: "Awarded", closed: "12 May 2025", rating: 5, isBookmarked: false, milestones: [{ name: "Phase 1: UI", description: "Front-end Complete", amount: "$2,000", date: "30 June", completed: true }, { name: "Phase 2: Admin", description: "Admin Dashboard", amount: "$2,000", date: "31 July", completed: true }, { name: "Phase 3: Backend", description: "Back-end Complete", amount: "$2,000", date: "07 Aug", completed: true }, { name: "Phase 4: API", description: "API Implementation", amount: "$2,000", date: "31 Aug", completed: true }] },
  { id: 5, title: "Crypto Wallet Integration", category: "BLOCKCHAIN", type: "Fixed", description: "Need a developer to integrate MetaMask.", budget: "$3,000", dateRange: "Flexible", proposals: 50, status: "Declined", closed: null, rating: null, milestones: null, isBookmarked: false, appliedDate: "Sept 10, 2023", declineReason: "Client required a developer located in EST timezone only." },
  { id: 6, title: "Corporate Landing Page", category: "WORDPRESS", type: "Fixed", description: "Build a 5-page corporate website.", budget: "$800", dateRange: "Urgent", proposals: 5, status: "Dispute", closed: null, rating: null, milestones: null, isBookmarked: false, disputeReason: "Client is claiming the work does not match the provided Figma design." },
];

// ==============================================================================
// 3. SPECIALIZED COMPONENTS
// ==============================================================================

const SmartBidCard = ({ projectType, budget }: { projectType: string, budget: string }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | string>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const numBudget = parseInt(budget.replace(/[^0-9]/g, ''));
      const suggestion = projectType === "Hourly" 
        ? `$${numBudget - 5} - $${numBudget + 10}/hr`
        : `$${Math.floor(numBudget * 0.9)} - $${Math.floor(numBudget * 1.05)}`;
      setResult(suggestion);
    }, 1500);
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-indigo-600 fill-indigo-100" />
          <CardTitle className="text-base text-indigo-900">AI Smart Bid</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-indigo-700 mb-4">
          Our AI analyzes similar winning bids, your skills, and client history to suggest the optimal price.
        </p>
        {!result && !analyzing && (
           <Button onClick={handleAnalyze} size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 shadow-lg">
             Analyze Price
           </Button>
        )}
        {analyzing && (
           <div className="flex items-center justify-center space-x-2 py-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
           </div>
        )}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">Recommended Bid</p>
            <p className="text-xl font-bold text-indigo-700 mt-1">{result}</p>
            <div className="mt-3 flex items-start gap-2">
               <ThumbsUp className="h-3 w-3 text-green-600 mt-0.5" />
               <p className="text-[10px] text-gray-600 leading-tight">High chance of acceptance based on your 5-star rating.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProposalView = ({ project, onBack, onSubmitProposal }: { project: Project, onBack: () => void, onSubmitProposal: (id: number) => void }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [duration, setDuration] = useState("Less than 1 month");
  const [coverLetter, setCoverLetter] = useState("");
  const [visibleApplicants, setVisibleApplicants] = useState(3);

  const handleSubmit = () => {
    onSubmitProposal(project.id);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <Badge variant={project.type === "Fixed" ? "default" : "purple"}>{project.type} Price</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3 mb-6">
              <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" /> {project.budget}</span>
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Posted {project.dateRange.split('-')[0]}</span>
              <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" /> {project.category}</span>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

            {project.skills && (
              <div className="mb-8">
                 <h3 className="font-semibold text-sm mb-3">Skills Required</h3>
                 <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{skill}</span>
                    ))}
                 </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 my-8"></div>

          <Card className="border-gray-300 shadow-md">
            <CardHeader className="bg-gray-50 border-b">
               <CardTitle>Submit Your Proposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {project.type === "Hourly" ? "Hourly Rate" : "Bid Amount"}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                        placeholder="0.00"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{project.type === "Hourly" ? "/hr" : "USD"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Duration
                    </label>
                    <select 
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm bg-white"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option>Less than 1 month</option>
                      <option>1 to 3 months</option>
                      <option>3 to 6 months</option>
                      <option>More than 6 months</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    rows={6}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Describe why you are the best fit for this project..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  ></textarea>
                  <p className="text-right text-xs text-gray-400 mt-1">Min 50 chars</p>
               </div>

               <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex justify-center items-center">
                  <div className="text-center">
                     <div className="text-sm text-gray-600">
                        <span className="font-medium text-black hover:underline cursor-pointer">Upload files</span> or drag and drop
                     </div>
                     <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  </div>
               </div>

            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-end gap-3">
               <Button variant="outline" onClick={onBack}>Cancel</Button>
               <Button onClick={handleSubmit} className="px-8">Submit Proposal</Button>
            </CardFooter>
          </Card>

          <div className="pt-8">
             <h3 className="font-bold text-lg mb-4">Other Applicants ({project.applicants?.length || 0})</h3>
             <div className="space-y-4">
                {project.applicants?.slice(0, visibleApplicants).map((applicant) => (
                  <div key={applicant.id} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                     <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-4 shrink-0">
                        {applicant.avatar}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between">
                           <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                           <span className="text-xs text-gray-400">{applicant.appliedTime}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 mb-2">
                           <span className="flex items-center"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1"/> {applicant.rating}</span>
                           <span className="text-green-600 font-medium">{applicant.earnings} earned</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{applicant.about}</p>
                     </div>
                  </div>
                ))}
             </div>
             {project.applicants && visibleApplicants < project.applicants.length && (
                <div className="text-center mt-4">
                   <Button variant="ghost" size="sm" onClick={() => setVisibleApplicants(prev => prev + 3)}>
                      Load more applicants
                   </Button>
                </div>
             )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <Card>
              <CardHeader className="bg-gray-50 border-b pb-4">
                 <CardTitle className="text-base">Client Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                 {project.client ? (
                   <>
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                           {project.client.name.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                           <div className="font-medium">{project.client.name}</div>
                           {project.client.verified && (
                              <div className="flex items-center text-xs text-green-600">
                                 <ShieldCheck className="h-3 w-3 mr-1" /> Payment Verified
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="space-y-3 text-sm pt-2">
                        <div className="flex justify-between">
                           <span className="text-gray-500">Location</span>
                           <span className="font-medium">{project.client.location}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500">Rating</span>
                           <span className="flex items-center font-medium"><Star className="h-3 w-3 fill-black text-black mr-1" /> {project.client.rating}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500">Total Spent</span>
                           <span className="font-medium">{project.client.totalSpent}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500">Member Since</span>
                           <span className="font-medium">{project.client.memberSince}</span>
                        </div>
                     </div>
                   </>
                 ) : (
                   <p className="text-sm text-gray-500">Client details hidden.</p>
                 )}
              </CardContent>
           </Card>

           <SmartBidCard projectType={project.type} budget={project.budget} />

           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center"><Zap className="h-4 w-4 mr-2"/>Pro Tip</h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                 Proposals with specific questions about the project requirements are 3x more likely to get a response.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 4. SECTION COMPONENTS
// ==============================================================================

const NewProjectsSection = ({ projects, onToggleBookmark, onViewDetails }: any) => {
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No new projects available.</div>;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      {projects.map((project: any) => (
        <Card key={project.id} className="hover:shadow-md hover:border-black/20 group transition-all">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onViewDetails(project)}>{project.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                   <Badge variant="outline">{project.category}</Badge>
                   <Badge variant={project.type === "Fixed" ? "secondary" : "purple"} className="text-[10px]">{project.type}</Badge>
                   <span className="text-xs text-gray-500">• Posted recently</span>
                </div>
              </div>
              <button onClick={() => onToggleBookmark(project.id)} className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Bookmark className={`h-5 w-5 ${project.isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            <div className="flex items-center gap-6 mt-4 text-sm font-medium text-gray-700">
              <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1 text-gray-400" /> {project.budget}</span>
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-gray-400" /> {project.dateRange}</span>
              <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1 text-gray-400" /> {project.proposals} Proposals</span>
            </div>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-gray-50/50 flex justify-end">
             <Button size="sm" onClick={() => onViewDetails(project)} className="bg-blue-400 hover:bg-blue-600 text-white w-full sm:w-auto">
                View Details and Apply
             </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// --- UPDATED APPLIED SECTION ---
const AppliedSection = ({ projects }: any) => {
  const router = useRouter();

  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No active applications.</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {projects.map((project: any) => (
        <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Content Area */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 uppercase">{project.title}</h3>
                <span className="text-xs font-medium text-gray-500">{project.proposals} Proposals</span>
              </div>
              
              <div className="text-xs font-semibold text-gray-500 uppercase mb-4">{project.category}</div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center gap-10">
                {/* Project Budget */}
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span>{project.budget.replace('$', '')}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>{project.dateRange}</span>
                </div>
              </div>
              
              {/* My Bid Section (Matching Screenshot) */}
              {project.myBidAmount && (
                <div className="mt-6">
                   <div className="flex items-end gap-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{project.myBidAmount}</span>
                        <p className="text-xs text-gray-500 mt-1">Amount</p>
                      </div>
                      <div className="mb-2">
                         <Badge variant="info" className="px-3 py-1 rounded text-xs">
                            {project.bidStatus || "Pending"}
                         </Badge>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Right Action Area */}
            <div className="flex flex-col justify-start gap-3 w-full lg:w-48 shrink-0">
               {/* 1. View Your Apply - Redirects to Proposal Page */}
               <Button 
                  variant="blue" 
                  className="w-full h-11 font-semibold"
                  onClick={() => router.push('/proposals')}
               >
                 View Your apply
               </Button>

               {/* 2. Send Message - Redirects to Workstream */}
               <Button 
                  variant="blueOutline" 
                  className="w-full h-11 font-semibold"
                  onClick={() => router.push('/workstreams')}
               >
                 Send Message
               </Button>

               {/* 3. View Manager Profile */}
               <button className="text-xs text-center text-gray-400 font-medium hover:text-gray-600 transition-colors mt-2">
                 View manager profile
               </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

const BookmarksSection = ({ projects, onToggleBookmark, onViewDetails }: any) => {
  if (projects.length === 0) return (
    <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
      <Bookmark className="h-10 w-10 text-gray-300 mx-auto mb-2" />
      <p className="font-medium">No bookmarked projects.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {projects.map((project: any) => (
        <Card key={project.id} className="border-l-4 border-l-yellow-400">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{project.status}</Badge>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
              </div>
              <button onClick={() => onToggleBookmark(project.id)}><Bookmark className="h-5 w-5 fill-yellow-500 text-yellow-500" /></button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
            <div className="text-sm text-gray-500 font-medium">{project.budget}</div>
          </CardContent>
          <CardFooter className="pt-0 border-t bg-gray-50/50 p-4">
            {project.status === "Pending" ? (
              <Button size="sm" onClick={() => onViewDetails(project)} className="w-full bg-[#14A9F9] hover:bg-blue-600">View Details and Apply</Button>
            ) : (
              <Button size="sm" variant="outline" className="w-full" disabled>
                {project.status === "Applied" ? "Already Applied" : "View Details"}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const AwardedSection = ({ projects }: any) => {
  const AwardedItem = ({ project }: any) => {
    const [showMilestones, setShowMilestones] = useState(false);
    const totalEarned = project.milestones?.reduce((acc: any, curr: any) => acc + parseFloat(curr.amount.replace(/[^0-9.]/g, '')), 0) || 0;
    return (
      <div className="space-y-4">
        <Card className="border-green-100 bg-green-50/30">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2"><CardTitle className="text-xl">{project.title}</CardTitle><CheckCircle className="h-5 w-5 text-green-600" /></div>
                <Badge variant="success" className="mt-2 bg-green-100 text-green-800 border-green-200">Project Completed</Badge>
              </div>
              <div className="text-right"><p className="text-2xl font-bold text-green-700">${totalEarned.toLocaleString()}</p><p className="text-xs text-gray-500">Total Earnings</p></div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500"><span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Closed: {project.closed}</span><span className="flex items-center text-yellow-500"><Star className="h-4 w-4 mr-1 fill-current" /> {project.rating}/5.0</span></div>
          </CardContent>
          <CardFooter className="border-t border-green-100 pt-4 flex justify-between bg-white/50">
            <Button variant="outline" size="sm">Download Invoice</Button>
            <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100 flex gap-2" onClick={() => setShowMilestones(!showMilestones)}>{showMilestones ? "Hide Milestones" : "View Milestones"}{showMilestones ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}</Button>
          </CardFooter>
        </Card>
        {showMilestones && project.milestones && (
          <Card className="ml-4 md:ml-8 border-l-4 border-l-green-500 animate-in slide-in-from-top-2">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 text-gray-900">Payment History</h4>
              <div className="space-y-4">{project.milestones.map((m: any, i: number) => (<div key={i} className="flex items-center justify-between py-2 border-b last:border-0"><div><p className="font-medium text-sm">{m.name}</p><p className="text-xs text-gray-500">{m.date}</p></div><div className="text-right"><p className="font-bold text-green-600">{m.amount}</p><Badge variant="success" className="scale-75 origin-right">Paid</Badge></div></div>))}</div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No awarded projects yet.</div>;
  return <div className="space-y-6">{projects.map((project: any) => (<AwardedItem key={project.id} project={project} />))}</div>;
};

const DeclinedSection = ({ projects }: any) => {
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No declined projects.</div>;
  return (
    <div className="space-y-4">
      {projects.map((project: any) => (
        <Card key={project.id} className="opacity-90">
          <CardHeader>
              <div className="flex justify-between items-start"><CardTitle className="text-gray-700">{project.title}</CardTitle><Badge variant="destructive" className="flex gap-1"><XCircle className="h-3 w-3" /> Declined</Badge></div>
              <p className="text-xs text-gray-400">Applied on {project.appliedDate}</p>
          </CardHeader>
          <CardContent>
              <div className="bg-red-50 border border-red-100 p-4 rounded-md mb-4"><p className="text-xs font-bold text-red-800 uppercase mb-1">Reason for Decline</p><p className="text-sm text-red-700">{project.declineReason || "No specific reason provided."}</p></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Category: {project.category}</span><span>Budget: {project.budget}</span></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const DisputeSection = ({ projects }: any) => {
  if (projects.length === 0) return <div className="text-center py-10 text-gray-500">No disputes found.</div>;
  return (
    <div className="space-y-4">
      {projects.map((project: any) => (
        <Card key={project.id} className="border-orange-200">
          <CardHeader className="bg-orange-50/50 border-b border-orange-100">
            <div className="flex justify-between items-start"><CardTitle className="text-orange-950">{project.title}</CardTitle><div className="flex items-center text-orange-600 font-bold text-sm gap-1"><AlertCircle className="h-4 w-4" /> Action Required</div></div>
          </CardHeader>
          <CardContent className="pt-6">
            <h4 className="text-sm font-semibold mb-2">Dispute Details</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border mb-4">"{project.disputeReason}"</p>
            <div className="flex gap-4 text-sm text-gray-500"><span>Amount at risk: <span className="text-gray-900 font-medium">{project.budget}</span></span></div>
          </CardContent>
          <CardFooter className="flex gap-3 justify-end border-t pt-4">
            <Button variant="outline" size="sm">Contact Support</Button>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">View Case File</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// ==============================================================================
// 5. MAIN PAGE
// ==============================================================================

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("new");
  const [projectList, setProjectList] = useState<Project[]>(INITIAL_PROJECTS);
  const [filters, setFilters] = useState({ search: "", category: "", budget: "" });
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // VIEW STATE: 'list' | 'proposal'
  const [view, setView] = useState<"list" | "proposal">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // --- ACTIONS ---
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleBookmark = (id: number) => {
    setProjectList(prev => prev.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setView("proposal");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedProject(null);
  };

  const handleApply = (id: number) => {
    setProjectList(prev => prev.map(p => 
      p.id === id ? { 
        ...p, 
        status: "Applied", 
        isBookmarked: false, 
        appliedDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        myBidAmount: "$150.00", 
        bidStatus: "Pending" 
      } : p
    ));
    setView("list");
    setActiveTab("applied"); // Switch to applied tab to show result
  };

  // --- DATA FILTERING ---
  const getFilteredProjects = (statusFilter: string | null, onlyBookmarks = false) => {
    return projectList
      .filter((p) => {
        if (onlyBookmarks && !p.isBookmarked) return false;
        if (statusFilter && p.status !== statusFilter) return false;
        return true;
      })
      .filter((p) => p.title.toLowerCase().includes(filters.search.toLowerCase()))
      .filter((p) => filters.category ? p.category === filters.category : true)
      .filter((p) => !filters.budget || Number(p.budget.replace(/[^0-9.]/g, "")) <= Number(filters.budget));
  };

  // --- RENDER ---
  
  // If in Proposal View, show the Proposal Component
  if (view === "proposal" && selectedProject) {
    return (
      <div className="p-4 md:p-8 pt-10 max-w-6xl mx-auto font-sans text-gray-900 bg-gray-50 min-h-screen">
         <ProposalView 
            project={selectedProject} 
            onBack={handleBackToList} 
            onSubmitProposal={handleApply}
         />
      </div>
    );
  }

  // Otherwise, show the List View
  return (
    <div className="p-4 md:p-8 pt-10 max-w-6xl mx-auto font-sans text-gray-900 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-500 mt-1">Manage proposals, active contracts, and payment history.</p>
        </div>
        <div className="relative">
          <Button variant="outline" className="flex items-center space-x-2 bg-white" onClick={() => setShowFilterPanel(!showFilterPanel)}>
            <Filter className="h-4 w-4" /> <span>Filter</span>
          </Button>
          {showFilterPanel && (
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl border rounded-lg p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
               <div className="flex justify-between items-center mb-3">
                 <h2 className="font-semibold">Filter Projects</h2>
                 <button onClick={() => setShowFilterPanel(false)}><XCircle className="h-4 w-4 text-gray-400" /></button>
               </div>
               <div className="space-y-3">
                  <input type="text" placeholder="Search..." value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" />
                  <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                    <option value="">All Categories</option>
                    <option value="FLUTTER">Flutter</option>
                    <option value="REACT">React</option>
                    <option value="FIGMA">Figma</option>
                  </select>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="space-y-6">
        <div className="flex flex-wrap border-b mb-6 h-auto justify-start gap-x-8 gap-y-2">
          {[
            { id: "new", label: "New Projects", count: getFilteredProjects("Pending").length },
            { id: "bookmarks", label: "Bookmarks", count: getFilteredProjects(null, true).length },
            { id: "applied", label: "Applied", count: getFilteredProjects("Applied").length },
            { id: "awarded", label: "Awarded", count: getFilteredProjects("Awarded").length },
            { id: "declined", label: "Declined", count: getFilteredProjects("Declined").length },
            { id: "dispute", label: "Dispute", count: getFilteredProjects("Dispute").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-1 py-3 font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id 
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {tab.count > 0 && <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* TABS CONTENT AREA */}
        <div className="min-h-[400px]">
          {activeTab === "new" && (
            <NewProjectsSection 
              projects={getFilteredProjects("Pending")} 
              onToggleBookmark={toggleBookmark} 
              onViewDetails={handleViewDetails}
            />
          )}

          {activeTab === "bookmarks" && (
            <BookmarksSection 
              projects={getFilteredProjects(null, true)} 
              onToggleBookmark={toggleBookmark} 
              onViewDetails={handleViewDetails}
            />
          )}

          {activeTab === "applied" && (
            <AppliedSection projects={getFilteredProjects("Applied")} />
          )}

          {activeTab === "awarded" && (
            <AwardedSection projects={getFilteredProjects("Awarded")} />
          )}

          {activeTab === "declined" && (
            <DeclinedSection projects={getFilteredProjects("Declined")} />
          )}

          {activeTab === "dispute" && (
            <DisputeSection projects={getFilteredProjects("Dispute")} />
          )}
        </div>
      </div>
    </div>
  );
}