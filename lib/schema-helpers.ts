/**
 * Schema.org JSON-LD Helper Utilities
 * Provides clean, reusable functions for generating structured data
 */

/**
 * Removes undefined values from an object recursively
 * Ensures clean JSON-LD output without null/undefined fields
 */
export function cleanSchemaObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
      .map(item => cleanSchemaObject(item))
      .filter(item => item !== undefined && item !== null);
  }
  
  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanSchemaObject(value);
      if (cleanedValue !== undefined && cleanedValue !== null) {
        cleaned[key] = cleanedValue;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  
  return obj;
}

/**
 * Safely stringify JSON-LD schema
 * Removes undefined values and formats for script injection
 */
export function stringifySchema(schema: any): string {
  const cleaned = cleanSchemaObject(schema);
  return JSON.stringify(cleaned, null, 0); // No indentation for production
}

/**
 * Generate a Person schema object
 */
export function createPersonSchema(name: string, url?: string) {
  return {
    "@type": "Person",
    "name": name,
    "sameAs": url,
  };
}

/**
 * Generate an Organization schema object
 */
export function createOrganizationSchema(name: string, url?: string) {
  return {
    "@type": "Organization",
    "name": name,
    "url": url,
  };
}

/**
 * Generate an ImageObject schema
 */
export function createImageSchema(url: string, width?: number, height?: number) {
  return {
    "@type": "ImageObject",
    "url": url,
    "width": width,
    "height": height,
  };
}

/**
 * Format keywords array for schema
 */
export function formatKeywords(keywords: Array<string | { he: string; en: string }>): string {
  return keywords
    .map(k => (typeof k === 'string' ? k : `${k.he}, ${k.en}`))
    .join(", ");
}
