import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="container mx-auto py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          AI Digest

        </h1>

        <p className="text-muted-foreground">

          Stay updated with the latest AI news.

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {Array.from({
          length: 6,
        }).map((_, index) => (

          <Card key={index}>

            <CardHeader>

              <CardTitle>

                AI Article {index + 1}

              </CardTitle>

            </CardHeader>

            <CardContent>

              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.

            </CardContent>

          </Card>

        ))}

      </div>

    </main>
  );
}