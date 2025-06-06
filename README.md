# Strategic Hunting Draw Calculator - Next.js Edition

A modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS that helps hunters strategically plan their hunting applications to maximize their chances of drawing premium tags across multiple states.

## 🎯 Features

### ✨ Modern Technology Stack
- **Next.js 15** with App Router for optimal performance and SEO
- **TypeScript** for type safety and better development experience  
- **Tailwind CSS** for responsive, modern styling
- **React 19** with hooks for state management
- **Custom components** and reusable design system

### 🦌 Core Functionality

#### Draw Odds Calculator
- **Multi-State Support**: Calculate odds for Utah, Colorado, Wyoming, Montana, and more
- **Species Coverage**: Elk, deer, moose, bighorn sheep, mountain goat, antelope, bear
- **Hunt Type Analysis**: Archery, muzzleloader, rifle seasons, and state-specific variations
- **Point-Based Calculations**: Historical odds analysis based on preference point levels
- **Interactive Charts**: Visual representation of odds by point level
- **Smart Recommendations**: Context-aware suggestions based on your point levels

#### Strategic Opportunity Finder
- **Multi-Criteria Filtering**: Filter by species, states, hunt types, point levels, and minimum odds
- **Strategy Types**: 
  - **Conservative**: High-odds opportunities (70%+ draw odds)
  - **Balanced**: Mix of opportunities (30%+ draw odds)
  - **Aggressive**: Premium units and trophy opportunities
  - **Points Builder**: Strategic point accumulation
- **Comparative Analysis**: Side-by-side comparison of hunting opportunities
- **Success Probability**: Calculate combined odds for multiple applications

#### Multi-Year Planning Tools
- **Point Accumulation Tracker**: Track preference points across states and species
- **Application Timeline**: Calendar view of deadlines and hunt seasons
- **Long-term Strategy**: Multi-year planning for premium opportunities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hunting-draw-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
hunting-draw-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles with Tailwind
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Main application page
│   ├── components/             # Reusable React components (future)
│   ├── hooks/                  # Custom React hooks
│   │   └── useHuntingCalculator.ts
│   ├── lib/                    # Utility functions and data
│   │   ├── dataUtils.ts        # Data manipulation utilities
│   │   └── huntingData.ts      # Hunting database
│   └── types/                  # TypeScript type definitions
│       └── hunting.ts          # Application types
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Hunting greens and earth tones
- **Accent**: Amber/orange for call-to-action elements
- **Neutral**: Stone grays for text and backgrounds
- **Success/Warning/Error**: Semantic colors for alerts and status

### Components
- **Hunting Cards**: Elevated white cards with subtle shadows
- **Form Inputs**: Custom styled with focus states
- **Buttons**: Gradient primary buttons with hover effects
- **Alerts**: Color-coded notification system
- **Charts**: Custom bar charts for odds visualization

## 🧩 Architecture

### Component Structure
- **Main Page**: Single-page application with tabbed interface
- **Custom Hook**: `useHuntingCalculator` manages all state and logic
- **Data Layer**: TypeScript interfaces with utility functions
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### State Management
- **React Hooks**: useState, useCallback, useMemo for local state
- **Form State**: Controlled components with validation
- **Calculated Results**: Cached results with recommendations
- **Error Handling**: User-friendly error messages and validation

### Data Flow
1. User inputs form data
2. Custom hook validates and processes data
3. DataUtils performs calculations using historical data
4. Results displayed with charts and recommendations
5. Strategic opportunities filtered and ranked

## 📊 Data Sources

### Current Coverage
- **Utah**: Comprehensive data for all major species and units
- **Colorado**: Premium units and general hunting areas  
- **Wyoming**: Limited entry and general seasons
- **Montana**: Special draw hunts and general seasons

### Data Structure
```typescript
interface HuntingData {
  states: Record<string, StateData>;
  drawOdds: Record<string, DrawOddsData>;
  huntStats: Record<string, HuntStats>;
  applicationInfo: Record<string, ApplicationInfo>;
}
```

### Adding New Data
1. Update `huntingData.ts` with new state/species/unit information
2. Add draw odds data with point-level breakdowns
3. Include hunt statistics (tags, applicants, trends)
4. Test calculations with new data

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### TypeScript
- Strict type checking enabled
- Custom interfaces for all hunting data
- Type-safe form handling and data manipulation
- Comprehensive error handling

### Styling
- **Tailwind CSS 4**: Latest version with new features
- **Custom Components**: Hunting-themed design system
- **Responsive Design**: Mobile-first breakpoints
- **Dark Mode Ready**: Structure supports future dark mode

### Performance
- **Next.js Optimizations**: App router with built-in optimizations
- **Client-Side Calculations**: Fast, responsive calculations
- **Efficient Data Structures**: Optimized lookup and filtering
- **Lazy Loading**: Results and charts load on demand

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify**: Deploy from Git repository
- **AWS Amplify**: Full-stack deployment
- **GitHub Pages**: Static export with `next export`

### Environment Variables
No environment variables required for basic functionality. All data is included in the build.

## 🧪 Testing Recommendations

### Test Cases to Implement
1. **Unit Tests**: DataUtils functions and calculations
2. **Integration Tests**: Form submission and state updates
3. **E2E Tests**: Complete user workflows
4. **Performance Tests**: Large dataset handling

### Suggested Testing Stack
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress/Playwright**: End-to-end testing
- **React Hook Testing Library**: Custom hook testing

## 🔮 Future Enhancements

### Short Term
- **Component Separation**: Break main page into smaller components
- **Loading States**: Skeleton loading for better UX
- **Form Validation**: Enhanced client-side validation
- **Mobile Optimization**: Touch-friendly interactions

### Medium Term
- **User Accounts**: Save preferences and tracking
- **Interactive Maps**: Visual unit selection
- **Advanced Filtering**: More granular search options
- **Data Export**: PDF reports and CSV exports

### Long Term
- **Real-time Data**: Integration with state wildlife agencies
- **Machine Learning**: Predictive analytics for odds
- **Social Features**: Community hunting strategies
- **Mobile App**: React Native version

## 📈 Performance Characteristics

### Build Stats
- **Bundle Size**: Optimized for fast loading
- **Core Web Vitals**: Excellent Lighthouse scores
- **JavaScript**: Modern ES modules with tree shaking
- **CSS**: Purged Tailwind for minimal stylesheet

### Runtime Performance
- **Calculations**: Sub-millisecond response times
- **Memory Usage**: Efficient data structures
- **Rendering**: React 19 optimizations
- **Caching**: Built-in Next.js optimizations

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages

### Data Contributions
- Verify accuracy with official sources
- Include data sources and methodology
- Follow existing data structure patterns
- Test calculations with sample data

## ⚖️ Legal and Disclaimers

### Important Notes
- **Educational Purpose**: Tool for planning and education only
- **Verify Official Sources**: Always confirm with state agencies
- **No Guarantees**: Historical data doesn't guarantee future results
- **Regulation Changes**: Hunting laws can change affecting odds

### Data Sources
- State wildlife agency draw results (2019-2024)
- Historical application and harvest statistics
- Public hunting regulation documents
- Hunter survey data and success reports

## 📞 Support

### Getting Help
- Check this README for common questions
- Review TypeScript interfaces in `/src/types/`
- Test with working examples (Utah elk hunts)
- Check browser console for detailed error messages

### Reporting Issues
- Provide specific hunt combination causing issues
- Include browser and device information
- Describe expected vs. actual behavior
- Check for TypeScript errors in console

## 📋 Version History

### v2.0.0 - Next.js Edition (Current)
- ✅ Complete rewrite in Next.js with TypeScript
- ✅ Modern component architecture with React hooks
- ✅ Tailwind CSS design system
- ✅ Enhanced mobile responsiveness
- ✅ Improved performance and SEO
- ✅ Type-safe data handling
- ✅ Comprehensive error handling

### Previous Versions
- **v1.0**: Original vanilla HTML/JS/CSS implementation

---

**Happy Strategic Hunting!** 🦌

*Built with ❤️ for the hunting community. This modern Next.js application provides the tools you need to make informed decisions about your hunting applications and maximize your success in the field.*
# Last updated: Fri Jun  6 14:14:09 MDT 2025
