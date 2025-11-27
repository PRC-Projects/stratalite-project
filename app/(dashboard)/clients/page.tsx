import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const clients = [
  {
    id: 1,
    name: "Jane Cooper",
    country: "United States",
    status: "select",
  },
  {
    id: 2,
    name: "Jane Cooper",
    country: "United States",
    status: "not-select",
  },
  {
    id: 3,
    name: "Jane Cooper",
    country: "United States",
    status: "not-select",
  },
]

export default function ClientsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Clients</h1>
        <Button variant="link" className="text-primary p-0 h-auto">
          Select client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Search" className="pl-10" />
            </div>
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Short by: Newest</option>
              <option>Short by: Oldest</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Client Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Country
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm">{client.name}</td>
                    <td className="py-4 px-4 text-sm">{client.country}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={client.status === "select" ? "success" : "destructive"}
                        className="px-4 py-1"
                      >
                        {client.status === "select" ? "Select" : "Not select"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button variant="outline" size="icon" disabled>
              ‹
            </Button>
            <Button variant="default" size="icon">
              1
            </Button>
            <Button variant="outline" size="icon">
              2
            </Button>
            <Button variant="outline" size="icon">
              3
            </Button>
            <Button variant="outline" size="icon">
              4
            </Button>
            <Button variant="outline">...</Button>
            <Button variant="outline" size="icon">
              7
            </Button>
            <Button variant="outline" size="icon">
              ›
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
