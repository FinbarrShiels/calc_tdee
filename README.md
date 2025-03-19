# TDEE Calculator

A modern, responsive web application for calculating Total Daily Energy Expenditure (TDEE) and providing nutrition recommendations.

## Features

- Calculate TDEE based on age, gender, height, weight, and activity level
- Display detailed results including BMR, TDEE, and BMI
- Provide macronutrient recommendations for different diet types
- Estimate maximum muscular potential based on height and gender
- Mobile-first responsive design
- Built with modern web technologies

## Technologies Used

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (utility-first CSS framework)
- Chart.js (for data visualization)
- Shadcn UI (component library)
- Zod (form validation)
- React Hook Form (form handling)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tdee-calculator.git
cd tdee-calculator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - Reusable React components
  - `/ui` - Shadcn UI components
- `/lib` - Utility functions

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy your application

You can also deploy with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/yourusername/tdee-calculator)

### Manual Deployment

If you prefer to deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

No additional configuration is needed as this project is optimized for Vercel deployment.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
