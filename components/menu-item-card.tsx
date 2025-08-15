"use client"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MenuItemCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image: string
    popular?: boolean
    spicy?: boolean
  }
  onAddToCart: (itemId: string) => void
  onRemoveFromCart: (itemId: string) => void
  quantity: number
}

export function MenuItemCard({ item, onAddToCart, onRemoveFromCart, quantity }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/3 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <div className="flex space-x-1">
                {item.popular && (
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                )}
                {item.spicy && (
                  <Badge variant="destructive" className="text-xs">
                    Spicy
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
              <div className="flex items-center space-x-2">
                {quantity > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveFromCart(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
                  </>
                )}
                <Button size="sm" onClick={() => onAddToCart(item.id)} className="h-8 w-8 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
          <div className="sm:w-1/3">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-32 sm:h-full object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
