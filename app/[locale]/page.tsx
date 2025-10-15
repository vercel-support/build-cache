export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' },
  ];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Fetch data on the server at build time
  // The response format is {"timestamp":1760522196}
  const response = await fetch('https://aisenseapi.com/services/v1/timestamp');
  const data: { timestamp: number } = await response.json();
  console.log("Hi", data, "Locale:", locale);
  
  return (
    <div>
      <h1>Timestamp Check</h1>
      <p>Locale: {locale}</p>
      <p>Timestamp: {data.timestamp}</p>
      <p>Date: {new Date(data.timestamp * 1000).toISOString()}</p>
    </div>
  );
}

