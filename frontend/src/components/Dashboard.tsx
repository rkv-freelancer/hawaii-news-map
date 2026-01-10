import React, { useRef, useEffect, useState, useMemo } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {
  Layers,
  Navigation2,
  Search,
  Filter,
  MapPin,
  Calendar,
} from "lucide-react";

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

export interface DashboardProps {
  articles: Article[];
  selectedId: number | null;
  onMarkerClick: (id: number) => void;
}

interface NewsCardProps {
  article: Article;
  isSelected: boolean;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isSelected,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`p-4 mb-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
      isSelected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 bg-white hover:border-gray-300"
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {article.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          {article.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {article.location}
            </span>
          )}
          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
            {article.source}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default function Dashboard({
  articles,
  selectedId,
  onMarkerClick,
}: DashboardProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markers = useRef<maptilersdk.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  // TODO: To be removed - move to environment variable
  maptilersdk.config.apiKey = "";

  const hawaii = { lng: -157.8, lat: 21.3 };
  const zoom = 8.5;

  // Initialize map
  useEffect(() => {
    // stops map from initializing more than once
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Hawaii
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [hawaii.lng, hawaii.lat],
      zoom: zoom,
      pitch: 0,
      bearing: 0,
    });

    // Add navigation controls
    map.current.addControl(new maptilersdk.NavigationControl(), "top-right");

    // Add scale control
    map.current.addControl(new maptilersdk.ScaleControl(), "bottom-left");

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when articles or selection changes
  // Update markers when articles or selection changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const markersMap = new Map(
      markers.current.map((m) => [(m as any).articleId, m])
    );

    const articlesWithCoords = articles.filter((a) => a.coords);

    // Remove markers for articles that no longer exist
    markers.current.forEach((marker) => {
      const articleId = (marker as any).articleId;
      if (!articlesWithCoords.find((a) => a.id === articleId)) {
        marker.remove();
        markersMap.delete(articleId);
      }
    });

    articlesWithCoords.forEach((article) => {
      const isSelected = selectedId === article.id;
      const existingMarker = markersMap.get(article.id);

      if (existingMarker) {
        // Update existing marker's appearance
        const el = existingMarker.getElement();
        const innerDot = el.querySelector("div") as HTMLDivElement;

        el.style.width = isSelected ? "32px" : "24px";
        el.style.height = isSelected ? "32px" : "24px";
        el.style.backgroundColor = isSelected ? "#2563eb" : "#ef4444";

        if (innerDot) {
          innerDot.style.width = isSelected ? "10px" : "8px";
          innerDot.style.height = isSelected ? "10px" : "8px";
        }

        // Update popup visibility
        const popup = existingMarker.getPopup();
        if (isSelected) {
          popup.addTo(map.current!);
        } else {
          popup.remove();
        }
      } else {
        // Create new marker (same code as before)
        const el = document.createElement("div");
        el.style.cssText = `
                width: ${isSelected ? "32px" : "24px"};
                height: ${isSelected ? "32px" : "24px"};
                background-color: ${isSelected ? "#2563eb" : "#ef4444"};
                border: 3px solid white;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
              `;

        const innerDot = document.createElement("div");
        innerDot.style.cssText = `
                width: ${isSelected ? "10px" : "8px"};
                height: ${isSelected ? "10px" : "8px"};
                background-color: white;
                border-radius: 50%;
              `;
        el.appendChild(innerDot);

        const popup = new maptilersdk.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
          maxWidth: "300px",
        }).setHTML(`
                <div style="padding: 8px;">
                  <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px; color: #1f2937;">
                    ${article.title}
                  </div>
                  <div style="font-size: 11px; color: #6b7280; margin-bottom: 6px; line-height: 1.4;">
                    ${article.description.substring(0, 100)}${
          article.description.length > 100 ? "..." : ""
        }
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #9ca3af;">
                    <span style="font-weight: 500;">${article.source}</span>
                    <span>${article.date}</span>
                  </div>
                </div>
              `);

        const marker = new maptilersdk.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([article.coords!.lng, article.coords!.lat])
          .setPopup(popup)
          .addTo(map.current!);

        // Store article ID on marker for tracking
        (marker as any).articleId = article.id;

        // Add click event listener - THIS IS CRITICAL
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onMarkerClick(article.id);
        });

        // Add hover listeners for popup
        if (!isSelected) {
          el.addEventListener("mouseenter", () => {
            popup.addTo(map.current!);
          });
          el.addEventListener("mouseleave", () => {
            popup.remove();
          });
        } else {
          popup.addTo(map.current!);
        }

        markersMap.set(article.id, marker);
      }
    });

    markers.current = Array.from(markersMap.values());
  }, [articles, selectedId, mapLoaded, onMarkerClick]);

  // Fly to selected article
  useEffect(() => {
    if (!map.current || !selectedId || !mapLoaded) return;

    const selected = articles.find((a) => a.id === selectedId);
    if (selected?.coords) {
      map.current.flyTo({
        center: [selected.coords.lng, selected.coords.lat],
        zoom: selected.coords.zoom || 13,
        duration: 1500,
        essential: true,
      });
    }
  }, [selectedId, articles, mapLoaded]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Date filter
    if (dateFilter !== "all") {
      const filterDate = new Date();

      if (dateFilter === "today") {
        filterDate.setHours(0, 0, 0, 0);
        filtered = filtered.filter((a) => a.pubDate >= filterDate);
      } else if (dateFilter === "24h") {
        filterDate.setHours(filterDate.getHours() - 24);
        filtered = filtered.filter((a) => a.pubDate >= filterDate);
      } else if (dateFilter === "7d") {
        filterDate.setDate(filterDate.getDate() - 7);
        filtered = filtered.filter((a) => a.pubDate >= filterDate);
      }
    }

    // Source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter((a) => a.source === sourceFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          (a.location && a.location.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [articles, dateFilter, sourceFilter, searchQuery]);

  const handleArticleClick = (id: number) => {
    onMarkerClick(id);
    // Scroll to article in sidebar
    const element = document.getElementById(`article-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const sources = useMemo(
    () => ["all", ...new Set(articles.map((a) => a.source))],
    [articles]
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Hawaii News</h1>
          <p className="text-sm text-gray-500">Real-time local news coverage</p>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="24h">Last 24h</option>
              <option value="7d">Last 7 Days</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source === "all" ? "All Sources" : source}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>{filteredArticles.length} articles</span>
            {(dateFilter !== "all" ||
              sourceFilter !== "all" ||
              searchQuery) && (
              <button
                onClick={() => {
                  setDateFilter("all");
                  setSourceFilter("all");
                  setSearchQuery("");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Articles List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Filter className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No articles found</p>
              <p className="text-xs mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div key={article.id} id={`article-${article.id}`}>
                <NewsCard
                  article={article}
                  isSelected={selectedId === article.id}
                  onClick={() => handleArticleClick(article.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative h-full">
        <div ref={mapContainer} className="absolute inset-0" />

        {/* Info overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 text-xs text-gray-700 z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">
              {filteredArticles.filter((a) => a.coords).length} locations
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-12 left-4 bg-white rounded-lg shadow-lg px-3 py-2 text-xs z-10 pointer-events-none">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow"></div>
              <span className="text-gray-700">News Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
              <span className="text-gray-700">Selected</span>
            </div>
          </div>
        </div>

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Navigation2 className="w-12 h-12 mx-auto mb-3 text-blue-600 animate-pulse" />
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
