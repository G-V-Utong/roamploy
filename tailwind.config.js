/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            h1: {
              fontSize: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: '2.5rem',
              fontWeight: '700',
            },
            h2: {
              fontSize: '1.875rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: '2.25rem',
              fontWeight: '600',
            },
            h3: {
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              lineHeight: '2rem',
              fontWeight: '600',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            ul: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }
          }
        }
      },
      spacing: {
        'section': '4rem',
        'card': '1.5rem',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}