interface IDescriptionDetailsProps {
  description: string;
}

function DescriptionDetails({ description }: IDescriptionDetailsProps) {
  return (
    <div>
      <div className="w-full h-[1px] bg-gray-300 mb-6" />
      <h3 className="text-xl font-bold mb-2">Description</h3>
      <pre className="text-sm text-wrap tiptap" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

export default DescriptionDetails;
