"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Send,
  Bell,
  FileCheck,
  Star,
  UserCircle,
  Megaphone,
  Settings,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Project", href: "/projects" },
  { icon: Users, label: "Workstreams", href: "/workstreams" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Send, label: "Proposal Sent", href: "/proposals", badge: 3 },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: 5 },
  { icon: FileCheck, label: "Articles", href: "/articles" },
  { icon: Star, label: "MY Favourites", href: "/favourites" },
  { icon: UserCircle, label: "Contacts", href: "/contacts" },
]

const promotionItems = [
  { icon: Megaphone, label: "Promotions", href: "/promotions" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Stratalite</span>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Menu
            </h2>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={isActive ? "secondary" : "default"} className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* PRO Section */}
          <div className="mx-3 my-4 rounded-lg bg-blue-50 p-4">
            <h3 className="text-sm font-semibold text-gray-800">Become a PRO</h3>
            <p className="mt-1 text-xs text-gray-600">Upgrade your account</p>
          </div>

          {/* Promotions */}
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Promotions
            </h2>
            <div className="space-y-1">
              {promotionItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="border-t p-4">
          <Link
            href="/settings"
            className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
