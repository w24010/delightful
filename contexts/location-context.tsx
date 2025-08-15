"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface LocationState {
  currentAddress: Address | null
  isLoading: boolean
  error: string | null
  isLocationEnabled: boolean
}

interface LocationContextType extends LocationState {
  setAddress: (address: Address) => void
  getCurrentLocation: () => Promise<void>
  clearLocation: () => void
  checkDeliveryArea: (address: Address) => boolean
}

const initialState: LocationState = {
  currentAddress: null,
  isLoading: false,
  error: null,
  isLocationEnabled: false,
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

// Mock delivery areas (in a real app, this would come from an API)
const deliveryAreas = [
  { city: "New York", state: "NY", zipCodes: ["10001", "10002", "10003", "10004", "10005"] },
  { city: "Los Angeles", state: "CA", zipCodes: ["90001", "90002", "90003", "90004", "90005"] },
  { city: "Chicago", state: "IL", zipCodes: ["60601", "60602", "60603", "60604", "60605"] },
]

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LocationState>(initialState)

  // Load saved address from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("delightful-address")
    if (savedAddress) {
      try {
        const address = JSON.parse(savedAddress)
        setState((prev) => ({ ...prev, currentAddress: address }))
      } catch (error) {
        console.error("Failed to load address from localStorage:", error)
      }
    }
  }, [])

  // Save address to localStorage whenever it changes
  useEffect(() => {
    if (state.currentAddress) {
      localStorage.setItem("delightful-address", JSON.stringify(state.currentAddress))
    }
  }, [state.currentAddress])

  const setAddress = (address: Address) => {
    setState((prev) => ({ ...prev, currentAddress: address, error: null }))
  }

  const getCurrentLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
        isLocationEnabled: false,
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        })
      })

      const { latitude, longitude } = position.coords

      // In a real app, you would use a geocoding service like Google Maps API
      // For demo purposes, we'll create a mock address
      const mockAddress: Address = {
        street: "123 Current Location St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        coordinates: {
          lat: latitude,
          lng: longitude,
        },
      }

      setState((prev) => ({
        ...prev,
        currentAddress: mockAddress,
        isLoading: false,
        isLocationEnabled: true,
      }))
    } catch (error) {
      let errorMessage = "Failed to get current location"
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }
      }

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        isLocationEnabled: false,
      }))
    }
  }

  const clearLocation = () => {
    localStorage.removeItem("delightful-address")
    setState((prev) => ({ ...prev, currentAddress: null, error: null }))
  }

  const checkDeliveryArea = (address: Address): boolean => {
    return deliveryAreas.some(
      (area) =>
        area.city.toLowerCase() === address.city.toLowerCase() &&
        area.state.toLowerCase() === address.state.toLowerCase() &&
        area.zipCodes.includes(address.zipCode),
    )
  }

  return (
    <LocationContext.Provider
      value={{
        ...state,
        setAddress,
        getCurrentLocation,
        clearLocation,
        checkDeliveryArea,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
