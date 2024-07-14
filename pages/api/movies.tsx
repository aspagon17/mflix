import client from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const clientPromise = await client;
        const db = clientPromise.db("sample_mflix");
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}