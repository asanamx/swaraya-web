/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    /* ─────────────────────────────────────────────────────────
       v3.1 Addendum · Tema BASE (sustituye al de Tailwind)
       ───────────────────────────────────────────────────────── */

    // Sombras: eliminadas del sistema. Sólo `shadow-none` queda disponible.
    boxShadow: {
      none: 'none',
    },

    // Radios: escala completa 0 → 999px (max 12px antes del pill).
    borderRadius: {
      none: '0',
      sm:   '4px',
      md:   '6px',
      lg:   '8px',
      xl:   '12px',
      full: '999px',
    },

    // Breakpoints: alineados con los que usan los componentes.
    screens: {
      sm:   '480px',
      md:   '768px',
      lg:   '992px',
      xl:   '1280px',
      '2xl':'1440px',
    },

    extend: {
      colors: {
        // ── Design tokens v3.0/3.1 expuestos a Tailwind ─────────
        // Texto y tema admiten alfa dinámico vía rgb()/<alpha-value>.
        texto: 'rgb(var(--texto-rgb) / <alpha-value>)',
        tema:  'rgb(var(--tema-rgb)  / <alpha-value>)',
        brote:            'var(--brote)',
        'brote-alto':     'var(--brote-alto)',
        'sobre-brote':    'var(--sobre-brote)',
        'sobre-brote-hover': 'var(--sobre-brote-hover)',
        blanco:           'var(--blanco)',
        niebla:           'var(--niebla)',
        grafito:          'var(--grafito)',
        piedra:           'var(--piedra)',
        carbon:           'var(--carbon)',
        'carbon-elevado': 'var(--carbon-elevado)',
        tinta:            'var(--tinta)',
        pizarra:          'var(--pizarra)',
        'pizarra-tenue':  'var(--pizarra-tenue)',
        'piedra-tenue':     'var(--piedra-tenue)',
        'piedra-media':     'var(--piedra-media)',
        'piedra-contraste': 'var(--piedra-contraste)',
        jade:             'var(--jade)',
        'jade-tenue':     'var(--jade-tenue)',
        cinabrio:         'var(--cinabrio)',
        'cinabrio-tenue': 'var(--cinabrio-tenue)',

        // Swaraya legacy palette (algunos componentes aún la referencian).
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

        // Tokens shadcn/ui (se usan en primitives aunque no en el sitio).
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
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '-apple-system', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display':  ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
        'headline': ['3rem',   { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title':    ['2rem',   { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg':  ['1.25rem',{ lineHeight: '1.7', fontWeight: '400' }],
        'body':     ['1rem',   { lineHeight: '1.7', fontWeight: '400' }],
        'label':    ['0.75rem',{ lineHeight: '1.5', letterSpacing: '0.2em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72px':  '72px',
        '40px':  '40px',
        '20px':  '20px',
        '140px': '140px',
        '96px':  '96px',
      },
      maxWidth: {
        'container': '1440px',
        'reading':   '920px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle':  'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
