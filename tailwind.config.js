import {nextui} from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content : [
        './resources/**/*.blade.php',
        './resources/*.blade.php',
        './resources/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme   : {
        extend: {}
    },
    safelist: [
        {
            pattern: /bg-(red|green|blue)-(100|200|300|400|500|600|700|800|900)/
        }
    ],
    darkMode: 'class',
    plugins : [nextui()]
};
