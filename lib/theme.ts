'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#A51C30', // Harvard Crimson
        },
        secondary: {
            main: '#0579B8', // Harvard Blue
        },
        error: {
            main: '#EB001B', // Harvard Red
        },
        warning: {
            main: '#F8C21C', // Harvard Yellow
        },
        info: {
            main: '#3E6F7D', // Harvard Slate
        },
    },
    typography: {
        fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
        h1: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        h2: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        h3: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        h4: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
        },
        h5: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 600,
        },
        button: {
            fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
        },
        body1: {
            fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
        },
        body2: {
            fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'var(--font-trueno), ui-sans-serif, system-ui, sans-serif',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
                },
                message: {
                    fontFamily: 'var(--font-lora), Georgia, ui-serif, serif',
                },
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'p',
                    body2: 'p',
                },
            },
        },
    },
});