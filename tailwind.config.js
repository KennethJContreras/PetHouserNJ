module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#111827', 
          DEFAULT: '#111827', // azul
          dark: '#4c1d95', 
        },
        secondary: {
          light: '#d2f54c', 
          DEFAULT: '#C9FD02', // amarillo
          dark: '#134e4a', 
        },
        customColor: '#f97316', // Ejemplo: Color naranja personalizado
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
