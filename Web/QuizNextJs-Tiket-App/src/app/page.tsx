"use client";

import HeroSection from "./components/HeroSection";
import Filters from "./components/Filters";
import TicketList from "./components/TicketList";
import PopularCategories from "./components/PopularCategories";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <HeroSection />
      <PopularCategories />
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <TicketList searchQuery={searchQuery} selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
}
