"use client";

import { getTradeData } from "@/services/data.service";
import React, { useEffect, useMemo, useState } from "react";
import { Luckiest_Guy } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

type Artifact = {
  name: string;
  price: number;
};

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest",
});

type Props = {};

const SearchBox = ({
  artifactName,
  setArtifactName,
}: {
  artifactName: string;
  setArtifactName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [artifact, setArtifact] = useState(artifactName);
  useEffect(() => {
    setArtifact(artifactName);
  }, [artifactName]);
  return (
    <div className="flex justify-center py-1 md:py-4">
      <div className="bg-primary px-4 rounded-full w-full md:w-[50%]">
        <input
          type="text"
          className="w-[94%] h-16 text-black text-lg px-1"
          placeholder="Type What You Want To Buy..."
          value={artifact}
          onChange={(e) => {
            setArtifactName(e.target.value);
          }}
        />
        <div className="inline-flex justify-center w-[6%] align-middle">
          <Image
            src={"/img/search-icon.png"}
            alt="Search Icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

const ArtifactList = (props: Props) => {
  const [data, setData] = useState([]);
  const artifacts = useMemo<Record<string, string[]>>(() => {
    const map: Record<string, string[]> = {};

    data.forEach((station: any) => {
      station.artifacts.forEach((artifact: Artifact) => {
        if (!map[artifact.name]) {
          map[artifact.name] = [station.name];
        } else {
          map[artifact.name].push(station.name);
        }
      });
    });

    return map;
  }, [data]);

  const [status, setStatus] = useState("loading");
  const [artifactName, setArtifactName] = useState("");

  useEffect(() => {
    setStatus("loading");
    getTradeData({ artifact: artifactName })
      .then((res) => {
        if (res) {
          setData(res);
        }
        setStatus("done");
      })
      .catch((err) => {
        setStatus("done");
      });
  }, [artifactName]);

  return (
    <div className="py-4 px-2">
      <div>
        <h1
          className={`${luckiestGuy.className} text-center text-xl md:text-4xl`}
        >
          Buy Special Artifacts from Various Space Station
        </h1>
        <SearchBox
          artifactName={artifactName}
          setArtifactName={setArtifactName}
        />
      </div>
      <div className="py-4 grid grid-cols-2 md:grid-cols-5 gap-4">
        {status === "done" && Object.entries(artifacts).length === 0 && (
          <div className="text-lg text-center w-full col-span-5">
            No artifacts found, please review if the artifact name is correct or
            not.
          </div>
        )}
        {Object.entries(artifacts).map(([artifactName, stations]) => (
          <SingleArtifactList
            name={artifactName}
            stations={stations}
            key={artifactName}
          />
        ))}
      </div>
    </div>
  );
};

const SingleArtifactList = ({
  name,
  stations,
}: {
  name: string;
  stations: string[];
}) => {
  return (
    <Link
      href={`/${name}`}
      className="h-52 relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
    >
      <Image src={`/img/${name.toLowerCase()}.jpg`} fill alt={name} />
      <div className="absolute md:h-0 p-2 md:p-0 group-hover:h-28 bottom-0 bg-black/80 w-full group-hover:p-2 transition-all duration-150 delay-75">
        <h2 className="text-xl font-bold py-2">{name}</h2>
        <p className="text-xs">Available on: {stations.join(", ")}</p>
      </div>
    </Link>
  );
};

export default ArtifactList;
