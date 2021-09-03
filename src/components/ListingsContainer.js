import React from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({ listings, removeListing }) {
  return (
    <main>
      <ul className="cards">
        {listings.map(listing => <ListingCard key={listing.id} listing={listing} removeListing={removeListing}/>)}
      </ul>
    </main>
  );
}

export default ListingsContainer;
