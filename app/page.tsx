import { Clock, Star, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CartButton } from "@/components/cart-button"
import { LocationButton } from "@/components/location-button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Delightful</h1>
          </Link>

          <div className="flex items-center space-x-4">
            <LocationButton />
            <CartButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Delicious Food
            <br />
            <span className="text-primary">Delivered Fast</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Craving something amazing? Browse thousands of restaurants and get your favorite meals delivered in minutes.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search for restaurants or dishes..." className="pl-10 h-12 text-lg" />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Average delivery: 25-30 mins</span>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              {
                name: "Pizza",
                image: "/delicious-pizza-slice.png",
                color: "bg-red-100",
                href: "/restaurant/marios-italian#Pizza",
              },
              {
                name: "Burgers",
                image: "/juicy-burger.png",
                color: "bg-yellow-100",
                href: "/restaurant/marios-italian#Main Course",
              },
              {
                name: "Sushi",
                image: "/fresh-sushi-rolls.png",
                color: "bg-green-100",
                href: "/restaurant/marios-italian#Appetizers",
              },
              {
                name: "Desserts",
                image: "/sweet-dessert.png",
                color: "bg-pink-100",
                href: "/restaurant/marios-italian#Desserts",
              },
              {
                name: "Pasta",
                image: "/creamy-fettuccine-alfredo.png",
                color: "bg-yellow-100",
                href: "/restaurant/marios-italian#Pasta",
              },
              {
                name: "Curries",
                image: "/butter-chicken-creamy.png",
                color: "bg-orange-100",
                href: "/restaurant/spice-garden#Curries",
              },
              {
                name: "Ramen",
                image: "/tonkotsu-ramen-rich.png",
                color: "bg-blue-100",
                href: "/restaurant/fresh-sushi#Ramen",
              },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-3 rounded-full ${category.color} flex items-center justify-center`}
                    >
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </div>
                    <h4 className="font-semibold">{category.name}</h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Featured Restaurants</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "marios-italian",
                name: "Mario's Italian Kitchen",
                cuisine: "Italian",
                rating: 4.8,
                deliveryTime: "25-35 min",
                image: "/italian-restaurant-interior.png",
                promo: "Free delivery",
              },
              {
                id: "spice-garden",
                name: "Spice Garden",
                cuisine: "Indian",
                rating: 4.6,
                deliveryTime: "30-40 min",
                image: "/indian-spices-curry.png",
                promo: "20% off",
              },
              {
                id: "fresh-sushi",
                name: "Fresh Sushi Co.",
                cuisine: "Japanese",
                rating: 4.9,
                deliveryTime: "20-30 min",
                image: "/fresh-sushi-restaurant.png",
                promo: "Buy 2 Get 1",
              },
            ].map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">{restaurant.promo}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg mb-1">{restaurant.name}</h4>
                    <p className="text-muted-foreground mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-primary">Delightful</span>
          </div>
          <p className="text-muted-foreground">Bringing delicious food to your doorstep since 2024</p>
        </div>
      </footer>
    </div>
  )
}
