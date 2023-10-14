/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'default-bg': '#f7f7f5',
      'forest': {
        50: '#dfe8da',
        100: '#ccd9c5',
        200: '#afbda8',
        300: '#93a18c',
        500: '#6d7a66',
        600: '#606e59',
        DEFAULT: '#45523e',
        900: '#32402b'
      },
      'cloud': {
        50: '#dedad1',
        100: '#ccc8be',
        DEFAULT: '#b0aca2',
        300: '#a8a497',
        400: '#969286',
        500: '#827e71',
        600: '#7d786a',
        800: '#666051',
        900: '#4f493b'
      },
      'bluegray': {
        50: '#c8e1e3',
        100: '#b6d2d4',
        200: '#a9c7c9',
        300: '#98b6b8',
        400: '#88a6a8',
        DEFAULT: '#7A989B',
        500: '#6d8c8f',
        600: '#5c7a7d',
        700: '#4f6d70',
        800: '#415e61',
        900: '#2f474a'
      },
      'gunmetal': {
        50: '#c2c7d1',
        100: '#a0a5b0',
        200: '#8e939e',
        300: '#7b7f8a',
        400: '#60646e',
        500: '#565a63',
        600: '494d57',
        700: '#3d414a',
        DEFAULT: '#2F323A',
        900: '#23262E'
      },
      'tan': {
        50: '#f0e7df',
        100: '#ebe0d5',
        200: '#e0cdbc',
        300: '#dbc4af',
        400: '#d6bca3',
        500: '#c7a98d',
        600: '#bfa082',
        700: '#b59576',
        800: '#ab8b6c',
        900: '#a38160'
      },
      'merino': {
        DEFAULT: '#f5ece5'
      },
      slate: colors.slate,
      gray: colors.gray,
      black: colors.black
    },
    fontFamily: {
      'sans': ['Josefin Sans', 'sans'],
      'cardo': ['Cardo', 'sans-serif'],
      'mono': ['mono']
    },
    extend: {},
  },
  plugins: [],
}

