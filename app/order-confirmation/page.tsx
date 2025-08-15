"use client"

import { useEffect, useState } from "react"
import { Check, Clock, MapPin, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLocation } from "@/contexts/location-context"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface OrderStatus {
  id: string
  label: string
  completed: boolean
  current: boolean
  time?: string
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const total = searchParams.get("total")
  const { currentAddress } = useLocation()
  const [progress, setProgress] = useState(25)
  const [currentStep, setCurrentStep] = useState(0)

  const orderStatuses: OrderStatus[] = [
    { id: "confirmed", label: "Order Confirmed", completed: true, current: false, time: "Just now" },
    { id: "preparing", label: "Preparing Food", completed: false, current: true, time: "5-10 mins" },
    { id: "pickup", label: "Ready for Pickup", completed: false, current: false, time: "15-20 mins" },
    { id: "delivery", label: "Out for Delivery", completed: false, current: false, time: "25-30 mins" },
    { id: "delivered", label: "Delivered", completed: false, current: false, time: "30-35 mins" },
  ]

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })

      setCurrentStep((prev) => {
        if (prev < orderStatuses.length - 1 && progress > (prev + 1) * 20) {
          return prev + 1
        }
        return prev
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [progress, orderStatuses.length])

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg opacity-90">Your delicious food is on its way</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{orderId}</span>
                  <Badge variant="secondary">In Progress</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-bold">${total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span className="font-medium">25-35 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    {orderStatuses.map((status, index) => (
                      <div key={status.id} className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            status.completed
                              ? "bg-primary text-primary-foreground"
                              : status.current
                                ? "bg-primary/20 text-primary border-2 border-primary"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {status.completed ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${status.current ? "text-primary" : ""}`}>{status.label}</p>
                          {status.time && (
                            <p className="text-sm text-muted-foreground">
                              {status.completed ? status.time : `ETA: ${status.time}`}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentAddress ? (
                  <div>
                    <p className="font-medium">{currentAddress.street}</p>
                    <p className="text-muted-foreground">
                      {currentAddress.city}, {currentAddress.state} {currentAddress.zipCode}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Address not available</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Support & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Restaurant
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Clock className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </CardContent>
            </Card>

            {/* Order Again */}
            <Card>
              <CardHeader>
                <CardTitle>Loved Your Order?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Order the same delicious items again with one click!</p>
                <Button className="w-full">Order Again</Button>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/orders" className="block">
                  <Button variant="ghost" className="w-full">
                    View All Orders
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
