'use client'

import PetDetail from "@/components/PetDetail";
import { useEffect, useState } from "react";
import { getPet } from "@/services/pets";
import PetDetailSkeleton from "@/components/PetDetailSkeleton";

export default function Page(props) {
  const { id } = props.params;

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getPet(id)
        .then((data) => {
          setPet(data[0]);
          setLoading(false);
        }).catch((error) => {
            console.error('Error fetching pet:', error);
        }).finally(() => {
            setLoading(false);
        });

  }, [id]);

  return (
    <main className="flex flex-col items-center gap-5 my-5"> 
      {loading && <PetDetailSkeleton />}
      {!loading && pet && <PetDetail pet={pet} />}
    </main>
  );
}
