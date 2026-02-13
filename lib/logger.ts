/**
 * Advanced Logging System
 * Provides structured logging with different levels and contexts
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  episodeId?: number;
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isServer = typeof window === "undefined";

  /**
   * Log a message with context
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const environment = this.isServer ? "SERVER" : "CLIENT";
    
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      environment,
      message,
      ...context,
    };

    // Console output with colors (development only)
    if (this.isDevelopment) {
      const colors = {
        debug: "\x1b[36m", // Cyan
        info: "\x1b[32m",  // Green
        warn: "\x1b[33m",  // Yellow
        error: "\x1b[31m", // Red
      };
      const reset = "\x1b[0m";
      
      console.log(
        `${colors[level]}[${level.toUpperCase()}]${reset} ${message}`,
        context ? context : ""
      );
    }

    // In production, send to analytics or logging service
    if (!this.isDevelopment && level === "error") {
      this.sendToAnalytics(logEntry);
    }

    return logEntry;
  }

  /**
   * Send error logs to analytics service
   */
  private sendToAnalytics(logEntry: Record<string, unknown>) {
    // Send to Google Analytics as event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: logEntry.message,
        fatal: logEntry.level === "ERROR",
      });
    }

    // Could also send to Sentry, LogRocket, etc.
    // Example: Sentry.captureException(new Error(logEntry.message));
  }

  /**
   * Debug level logging (development only)
   */
  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      return this.log("debug", message, context);
    }
  }

  /**
   * Info level logging
   */
  info(message: string, context?: LogContext) {
    return this.log("info", message, context);
  }

  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext) {
    return this.log("warn", message, context);
  }

  /**
   * Error level logging
   */
  error(message: string, context?: LogContext) {
    return this.log("error", message, context);
  }

  /**
   * Track user interactions
   */
  trackEvent(eventName: string, properties?: Record<string, unknown>) {
    this.info(`Event: ${eventName}`, properties);

    // Send to Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, properties);
    }
  }

  /**
   * Track page views
   */
  trackPageView(url: string) {
    this.info(`Page View: ${url}`);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
        page_path: url,
      });
    }
  }

  /**
   * Track errors with stack traces
   */
  trackError(error: Error, context?: LogContext) {
    this.error(error.message, {
      ...context,
      stack: error.stack,
      name: error.name,
    });

    // Send to analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metricName: string, value: number, unit = "ms") {
    this.info(`Performance: ${metricName}`, { value, unit });

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "timing_complete", {
        name: metricName,
        value: Math.round(value),
        event_category: "Performance",
      });
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = (message: string, context?: LogContext) =>
  logger.debug(message, context);

export const logInfo = (message: string, context?: LogContext) =>
  logger.info(message, context);

export const logWarn = (message: string, context?: LogContext) =>
  logger.warn(message, context);

export const logError = (message: string, context?: LogContext) =>
  logger.error(message, context);

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) =>
  logger.trackEvent(eventName, properties);

export const trackPageView = (url: string) =>
  logger.trackPageView(url);

export const trackError = (error: Error, context?: LogContext) =>
  logger.trackError(error, context);

export const trackPerformance = (metricName: string, value: number, unit?: string) =>
  logger.trackPerformance(metricName, value, unit);
