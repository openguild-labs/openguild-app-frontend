import SearchInput from "@/components/SearchInput";
import CollectionCard from "./components/CollectionCard";
import ViewMoreButton from "@/components/ViewMoreButton";

function Collections() {
  return (
    <div className="mt-3 flex flex-col gap-y-4">
      <h1 className="text-[40px] text-primary-color font-bold mt-6">Collections</h1>
      <SearchInput placeholder="Search collections, ..." />
      <div className="flex flex-wrap gap-y-6 -mx-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
          return <CollectionCard key={item} />;
        })}
      </div>
      <div className="flex justify-center">
        <ViewMoreButton />
      </div>
    </div>
  );
}

export default Collections;
