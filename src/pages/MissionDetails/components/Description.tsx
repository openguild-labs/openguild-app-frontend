interface IDescriptionProps {
  description: string;
}

function Description({ description }: IDescriptionProps) {
  return (
    <div>
      {" "}
      <h3 className="text-xl mb-2">Description</h3>
      <pre className="text-sm text-wrap tiptap" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

export default Description;
