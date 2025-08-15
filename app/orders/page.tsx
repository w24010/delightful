"use client"

import { ArrowLeft, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Order {
  id: string
  date: string
  status: "delivered" | "in-progress" | "cancelled"
  restaurant: string
  items: string[]
  total: number
  rating?: number
}

export default function OrdersPage() {
  // Mock order data - in a real app, this would come from an API
  const orders: Order[] = [
    {
      id: "DL123456",
      date: "2024-01-15",
      status: "delivered",
      restaurant: "Mario's Italian Kitchen",
      items: ["Margherita Pizza", "Spaghetti Carbonara"],
      total: 35.98,
      rating: 5,
    },
    {
      id: "DL123455",
      date: "2024-01-12",
      status: "delivered",
      restaurant: "Spice Garden",
      items: ["Chicken Tikka Masala", "Garlic Naan"],
      total: 28.5,
      rating: 4,
    },
    {
      id: "DL123454",
      date: "2024-01-10",
      status: "delivered",
      restaurant: "Fresh Sushi Co.",
      items: ["California Roll", "Salmon Sashimi"],
      total: 42.75,
    },
  ]

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "in-progress":
        return "In Progress"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Your Orders</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-muted-foreground mb-8">When you place your first order, it will appear here.</p>
            <Link href="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{order.restaurant}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Items:</p>
                      <ul className="text-sm text-muted-foreground">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                        {order.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{order.rating}/5</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {order.status === "delivered" && (
                          <>
                            <Button variant="outline" size="sm">
                              Rate Order
                            </Button>
                            <Button size="sm">Order Again</Button>
                          </>
                        )}
                        {order.status === "in-progress" && (
                          <Link href={`/order-confirmation?orderId=${order.id}&total=${order.total}`}>
                            <Button size="sm">Track Order</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
