import React, { useState } from "react";
import Dashboard from "./components/Dashboard";

interface LocationCoords {
  lat: number;
  lng: number;
  zoom: number;
}

interface LocationData {
  [key: string]: LocationCoords;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  source: string;
  category: string;
  location: string;
  coords?: {
    lng: number;
    lat: number;
    zoom?: number;
  };
  pubDate: Date;
}

const HAWAII_LOCATIONS: LocationData = {
  honolulu: { lat: 21.3099, lng: -157.8581, zoom: 12 },
  waikiki: { lat: 21.2793, lng: -157.8294, zoom: 14 },
  "pearl harbor": { lat: 21.3649, lng: -157.9493, zoom: 13 },
  hilo: { lat: 19.7297, lng: -155.09, zoom: 13 },
  maui: { lat: 20.7984, lng: -156.3319, zoom: 11 },
  lahaina: { lat: 20.8783, lng: -156.6825, zoom: 14 },
  kailua: { lat: 21.4022, lng: -157.7394, zoom: 13 },
  waipahu: { lat: 21.3867, lng: -157.9995, zoom: 13 },
  mililani: { lat: 21.45, lng: -158.0167, zoom: 13 },
  oahu: { lat: 21.4389, lng: -158.0001, zoom: 10 },
  "big island": { lat: 19.5429, lng: -155.6659, zoom: 9 },
  kauai: { lat: 22.0964, lng: -159.5261, zoom: 10 },
  molokai: { lat: 21.1444, lng: -157.0226, zoom: 10 },
  lanai: { lat: 20.8283, lng: -156.9197, zoom: 11 },
  waimanalo: { lat: 21.3389, lng: -157.715, zoom: 13 },
  makapuu: { lat: 21.3092, lng: -157.6478, zoom: 14 },
  waianae: { lat: 21.4486, lng: -158.1786, zoom: 13 },
  kalihi: { lat: 21.3294, lng: -157.8694, zoom: 13 },
  ewa: { lat: 21.3358, lng: -158.0072, zoom: 12 },
  kapolei: { lat: 21.3355, lng: -158.0582, zoom: 12 },
  nimitz: { lat: 21.3169, lng: -157.8667, zoom: 13 },
  likelike: { lat: 21.3647, lng: -157.8089, zoom: 13 },
};

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Paraglider dead after crashing into East Oahu mountainside",
    description:
      "Firefighters were able to make contact with the paraglider, but described him as pulseless, apneic and unresponsive.",
    date: "Dec 9, 2025",
    source: "KHON2",
    category: "Local News",
    location: "Makapuu",
    coords: HAWAII_LOCATIONS["makapuu"],
    pubDate: new Date("2025-12-09"),
  },
  {
    id: 2,
    title: "Nonprofit pays off mortgage for family of fallen HPD officer",
    description:
      "The Tunnel to Towers Foundation paid off the mortgage of a fallen Honolulu Police Officer who died on duty in 2023.",
    date: "Dec 8, 2025",
    source: "KHON2",
    category: "Local News",
    location: "Honolulu",
    coords: HAWAII_LOCATIONS["honolulu"],
    pubDate: new Date("2025-12-08"),
  },
  {
    id: 3,
    title:
      "Hawaii reaches deadliest year on roads since 2012: Oahu hits 78th fatality",
    description:
      "With a deadly crash in Kalihi on Monday, Dec. 8, Oʻahu has now recorded 78 traffic fatalities in 2025 — part of 122 deaths statewide.",
    date: "Dec 9, 2025",
    source: "KHON2",
    category: "Traffic",
    location: "Kalihi",
    coords: HAWAII_LOCATIONS["kalihi"],
    pubDate: new Date("2025-12-09"),
  },
  {
    id: 4,
    title:
      "Waianae Police Station to begin expansion, bringing more police presence to West Side",
    description:
      "After years of discussion, construction is finally underway to improve the second floor of the Waianae Police Station.",
    date: "Dec 9, 2025",
    source: "KHON2",
    category: "Local News",
    location: "Waianae",
    coords: HAWAII_LOCATIONS["waianae"],
    pubDate: new Date("2025-12-09"),
  },
  {
    id: 5,
    title: "Two teens seriously hurt in e-bike and car crash",
    description:
      "Two teens riding tandem on an e-bike without helmets were taken to the hospital after colliding with a car near Alapoai Street.",
    date: "Dec 8, 2025",
    source: "KHON2",
    category: "Local News",
    location: "Mililani",
    coords: HAWAII_LOCATIONS["mililani"],
    pubDate: new Date("2025-12-08"),
  },
  {
    id: 6,
    title: "Alexander & Baldwin to become private company in $2.3B deal",
    description:
      "Alexander & Baldwin has agreed to go private in a $2.3 billion merger with a partnership led by Honolulu-based MW Group.",
    date: "Dec 9, 2025",
    source: "Star-Advertiser",
    category: "Business",
    location: "Honolulu",
    coords: HAWAII_LOCATIONS["honolulu"],
    pubDate: new Date("2025-12-09"),
  },
  {
    id: 7,
    title: "Man, 32, dies after being struck by car on Nimitz",
    description:
      "A 32-year-old man has died after being struck by a car this morning while crossing Nimitz Highway on foot.",
    date: "Dec 8, 2025",
    source: "Star-Advertiser",
    category: "Traffic",
    location: "Nimitz",
    coords: HAWAII_LOCATIONS["nimitz"],
    pubDate: new Date("2025-12-08"),
  },
  {
    id: 8,
    title:
      "Pearl Harbor remembrance carries on as survivors miss ceremony for first time",
    description:
      "Veterans, dignitaries and community members gathered at Pearl Harbor on Sunday to mark the 84th anniversary of the surprise attack.",
    date: "Dec 8, 2025",
    source: "Star-Advertiser",
    category: "Hawaii News",
    location: "Pearl Harbor",
    coords: HAWAII_LOCATIONS["pearl harbor"],
    pubDate: new Date("2025-12-08"),
  },
  {
    id: 9,
    title: "Hilo fire recovery dependent on lifting burdensome regulations",
    description:
      "Separate fires in Hilo claimed the lives of two people, displaced nearly three dozen other residents and razed at least five buildings.",
    date: "Dec 8, 2025",
    source: "Hawaii Reporter",
    category: "Life",
    location: "Hilo",
    coords: HAWAII_LOCATIONS["hilo"],
    pubDate: new Date("2025-12-08"),
  },
  {
    id: 10,
    title:
      "Kapolei opening night Christmas celebration with parade and tree lighting",
    description:
      "Kapolei City Lights kicked off tonight with a parade, tree lighting, and block party.",
    date: "Dec 7, 2025",
    source: "KHON2",
    category: "Local News",
    location: "Kapolei",
    coords: HAWAII_LOCATIONS["kapolei"],
    pubDate: new Date("2025-12-07"),
  },
  {
    id: 11,
    title: "3 sent to hospital after vehicle overturns on Likelike Highway",
    description:
      "Three people were sent to the hospital this afternoon after their vehicle rolled over on Likelike Highway.",
    date: "Dec 8, 2025",
    source: "Star-Advertiser",
    category: "Traffic",
    location: "Likelike",
    coords: HAWAII_LOCATIONS["likelike"],
    pubDate: new Date("2025-12-08"),
  },
  {
    id: 12,
    title: "Small victories keep Lahaina rebuild inching onward",
    description:
      "The rebuilding of Lahaina in the wake of the 2023 wildfires might not be happening fast, but there are signs that it is inching forward.",
    date: "Oct 27, 2025",
    source: "Hawaii Reporter",
    category: "Life",
    location: "Lahaina",
    coords: HAWAII_LOCATIONS["lahaina"],
    pubDate: new Date("2025-10-27"),
  },
];

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMarkerClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="App h-screen w-screen">
      <Dashboard
        articles={mockArticles}
        selectedId={selectedId}
        onMarkerClick={handleMarkerClick}
      />
    </div>
  );
}

export default App;
