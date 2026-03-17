"use client";

import { useReducer, useState, useEffect } from "react";
import Card from "./Card";

interface Venue {
  vid: string;
  name: string;
  picture: string;
}

const DEFAULT_VENUES: Venue[] = [
  { vid: "001", name: "The Bloom Pavilion", picture: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80" },
  { vid: "002", name: "Spark Space", picture: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80" },
  { vid: "003", name: "The Grand Table", picture: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&q=80" },
];

type RatingMap = Map<string, number>;

type Action =
  | { type: "UPDATE_RATING"; venue: string; rating: number }
  | { type: "REMOVE_VENUE"; venue: string };

function ratingReducer(state: RatingMap, action: Action): RatingMap {
  const newMap = new Map(state);
  if (action.type === "UPDATE_RATING") {
    newMap.set(action.venue, action.rating);
  } else if (action.type === "REMOVE_VENUE") {
    newMap.delete(action.venue);
  }
  return newMap;
}

interface CardPanelProps {
  venues?: Venue[];
}

export default function CardPanel({ venues: venuesProp }: CardPanelProps) {
  const [venues, setVenues] = useState<Venue[]>(venuesProp ?? DEFAULT_VENUES);

  const [ratingMap, dispatch] = useReducer(
    ratingReducer,
    DEFAULT_VENUES,
    (v) => new Map(v.map((venue) => [venue.name, 0]))
  );

  useEffect(() => {
    if (venuesProp) return;
    if (typeof fetch === "undefined") return;
    fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/venues")
      .then((r) => r.json())
      .then((data) => {
        if (data?.data) {
          setVenues(
            data.data.map((v: { name: string; picture: string; _id: string; id: string }) => ({
              vid: v._id || v.id,
              name: v.name,
              picture: v.picture,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-6 justify-center">
        {venues.map((venue) => (
          <Card
            key={venue.vid}
            venueName={venue.name}
            imgSrc={venue.picture}
            vid={venue.vid}
            rating={ratingMap.get(venue.name) ?? 0}
            onRatingChange={(newRating) =>
              dispatch({ type: "UPDATE_RATING", venue: venue.name, rating: newRating })
            }
          />
        ))}
      </div>

      <div className="mt-8 w-full max-w-lg mx-auto px-4">
        {Array.from(ratingMap.entries())
          .filter(([, rating]) => rating > 0)
          .map(([venueName, rating]) => (
            <div
              key={venueName}
              data-testid={venueName}
              className="flex justify-between items-center p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => dispatch({ type: "REMOVE_VENUE", venue: venueName })}
            >
              <span className="text-gray-800">{venueName}</span>
              <span className="text-gray-600">Rating : {rating}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
