import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Form } from "react-bootstrap";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

type Props = {
  labelIdle?: string;
  maxFiles?: number;
  control: any;
  name: string;
  error?: string;
  acceptedFileTypes?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

const FileUpload = forwardRef(
  (
    {
      labelIdle = "Drag & Drop your files or Browse",
      maxFiles = 1,
      acceptedFileTypes = ["image/*"],
      control,
      name,
      error,
      ...rest
    }: Props,
    ref: LegacyRef<FilePond>
  ) => {
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
);

export default FileUpload;
