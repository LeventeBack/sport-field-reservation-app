import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Form } from "react-bootstrap";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

type Props<TFieldValues extends FieldValues> = {
  labelIdle?: string;
  maxFiles?: number;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  error?: string;
  acceptedFileTypes?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

function InnerFileUpload<TFieldValues extends FieldValues>(
  {
    labelIdle = "Drag & Drop your files or Browse",
    maxFiles = 1,
    acceptedFileTypes = ["image/*"],
    control,
    name,
    error,
    ...rest
  }: Props<TFieldValues>,
  ref: LegacyRef<FilePond>
) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FilePond
            className={"cursor-pointer"}
            allowMultiple={true}
            acceptedFileTypes={acceptedFileTypes}
            maxFiles={maxFiles}
            credits={false}
            {...rest}
            {...field}
            files={field.value}
            onupdatefiles={(fileItems) => {
              field.onChange(fileItems.map((fileItem) => fileItem.file));
            }}
            ref={ref}
            labelIdle={labelIdle}
          />
        )}
      />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </>
  );
}

const FileUpload = forwardRef(InnerFileUpload) as <
  TFieldValues extends FieldValues
>(
  props: Props<TFieldValues> & { ref?: LegacyRef<FilePond> }
) => JSX.Element;

export default FileUpload;
