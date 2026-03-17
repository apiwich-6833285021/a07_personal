import Image from "next/image";

interface VenueDetail {
  name: string;
  picture: string;
}

async function getVenue(vid: string): Promise<VenueDetail | null> {
  try {
    const res = await fetch(
      `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${vid}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const v = data?.data ?? data;
    if (!v?.name) return null;
    return { name: v.name, picture: v.picture };
  } catch {
    return null;
  }
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venue = await getVenue(vid);

  if (!venue) {
    return (
      <main className="min-h-screen p-8">
        <p>Venue not found</p>
      </main>
    );
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
