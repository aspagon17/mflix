import { ObjectId } from "mongodb";
import client from "../lib/mongodb";
import { GetStaticProps } from "next";
import React from "react";


interface Movie {
   _id: ObjectId;
   title: string;
   metacritic: number;
   plot: string;
}


interface TopProps {
   movies: Movie[];
}


export default function Top({ movies }: TopProps) {
   return (
       <div>
           <h1>Top 1000 Movies of All Time</h1>
           <p>
               <small>(According to Metacritic)</small>
           </p>
           <ul>
               {movies.map((movie) => (
                   <li key={movie._id.toString()}>
                       <h2>{movie.title}</h2>
                       <h3>{movie.metacritic}</h3>
                       <p>{movie.plot}</p>
                   </li>
               ))}
           </ul>
       </div>
   );
}


export const getStaticProps: GetStaticProps<TopProps> = async () => {
   try {
       const clientPromise = await client;


       const db = clientPromise.db("sample_mflix");


       const movies = await db
           .collection("movies")
           .find({})
           .sort({ metacritic: -1 })
           .limit(1000)
           .toArray();


       return {
           props: { movies: JSON.parse(JSON.stringify(movies)) },
       };
   } catch (e) {
       console.error(e);
       return {
           props: { movies: [] },
       };
   }
};