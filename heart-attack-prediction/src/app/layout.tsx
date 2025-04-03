import './globals.css';

export const metadata = {
  title: 'Heart Attack Prediction App',
  description: 'A web application for heart attack risk prediction',
};

// Fallback styles in case CSS doesn't load
const styles = {
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    backgroundColor: '#f0f4f8',
    color: '#333',
    lineHeight: 1.6,
    margin: 0,
    padding: 0
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #f0f4f8;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          header {
            background-color: #2563eb;
            color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          button, .button {
            background-color: #2563eb;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
          }
          .card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }
        `}} />
      </head>
      <body style={styles.body}>
        <div style={styles.container}>
          {children}
        </div>
      </body>
    </html>
  );
} 