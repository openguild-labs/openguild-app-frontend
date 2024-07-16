import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { IconButton } from "@mui/material";
import { CiImageOn } from "react-icons/ci";
import "./style.css";
import { resizeFile } from "@/utils/file";
import VisuallyHiddenInput from "../VisuallyHiddenInput";

export const TIPTAP_EMPTY_STRING = "<p></p>";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  Mention.configure({
    HTMLAttributes: {
      class: "mention",
    },
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];

interface ITipTapProps {
  content?: string;
  setContent?: (content: string) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties | undefined;
  editable?: boolean;
  showImageButton?: boolean;
}

export type TTipTap = {
  cancel: (content: string) => void;
};

const TipTap = forwardRef(function TipTap(
  { content, editable = true, setContent, className, placeholder, style, showImageButton = true }: ITipTapProps,
  ref: Ref<TTipTap>
) {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        // Use a placeholder:
        placeholder,
      }),
    ],
    content,
    onUpdate({ editor }) {
      if (setContent) setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: className || "",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    cancel(content) {
      editor
        ?.chain()
        .setContent(content || "")
        .run();
    },
  }));

  useEffect(() => {
    if (!editable && editor) editor.chain().blur().run();
  }, [editable, editor]);

  return (
    <div className="relative w-full h-full">
      <div
        className="border border-neutral-300 p-2 rounded-lg h-full overflow-scroll"
        style={{
          ...style,
          padding: editable ? "" : "0px",
          borderColor: editable ? "" : "transparent",
        }}
      >
        <EditorContent editor={editor} />
      </div>
      {editable && showImageButton && (
        <div className="h-6 aspect-square absolute top-1 right-1">
          <IconButton size="small" component="label" role={undefined} color="inherit" className="tiptap-upload-btn">
            <CiImageOn size={20} />
            <VisuallyHiddenInput
              type="file"
              onChange={async (e) => {
                const files = e.target.files;
                if (!files) return;
                for (const file of files) {
                  const resizedFile = await resizeFile(file);
                  editor?.chain().focus().setImage({ src: resizedFile }).run();
                }
              }}
              accept="image/*"
              multiple={true}
            />
          </IconButton>
        </div>
      )}
    </div>
  );
});

export default TipTap;
