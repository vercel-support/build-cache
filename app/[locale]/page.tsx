import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }, { locale: "fr" }]
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const validLocales = ["en", "es", "fr"]
  if (!validLocales.includes(locale)) {
    notFound()
  }

  try {
    // Fetch data on the server at build time
    // The response format is {"timestamp":1760522196}
    const response = await fetch("https://aisenseapi.com/services/v1/timestamp")

    if (!response.ok) {
      notFound()
    }

    const data: { timestamp: number } = await response.json()
    console.log("Hi", data, "Locale:", locale)

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-3xl font-bold">Timestamp Check</h1>
          <p className="text-muted-foreground">Locale: {locale}</p>
          <p className="text-muted-foreground">Timestamp: {data.timestamp}</p>
          <p className="text-muted-foreground">Date: {new Date(data.timestamp * 1000).toISOString()}</p>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Failed to fetch timestamp:", error)
    notFound()
  }
}
