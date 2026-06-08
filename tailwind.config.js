/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Swaraya custom palette
        swaraya: {
          'depth-1': '#06070A',
          'depth-2': '#0C1016',
          'depth-3': '#121722',
          'text-primary': '#F3F5F8',
          'text-secondary': '#B7BFCC',
          'text-tertiary': '#8E97A6',
          'accent-green': '#00A87E',
          'accent-blue': '#5C7CFA',
          'accent-cyan': '#8EDCF8',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
        'headline': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.2em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72px': '72px',
        '40px': '40px',
        '20px': '20px',
        '140px': '140px',
        '96px': '96px',
      },
      maxWidth: {
        'container': '1440px',
        'reading': '920px',
      },
      borderRadius: {
        'card': '24px',
        'panel': '32px',
        'pill': '999px',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        'glow-blue': '0 0 120px -20px rgba(92, 124, 250, 0.15)',
        'glow-green': '0 0 120px -20px rgba(0, 168, 126, 0.15)',
        'glow-cyan': '0 0 80px -15px rgba(142, 220, 248, 0.1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
