"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // This state controls BOTH the Sidebar and the Header
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Pass state to Sidebar so it can toggle itself */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 2. Pass SAME state to Header so it knows when to expand */}
      <Header collapsed={collapsed} />

      {/* 3. IMPORTANT: The main content also needs to move! 
          We use the same width logic here (pl-20 vs pl-64) */}
      <main 
        className={`pt-16 transition-all duration-300 ease-in-out ${
          collapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}