import Image from "next/image";

interface VenueDetail {
  name: string;
  picture: string;
}

const VENUE_DATA: Record<string, VenueDetail> = {
  "001": { name: "The Bloom Pavilion", picture: "/img/bloom.jpg" },
  "002": { name: "Spark Space", picture: "/img/spark.jpg" },
  "003": { name: "The Grand Table", picture: "/img/grandtable.jpg" },
};

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venue = VENUE_DATA[vid];

  if (!venue) {
    return <main className="min-h-screen p-8"><p>Venue not found</p></main>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {venue.name}
      </h1>
      <div className="flex justify-center">
        <div className="relative w-[400px] h-[280px]">
          <Image
            src={venue.picture}
            alt={venue.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
