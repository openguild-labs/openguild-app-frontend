import { COLLECTIONS_PATH } from "@/constants/links";
import collectionThumbnail from "@assets/images/collection.webp";
import { Link } from "react-router-dom";
function CollectionCard() {
  return (
    <Link reloadDocument to={`${COLLECTIONS_PATH}/1`} className="w-1/6 px-4">
      <img className="rounded-2xl aspect-[3/4]" src={collectionThumbnail} alt="thumbnail" />
      <h2 className="text-sm font-bold text-white py-4 text-center">Space3</h2>
    </Link>
  );
}

export default CollectionCard;
