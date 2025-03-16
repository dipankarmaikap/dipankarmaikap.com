declare global {
    interface Window {
      dataLayer: any[];
    }
  }
  
  export {}; // Ensures this is treated as a module
  