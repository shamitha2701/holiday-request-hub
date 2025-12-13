import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

interface TawkToWidgetProps {
  propertyId: string;
  widgetId: string;
}

export function TawkToWidget({ propertyId, widgetId }: TawkToWidgetProps) {
  useEffect(() => {
    // Initialize Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    return () => {
      // Cleanup on unmount
      const tawkScript = document.querySelector(`script[src*="embed.tawk.to"]`);
      if (tawkScript) {
        tawkScript.remove();
      }
      // Remove Tawk.to iframe
      const tawkIframe = document.querySelector('iframe[title*="chat"]');
      if (tawkIframe) {
        tawkIframe.remove();
      }
    };
  }, [propertyId, widgetId]);

  return null;
}

// Default Tawk.to demo widget - replace with your own IDs
export function TawkToDemo() {
  // These are placeholder IDs - user should replace with their own
  return (
    <TawkToWidget 
      propertyId="REPLACE_WITH_YOUR_PROPERTY_ID" 
      widgetId="REPLACE_WITH_YOUR_WIDGET_ID" 
    />
  );
}
