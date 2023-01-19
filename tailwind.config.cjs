/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const forms = require('@tailwindcss/forms');

//	Configuration
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      // Used to include classes which are defined in the components and not present in the templates initially
      // as they will not be compiled otherwise
      pattern: /-?([whpm]|[mp][xytblr])-.*/,
    },
  ],
  theme: {
    screens: {
      sm: '480px',
      // => @media (min-width: 640px) { ... }

      md: '1024px',
      // => @media (min-width: 768px) { ... }

      lg: '1440px',
      // => @media (min-width: 1024px) { ... }

      xl: '1921px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '2560px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',

      // background
      background: 'var(--color-background)',
      'on-background': 'var(--color-on-background)',
      'on-background-alternate': 'var(--color-on-background-alternate)',
      'on-background-decoration': 'var(--color-on-background-decoration)',
      'on-background-link': 'var(--color-on-background-link)',
      'on-background-link-hover': 'var(--color-on-background-link-hover)',

      //	Decoration
      decoration: 'var(--color-on-background-decoration)',

      // primary
      primary: 'var(--color-primary)',
      'primary-hover': 'var(--color-primary-hover)',
      'primary-active': 'var(--color-primary-active)',
      'on-primary': 'var(--color-on-primary)',
      'on-primary-alternate': 'var(--color-on-primary-alternate)',
      'on-primary-decoration': 'var(--color-on-primary-decoration)',
      'on-primary-link': 'var(--color-on-primary-link)',
      'on-primary-link-hover': 'var(--color-on-primary-link-hover)',

      // secondary
      secondary: 'var(--color-secondary)',
      'secondary-hover': 'var(--color-secondary-hover)',
      'secondary-active': 'var(--color-secondary-active)',
      'on-secondary': 'var(--color-on-secondary)',
      'on-secondary-alternate': 'var(--color-on-secondary-alternate)',
      'on-secondary-decoration': 'var(--color-on-secondary-decoration)',
      'on-secondary-link': 'var(--color-on-secondary-link)',
      'on-secondary-link-hover': 'var(--color-on-secondary-link-hover)',

      // surface
      surface: 'var(--color-surface)',
      'surface-active': 'var(--color-surface-active)',
      'on-surface': 'var(--color-on-surface)',
      'on-surface-alternate': 'var(--color-on-surface-alternate)',
      'on-surface-decoration': 'var(--color-on-surface-decoration)',
      'on-surface-link': 'var(--color-on-surface-link)',
      'on-surface-link-hover': 'var(--color-on-surface-link-hover)',

      // information
      information: 'var(--color-information)',
      'on-information': 'var(--color-on-information)',
      'on-information-alternate': 'var(--color-on-information-alternate)',
      'on-information-decoration': 'var(--color-on-information-decoration)',
      'on-information-link': 'var(--color-on-information-link)',
      'on-information-link-hover': 'var(--color-on-information-link-hover)',

      // success
      success: 'var(--color-success)',
      'on-success': 'var(--color-on-success)',
      'on-success-alternate': 'var(--color-on-success-alternate)',
      'on-success-decoration': 'var(--color-on-success-decoration)',
      'on-success-link': 'var(--color-on-success-link)',
      'on-success-link-hover': 'var(--color-on-success-link-hover)',

      // warning
      warning: 'var(--color-warning)',
      'on-warning': 'var(--color-on-warning)',
      'on-warning-alternate': 'var(--color-on-warning-alternate)',
      'on-warning-decoration': 'var(--color-on-warning-decoration)',
      'on-warning-link': 'var(--color-on-warning-link)',
      'on-warning-link-hover': 'var(--color-on-warning-link-hover)',

      // error
      error: 'var(--color-error)',
      'on-error': 'var(--color-on-error)',
      'on-error-alternate': 'var(--color-on-error-alternate)',
      'on-error-decoration': 'var(--color-on-error-decoration)',
      'on-error-link': 'var(--color-on-error-link)',
      'on-error-link-hover': 'var(--color-on-error-link-hover)',

      // notice
      notice: 'var(--color-notice)',
      'on-notice': 'var(--color-on-notice)',
      'on-notice-alternate': 'var(--color-on-notice-alternate)',
      'on-notice-decoration': 'var(--color-on-notice-decoration)',
      'on-notice-link': 'var(--color-on-notice-link)',
      'on-notice-link-hover': 'var(--color-on-notice-link-hover)',

      // danger
      danger: 'var(--color-danger)',
      'danger-hover': 'var(--color-danger-hover)',
      'danger-active': 'var(--color-danger-active)',
      'on-danger': 'var(--color-on-danger)',
      'on-danger-alternate': 'var(--color-on-danger-alternate)',
      'on-danger-decoration': 'var(--color-on-danger-decoration)',
      'on-danger-link': 'var(--color-on-danger-link)',
      'on-danger-link-hover': 'var(--color-on-danger-link-hover)',

      // inactive
      inactive: 'var(--color-inactive)',
      'on-inactive': 'var(--color-on-inactive)',

      // shadow
      shadow: 'var(--color-shadow)',
      'shadow-variant': 'var(--color-shadow-variant)',

      // chart
      'chart-1': 'var(--color-chart-1)',
      'chart-2': 'var(--color-chart-2)',
      'chart-3': 'var(--color-chart-3)',
      'chart-4': 'var(--color-chart-4)',
      'chart-5': 'var(--color-chart-5)',
      'chart-6': 'var(--color-chart-6)',
      'chart-7': 'var(--color-chart-7)',
      'chart-8': 'var(--color-chart-8)',
      'chart-9': 'var(--color-chart-9)',

      'brand-primary': 'var(--color-brand-primary)',
      'brand-secondary': 'var(--color-brand-secondary)',
      'brand-tertiary': 'var(--color-brand-tertiary)',
      'appbar-bg': 'var(--color-appbar-bg)',
      'panel-queue': 'var(--color-panel-queue)',
      'panel-queue-highlight': 'var(--color-panel-queue-highlight)',
    },
    fontFamily: {
      primary: ['Roboto', 'sans-serif'],
      secondary: ['PT Sans', 'sans-serif'],
    },
    extend: {
      fontSize: {
        xxs: '0.688rem',
      },
      spacing: {
        9: '2.25rem',
        125: '31.25rem',
        gutter: '2rem',
        'gutter-sm': '1.5rem',
        'gutter-lg': '2.5rem',
        'gutter-2x': '4rem',
      },
      flexBasis: {
        'gr-1': `${(1 / 1.618) * 100}%`,
        'gr-2': `${(1 - 1 / 1.618) * 100}%`,
      },
    },
  },
  plugins: [
    forms,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.debug': {
          border: '6px solid rgb(174, 121, 15) !important',
          '& > *': {
            border: '4px dashed rgb(0, 151, 167) !important',
          },
        },
      });
    }),
    plugin(({ addBase, theme }) => {
      addBase({
        p: { fontSize: theme('fontSize.sm'), fontWeight: theme('fontWeight.normal') },
        h1: { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.normal') },
        h2: { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.semibold') },
        h3: { fontSize: theme('fontSize.base'), fontWeight: theme('fontWeight.bold') },
        h4: { fontSize: theme('fontSize.sm'), fontWeight: theme('fontWeight.semibold') },
        h5: { fontSize: theme('fontSize.xs'), fontWeight: theme('fontWeight.semibold') },
      });
    }),
  ],
};
