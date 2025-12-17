# Hawaii News Dashboard

A modern, interactive news aggregation dashboard featuring real-time Hawaii news stories displayed on an integrated map interface. Built with React and inspired by Shadcn/UI design principles.

## 🎯 Project Overview

This dashboard provides a centralized view of Hawaii news from multiple RSS sources, allowing users to:
- Browse local news stories in a clean, organized interface
- Visualize news locations on an interactive map
- Filter content by date, source, and keywords
- Quickly identify where news events are happening across the islands

## 🌟 Features

### Two-Column Layout
- **Left Sidebar (30-35% width)**
  - Scrollable news article list
  - Real-time search functionality
  - Multi-level filtering system
  - Article count indicator
  - Selected article highlighting

- **Right Map Panel (65-70% width)**
  - Geographic visualization of news locations
  - Interactive location markers
  - Click-to-select functionality
  - Auto-centering on selected articles
  - Hover tooltips with article previews

### Data Sources

The dashboard aggregates news from three primary Hawaii news outlets:

1. **KHON2 News** - `https://www.khon2.com/feed/`
   - Local breaking news
   - Traffic updates
   - Community stories

2. **Hawaii Reporter** - `https://www.hawaiireporter.com/feed/`
   - Independent journalism
   - Commentary and analysis
   - Local politics and policy

3. **Honolulu Star-Advertiser** - `https://www.staradvertiser.com/feed/`
   - Hawaii's largest daily newspaper
   - Comprehensive local coverage
   - Business and sports news

### Filtering Capabilities

**Date Filters:**
- All Time
- Today only
- Last 24 hours
- Last 7 days

**Source Filters:**
- All sources combined
- Individual source selection (KHON2, Star-Advertiser, Hawaii Reporter)

**Keyword Search:**
- Real-time text search
- Searches titles, descriptions, and locations
- Case-insensitive matching

### Geographic Coverage

The dashboard includes geocoded coordinates for major Hawaii locations:

**Oahu:**
- Honolulu, Waikiki, Pearl Harbor
- Kailua, Waipahu, Mililani, Kapolei
- Waianae, Kalihi, Ewa, Waimanalo
- Makapuu, Nimitz, Likelike

**Neighbor Islands:**
- Maui (including Lahaina)
- Big Island (including Hilo)
- Kauai, Molokai, Lanai

## 🛠️ Technical Implementation

### Technology Stack
- **React** - Component-based UI framework
- **Lucide React** - Modern icon library
- **Custom CSS** - Shadcn-inspired styling
- **JavaScript ES6+** - Modern language features

### Key Components

**NewsCard**
- Displays individual article information
- Handles selection states
- Shows metadata (date, location, source)
- Provides click interaction

**MapMarker**
- Renders location pins on the map
- Manages hover and selection states
- Displays popup tooltips
- Handles marker clustering visually

**SimpleMap**
- Coordinate-based positioning system
- Dynamic marker rendering
- Auto-centering on selection
- Responsive layout

**HawaiiNewsDashboard** (Main Component)
- State management for articles and filters
- RSS feed parsing logic
- Filter algorithm implementation
- Bidirectional article-map interaction

### Location Extraction & Geocoding

The system uses lightweight NLP to:
1. Parse article titles and descriptions
2. Identify location mentions (city names, landmarks, highways)
3. Match locations to predefined coordinate database
4. Assign latitude/longitude for map placement

## 📊 Data Structure

Each article object contains:
```javascript
{
  id: number,              // Unique identifier
  title: string,           // Article headline
  description: string,     // Article excerpt/summary
  date: string,           // Human-readable date
  source: string,         // Publication source
  category: string,       // Content category
  location: string,       // Extracted location name
  coords: {               // Geographic coordinates
    lat: number,
    lng: number,
    zoom: number
  },
  pubDate: Date           // ISO date for filtering
}
```

## 🎨 Design Philosophy

### Shadcn/UI Inspiration
- Clean, minimal interface
- Consistent spacing and typography
- Subtle shadows and borders
- Smooth transitions and interactions
- Professional color palette (grays, blues)

### User Experience Principles
- **Progressive Disclosure**: Show essential info, hide details until needed
- **Immediate Feedback**: Visual responses to all interactions
- **Spatial Awareness**: Map location reinforces geographic context
- **Clear Hierarchy**: Important information stands out
- **Efficient Filtering**: Quick access to relevant content

## 🚀 Usage Patterns

### Basic Navigation
1. **Browse Articles**: Scroll through the sidebar list
2. **Select Article**: Click any card to highlight and center on map
3. **Explore Map**: Click markers to select corresponding articles
4. **Apply Filters**: Use dropdowns and search to narrow results
5. **Clear Filters**: Reset to view all articles

### Advanced Workflows
- **Location-based Research**: Click map markers to discover local news
- **Topic Tracking**: Use search to follow specific stories or keywords
- **Source Comparison**: Filter by source to compare coverage
- **Timeline Analysis**: Use date filters to track story development

## 📈 Future Enhancements

### Potential Improvements
- [ ] Live RSS feed integration
- [ ] Real-time updates with WebSocket
- [ ] Enhanced geocoding with external APIs
- [ ] Marker clustering for dense areas
- [ ] Save favorite articles
- [ ] Share article links
- [ ] Dark mode support
- [ ] Mobile responsive design
- [ ] Custom date range picker
- [ ] Export filtered results
- [ ] Article read tracking
- [ ] Push notifications for breaking news

### Scalability Considerations
- API rate limiting for RSS feeds
- Caching layer for geocoding results
- Database integration for article persistence
- User authentication for personalization
- Analytics tracking
- Performance optimization for large datasets

## 🔧 Implementation Notes

### RSS Parsing Strategy
Currently uses mock data derived from actual RSS feed content. Production implementation would:
1. Fetch RSS feeds server-side or via proxy
2. Parse XML using library (e.g., fast-xml-parser)
3. Extract metadata and content
4. Apply NLP for location extraction
5. Cache results with expiration

### Geocoding Approach
The current implementation uses a predefined location dictionary. Enhanced versions could:
- Integrate Google Maps Geocoding API
- Use OpenStreetMap Nominatim
- Implement fuzzy matching for location names
- Handle multiple locations per article
- Support address-level precision

### Performance Optimization
- Memoization of filtered results
- Virtual scrolling for large article lists
- Lazy loading of map markers
- Debounced search input
- Efficient re-render strategies

## 🤝 Contributing

This dashboard serves as a foundation for Hawaii news aggregation and visualization. Key areas for contribution:
- Enhanced location extraction algorithms
- Additional RSS feed sources
- Improved UI/UX features
- Mobile optimization
- Accessibility improvements

## 📝 License

This project demonstrates news aggregation and visualization techniques for educational and informational purposes.

## 🙏 Acknowledgments

- **News Sources**: KHON2, Hawaii Reporter, Honolulu Star-Advertiser
- **Design Inspiration**: Shadcn/UI component library
- **Icon Library**: Lucide React
- **Development**: Built with React and modern web technologies

---

**Note**: This dashboard uses sample data for demonstration. Production deployment requires proper RSS feed integration, geocoding services, and consideration of API rate limits and terms of service.