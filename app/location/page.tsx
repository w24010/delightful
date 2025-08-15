"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, MapPin, Navigation, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLocation } from "@/contexts/location-context"
import Link from "next/link"

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function LocationPage() {
  const { currentAddress, isLoading, error, getCurrentLocation, setAddress, clearLocation, checkDeliveryArea } =
    useLocation()
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  })
  const [addressError, setAddressError] = useState("")

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAddressError("")

    // Validate required fields
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      setAddressError("Please fill in all required fields")
      return
    }

    // Check if delivery is available
    if (!checkDeliveryArea(newAddress)) {
      setAddressError("Sorry, we don't deliver to this area yet. Please try a different address.")
      return
    }

    setAddress(newAddress)
    setIsAddingAddress(false)
    setNewAddress({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    })
  }

  const handleInputChange = (field: keyof Address, value: string) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }))
    setAddressError("")
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
            <h1 className="text-xl font-bold">Delivery Location</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Current Location Detection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="w-5 h-5" />
              <span>Use Current Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Allow location access to automatically detect your address for faster delivery.
            </p>
            <Button onClick={getCurrentLocation} disabled={isLoading} className="w-full">
              {isLoading ? "Detecting Location..." : "Use My Current Location"}
            </Button>
            {error && (
              <Alert className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Current Address */}
        {currentAddress && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Current Address</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearLocation} className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{currentAddress.street}</p>
                <p className="text-muted-foreground">
                  {currentAddress.city}, {currentAddress.state} {currentAddress.zipCode}
                </p>
                <p className="text-muted-foreground">{currentAddress.country}</p>
              </div>
              <div className="mt-4">
                <Link href="/">
                  <Button className="w-full">Continue with This Address</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add New Address</span>
              </div>
              {!isAddingAddress && (
                <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(true)}>
                  Add Address
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          {isAddingAddress && (
            <CardContent>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={newAddress.street}
                    onChange={(e) => handleInputChange("street", e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={newAddress.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={newAddress.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={newAddress.country} disabled />
                  </div>
                </div>
                {addressError && (
                  <Alert>
                    <AlertDescription>{addressError}</AlertDescription>
                  </Alert>
                )}
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">
                    Save Address
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingAddress(false)
                      setAddressError("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Delivery Areas Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Delivery Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">We currently deliver to these areas:</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>New York, NY</span>
                <span className="text-muted-foreground">ZIP: 10001-10005</span>
              </div>
              <div className="flex justify-between">
                <span>Los Angeles, CA</span>
                <span className="text-muted-foreground">ZIP: 90001-90005</span>
              </div>
              <div className="flex justify-between">
                <span>Chicago, IL</span>
                <span className="text-muted-foreground">ZIP: 60601-60605</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Don't see your area? We're expanding soon! Check back later.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
