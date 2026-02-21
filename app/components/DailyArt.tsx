import Image from "next/image";
import { getDailyArt } from "../lib/queries";

export default async function DailyArt() {
    // ?: include section that updates daily - display day and pull in. a word of the day (show word + definition)? A fun fact?
    const dailyArt = await getDailyArt();



    console.log("Daily art source: " + dailyArt.img_src)
    return (
        <a href={dailyArt.img_src} target="_blank" rel="noopener noreferrer">
        <Image
            src={dailyArt.img_src}
            width={dailyArt.width}
            height={dailyArt.height}
            alt={dailyArt.title}
        // loader={({ src }) => { 'use server'; return src}}
        // loader={customLoader}
        // priority
        />
        </a>
    )
}