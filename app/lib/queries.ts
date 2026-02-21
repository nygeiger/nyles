// 'use server'

import { defaultDailyArt } from "./data/data";
import { Artwork, ArtApiResponse } from "./definitions";

export async function getDailyArt(): Promise<Artwork> {
  // TODO: Ensure it only happens daily (track current and last run time?)
  const totalPages = 10900; // Number of pages according to their api
  const idsPerPage = 12;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  const randomIdIndex = Math.floor(Math.random() * idsPerPage);

  const fields: string[] = [
    "id",
    "image_id",
    "thumbnail",
    "place_of_origin",
    "date_display",
    "medium_display",
    "artist_display",
    "artist_title",
    "artist_titles",
    "title",
  ];

  console.log("Fields: " + fields.toString());

  try {
    console.log(
      "fethcing daily art **** --> " +
        `https://api.artic.edu/api/v1/artworks?fields=${fields.toString()}&page=${randomPage}`,
    );
    const fetchedArt = await fetch(
      `https://api.artic.edu/api/v1/artworks?fields=${fields.toString()}&page=${randomPage}&is_public_domain=true`,
    );
    const fetchedArtJson: ArtApiResponse = await fetchedArt.json();

    console.log("Fetched artworks response: " + fetchedArtJson);

    const iiif_url = fetchedArtJson.config.iiif_url;

    console.log("iiif_url: " + iiif_url);

    // can fetch in case limit or total_pages changes.
    // const numPages = tempVariJson.pagination.total_pages
    // const idPerPage = tempVariJson.pagination.limit

    // Could Also just do the first id of any page to prevent usecase of pulling from
    // An index that the current page doesn't have (i.e. last page may not have 12 ids)
    // const randomPage = Math.floor(Math.random() * numPages) + 1;
    // const randomIdIndex = Math.floor(Math.random() * idPerPage);

    const randChoice = fetchedArtJson.data[randomIdIndex];

    console.log("randCHoice: " + Object.values(randChoice));

    return {
      title: randChoice.title,
      img_src: `${iiif_url}/${randChoice.image_id}/full/843,/0/default.jpg`,
      width: randChoice.thumbnail.width,
      height: randChoice.thumbnail.height,
      alt: randChoice.thumbnail.alt_text,
    };

  } catch (e) {
    console.error("Error when fetching daily art: " + e);
  }
  return defaultDailyArt;
}
