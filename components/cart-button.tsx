"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartButton() {
  const { itemCount } = useCart()

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
            {itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
