"use client"
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"
import { CartButton } from "@/components/cart-button"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  popular?: boolean
  spicy?: boolean
}

const restaurantData = {
  "marios-italian": {
    name: "Mario's Italian Kitchen",
    cuisine: "Italian",
    rating: 4.8,
    reviews: 1250,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/italian-restaurant-kitchen.png",
    address: "123 Little Italy St, Downtown",
    menu: [
      {
        id: "1",
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomato sauce, basil, olive oil",
        price: 18.99,
        image: "/margherita-pizza.png",
        category: "Pizza",
        popular: true,
      },
      {
        id: "2",
        name: "Pepperoni Pizza",
        description: "Pepperoni, mozzarella cheese, tomato sauce",
        price: 21.99,
        image: "/pepperoni-pizza.png",
        category: "Pizza",
      },
      {
        id: "pizza-3",
        name: "Quattro Stagioni",
        description: "Four seasons pizza with mushrooms, artichokes, ham, and olives",
        price: 24.99,
        image: "/quattro-stagioni-pizza.png",
        category: "Pizza",
      },
      {
        id: "pizza-4",
        name: "Prosciutto e Funghi",
        description: "Prosciutto, mushrooms, mozzarella, tomato sauce",
        price: 26.99,
        image: "/prosciutto-funghi-pizza.png",
        category: "Pizza",
        popular: true,
      },
      {
        id: "pizza-5",
        name: "Diavola Pizza",
        description: "Spicy salami, mozzarella, tomato sauce, chili flakes",
        price: 23.99,
        image: "/diavola-spicy-pizza.png",
        category: "Pizza",
        spicy: true,
      },
      {
        id: "pizza-6",
        name: "Vegetarian Supreme",
        description: "Bell peppers, mushrooms, onions, olives, tomatoes, mozzarella",
        price: 22.99,
        image: "/vegetarian-supreme-pizza.png",
        category: "Pizza",
      },
      {
        id: "pizza-7",
        name: "Meat Lovers",
        description: "Pepperoni, sausage, ham, bacon, mozzarella cheese",
        price: 28.99,
        image: "/meat-lovers-pizza.png",
        category: "Pizza",
      },
      {
        id: "pizza-8",
        name: "White Pizza",
        description: "Ricotta, mozzarella, garlic, olive oil, fresh herbs",
        price: 20.99,
        image: "/white-pizza-ricotta.png",
        category: "Pizza",
      },
      {
        id: "3",
        name: "Spaghetti Carbonara",
        description: "Pasta with eggs, cheese, pancetta, and black pepper",
        price: 16.99,
        image: "/spaghetti-carbonara.png",
        category: "Pasta",
        popular: true,
      },
      {
        id: "pasta-2",
        name: "Fettuccine Alfredo",
        description: "Creamy parmesan sauce with fresh fettuccine pasta",
        price: 17.99,
        image: "/creamy-fettuccine-alfredo.png",
        category: "Pasta",
      },
      {
        id: "pasta-3",
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce with garlic, chili, and fresh basil",
        price: 15.99,
        image: "/penne-arrabbiata.png",
        category: "Pasta",
        spicy: true,
      },
      {
        id: "pasta-4",
        name: "Lasagna Bolognese",
        description: "Layers of pasta, meat sauce, bechamel, and mozzarella",
        price: 22.99,
        image: "/lasagna-bolognese-layers.png",
        category: "Pasta",
        popular: true,
      },
      {
        id: "pasta-5",
        name: "Ravioli Spinach & Ricotta",
        description: "Homemade ravioli filled with spinach and ricotta cheese",
        price: 19.99,
        image: "/spinach-ricotta-ravioli.png",
        category: "Pasta",
      },
      {
        id: "pasta-6",
        name: "Linguine alle Vongole",
        description: "Fresh clams, white wine, garlic, parsley, olive oil",
        price: 24.99,
        image: "/linguine-vongole.png",
        category: "Pasta",
      },
      {
        id: "pasta-7",
        name: "Gnocchi Gorgonzola",
        description: "Potato gnocchi in creamy gorgonzola cheese sauce",
        price: 18.99,
        image: "/creamy-gorgonzola-gnocchi.png",
        category: "Pasta",
      },
      {
        id: "pasta-8",
        name: "Spaghetti Puttanesca",
        description: "Tomatoes, olives, capers, anchovies, garlic, chili",
        price: 16.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Pasta",
        spicy: true,
      },
      {
        id: "4",
        name: "Chicken Parmigiana",
        description: "Breaded chicken breast with marinara and mozzarella",
        price: 24.99,
        image: "/chicken-parmigiana.png",
        category: "Main Course",
      },
      {
        id: "main-2",
        name: "Veal Marsala",
        description: "Tender veal in rich marsala wine sauce with mushrooms",
        price: 32.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
        popular: true,
      },
      {
        id: "main-3",
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon herb butter and vegetables",
        price: 28.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
      },
      {
        id: "main-4",
        name: "Osso Buco",
        description: "Braised veal shanks with vegetables and gremolata",
        price: 36.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
      },
      {
        id: "main-5",
        name: "Eggplant Parmigiana",
        description: "Layered eggplant with marinara, mozzarella, and parmesan",
        price: 21.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
      },
      {
        id: "main-6",
        name: "Chicken Piccata",
        description: "Pan-seared chicken in lemon caper butter sauce",
        price: 26.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
      },
      {
        id: "main-7",
        name: "Seafood Risotto",
        description: "Creamy arborio rice with mixed seafood and saffron",
        price: 29.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
        popular: true,
      },
      {
        id: "main-8",
        name: "Lamb Chops",
        description: "Herb-crusted lamb chops with rosemary jus",
        price: 34.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Main Course",
      },
      {
        id: "5",
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee and mascarpone",
        price: 8.99,
        image: "/classic-tiramisu.png",
        category: "Desserts",
      },
      {
        id: "dessert-2",
        name: "Cannoli Siciliani",
        description: "Crispy shells filled with sweet ricotta and chocolate chips",
        price: 7.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
        popular: true,
      },
      {
        id: "dessert-3",
        name: "Panna Cotta",
        description: "Silky vanilla custard with berry compote",
        price: 6.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
      },
      {
        id: "dessert-4",
        name: "Gelato Trio",
        description: "Three scoops: pistachio, stracciatella, and limoncello",
        price: 9.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
      },
      {
        id: "dessert-5",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center and vanilla gelato",
        price: 8.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
        popular: true,
      },
      {
        id: "dessert-6",
        name: "Limoncello Cake",
        description: "Light sponge cake soaked in limoncello with lemon cream",
        price: 7.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
      },
      {
        id: "dessert-7",
        name: "Affogato",
        description: "Vanilla gelato 'drowned' in hot espresso",
        price: 5.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
      },
      {
        id: "dessert-8",
        name: "Zabaglione",
        description: "Traditional Italian custard with marsala wine and berries",
        price: 8.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Desserts",
      },
      {
        id: "app-1",
        name: "Bruschetta Trio",
        description: "Three varieties: classic tomato, mushroom, and ricotta",
        price: 12.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Appetizers",
        popular: true,
      },
      {
        id: "app-2",
        name: "Antipasto Platter",
        description: "Cured meats, cheeses, olives, and marinated vegetables",
        price: 18.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Appetizers",
      },
      {
        id: "app-3",
        name: "Calamari Fritti",
        description: "Crispy fried squid rings with marinara sauce",
        price: 14.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Appetizers",
      },
      {
        id: "app-4",
        name: "Arancini",
        description: "Sicilian rice balls stuffed with mozzarella and peas",
        price: 11.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Appetizers",
      },
      {
        id: "app-5",
        name: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, basil, balsamic glaze",
        price: 13.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Appetizers",
      },
      {
        id: "app-6",
        name: "Prosciutto e Melone",
        description: "Thinly sliced prosciutto with fresh cantaloupe",
        price: 16.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Appetizers",
      },
      {
        id: "bev-1",
        name: "Italian Soda",
        description: "Sparkling water with your choice of syrup flavor",
        price: 3.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Beverages",
      },
      {
        id: "bev-2",
        name: "Espresso",
        description: "Traditional Italian espresso shot",
        price: 2.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Beverages",
        popular: true,
      },
      {
        id: "bev-3",
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam",
        price: 4.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Beverages",
      },
      {
        id: "bev-4",
        name: "Limoncello",
        description: "Traditional Italian lemon liqueur (21+)",
        price: 8.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Beverages",
      },
      {
        id: "bev-5",
        name: "Chianti Classico",
        description: "Italian red wine from Tuscany (21+)",
        price: 12.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Beverages",
      },
      {
        id: "bev-6",
        name: "San Pellegrino",
        description: "Sparkling mineral water from Italy",
        price: 3.99,
        image: "/placeholder.svg?height=200&width=300",
        category: "Beverages",
      },
    ],
  },
}

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]
  const { addItem, removeItem, getItemQuantity } = useCart()
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && restaurant?.menu.some((item) => item.category === hash)) {
      setActiveCategory(hash)
    } else {
      setActiveCategory(restaurant?.menu[0]?.category || null)
    }
  }, [restaurant])

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const categories = [...new Set(restaurant.menu.map((item) => item.category))]

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId,
      restaurantName: restaurant.name,
    })
  }

  const handleRemoveFromCart = (itemId: string) => {
    removeItem(itemId)
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <h1 className="text-xl font-bold text-primary">Delightful</h1>
            </div>
          </div>

          <CartButton />
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg opacity-90 mb-4">{restaurant.cuisine}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="opacity-75">({restaurant.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{restaurant.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeCategory || categories[0]} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-6">
                {restaurant.menu
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const quantity = getItemQuantity(item.id)
                    return (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/3 p-6">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <div className="flex space-x-2">
                                  {item.popular && <Badge variant="secondary">Popular</Badge>}
                                  {item.spicy && <Badge variant="destructive">Spicy</Badge>}
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-4">{item.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-primary">${item.price}</span>
                                <div className="flex items-center space-x-2">
                                  {quantity > 0 && (
                                    <Button variant="outline" size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                  )}
                                  {quantity > 0 && <span className="w-8 text-center font-semibold">{quantity}</span>}
                                  <Button size="sm" onClick={() => handleAddToCart(item)}>
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="md:w-1/3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
