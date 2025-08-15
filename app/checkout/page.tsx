"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/contexts/cart-context"
import { useLocation } from "@/contexts/location-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PaymentMethod {
  id: string
  type: "card" | "digital"
  name: string
  icon: React.ReactNode
}

interface CardDetails {
  number: string
  expiry: string
  cvv: string
  name: string
}

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const { currentAddress } = useLocation()
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const deliveryFee = 2.99
  const serviceFee = 1.99
  const tax = total * 0.08875
  const finalTotal = total + deliveryFee + serviceFee + tax

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      type: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "apple",
      type: "digital",
      name: "Apple Pay",
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      id: "google",
      type: "digital",
      name: "Google Pay",
      icon: <Smartphone className="w-5 h-5" />,
    },
  ]

  const validateCardDetails = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!cardDetails.number || cardDetails.number.replace(/\s/g, "").length < 16) {
      newErrors.number = "Please enter a valid card number"
    }

    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = "Please enter expiry date (MM/YY)"
    }

    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    if (!cardDetails.name.trim()) {
      newErrors.name = "Please enter cardholder name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const handleCardInputChange = (field: keyof CardDetails, value: string) => {
    let formattedValue = value

    if (field === "number") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value)
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4)
    }

    setCardDetails((prev) => ({ ...prev, [field]: formattedValue }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePlaceOrder = async () => {
    if (!currentAddress) {
      alert("Please add a delivery address")
      return
    }

    if (selectedPayment === "card" && !validateCardDetails()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order ID
    const orderId = `DL${Date.now().toString().slice(-6)}`

    // Clear cart and redirect to confirmation
    clearCart()
    router.push(`/order-confirmation?orderId=${orderId}&total=${finalTotal.toFixed(2)}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{currentAddress.street}</p>
                      <p className="text-muted-foreground">
                        {currentAddress.city}, {currentAddress.state} {currentAddress.zipCode}
                      </p>
                    </div>
                    <Link href="/location">
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      Please add a delivery address to continue
                      <Link href="/location" className="ml-2">
                        <Button size="sm">Add Address</Button>
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                        {method.icon}
                        <span>{method.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Card Details Form */}
                {selectedPayment === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => handleCardInputChange("number", e.target.value)}
                        maxLength={19}
                        className={errors.number ? "border-destructive" : ""}
                      />
                      {errors.number && <p className="text-sm text-destructive mt-1">{errors.number}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                          maxLength={5}
                          className={errors.expiry ? "border-destructive" : ""}
                        />
                        {errors.expiry && <p className="text-sm text-destructive mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                          maxLength={4}
                          className={errors.cvv ? "border-destructive" : ""}
                        />
                        {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => handleCardInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                  </div>
                )}

                {/* Digital Payment Info */}
                {selectedPayment !== "card" && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      You'll be redirected to complete your payment securely.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Estimated delivery: 25-35 mins</span>
                </div>

                {/* Place Order Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !currentAddress}
                >
                  {isProcessing ? "Processing..." : `Place Order - $${finalTotal.toFixed(2)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
