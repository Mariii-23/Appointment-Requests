import { AVAAATAR_IO } from "@/constants/avataaars_io";
import React, { useMemo } from "react";

interface AvatarProps {
    name: string;
    size?: number
}

const Avatar: React.FC<AvatarProps> = ({
    name,
    size = 100
}) => {
  const stringToSeed = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const pickFromArray = (arr: string[], seed: number) => {
    return arr[seed % arr.length];
  };

  const avatarUrl = useMemo(() => {
    const seed = name ? stringToSeed(name) : Math.floor(Math.random() * 100000);

    const hairColor = pickFromArray(AVAAATAR_IO.HAIR_COLORS, seed);
    const clotheColor = pickFromArray(AVAAATAR_IO.CLOTHES_COLORS, seed + 1);
    const clotheType = pickFromArray(AVAAATAR_IO.CLOTHE_TYPES, seed + 2);
    const eyeType = pickFromArray(AVAAATAR_IO.EYE_TYPES, seed + 3);
    const mouthType = pickFromArray(AVAAATAR_IO.MOUTH_TYPES, seed + 4);

    return `https://avataaars.io/?avatarStyle=Transparent&seed=${seed}&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=${hairColor}&facialHairType=Blank&clotheType=${clotheType}&clotheColor=${clotheColor}&eyeType=${eyeType}&eyebrowType=DefaultNatural&mouthType=${mouthType}&skinColor=Light`;
  }, [name]);

  return (
    <div
      className="relative flex justify-center items-center bg-blue rounded-full border-2 border-base-100"
      style={{ width: size, height: size }}
    >
      <img
        src={avatarUrl}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

export default Avatar;
