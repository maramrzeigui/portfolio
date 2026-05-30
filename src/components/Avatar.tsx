import { useState } from "react";
import { cvData } from "../data/cvData";
import profilePhoto from "../assets/maram.jpg";

type AvatarProps = { className?: string };

/**
 * Affiche la photo de profil (src/assets/maram.jpg).
 * En cas d'erreur de chargement, repli sur un avatar à initiales.
 */
const Avatar = ({ className = "" }: AvatarProps) => {
  const [failed, setFailed] = useState(false);
  const { initials, name } = cvData.personal;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-display font-extrabold ${className}`}
        aria-label={name}
      >
        <span className="text-[2.75rem] md:text-6xl tracking-tight">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={profilePhoto}
      alt={name}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};

export default Avatar;
