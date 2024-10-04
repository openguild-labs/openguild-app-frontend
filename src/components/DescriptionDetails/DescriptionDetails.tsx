interface IDescriptionDetailsProps {
  description: string;
}

function DescriptionDetails({ description }: IDescriptionDetailsProps) {
  return (
    <div>
      <div className="w-full h-[1px] bg-gray-300 mb-6" />
      <h3 className="text-xl font-bold mb-2">Description</h3>
      <p className="text-sm text-wrap tiptap" style={{ lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

export default DescriptionDetails;
