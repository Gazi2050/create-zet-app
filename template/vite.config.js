import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3100, // Specify the port number you want to use
    },

    resolve: {
        // Specify the file extensions to resolve automatically
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
});
