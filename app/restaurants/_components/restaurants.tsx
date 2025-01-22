"use client";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Restaurant } from "@prisma/client";
import { useSearchParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { searchForRestaurants } from "../_actions/search";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) {
        return;
      }
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <RestaurantItem
                restaurant={restaurant}
                className="min-w-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
