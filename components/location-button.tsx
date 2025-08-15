"use client"

import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "@/contexts/location-context"
import Link from "next/link"

export function LocationButton() {
  const { currentAddress } = useLocation()

  return (
    <Link href="/location">
      <Button variant="ghost" size="sm" className="flex items-center space-x-2 max-w-48">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <div className="flex flex-col items-start min-w-0">
          <span className="text-xs text-muted-foreground">Deliver to</span>
          <span className="text-sm font-medium truncate">
            {currentAddress
              ? `${currentAddress.street.split(" ")[0]} ${currentAddress.street.split(" ")[1]}...`
              : "Add address"}
          </span>
        </div>
        <ChevronDown className="w-3 h-3 flex-shrink-0" />
      </Button>
    </Link>
  )
}
