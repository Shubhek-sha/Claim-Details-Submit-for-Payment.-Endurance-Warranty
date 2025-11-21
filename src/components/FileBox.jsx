import { Dropzone } from "@mantine/dropzone";

export default function FileBox() {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="font-medium mb-3">Files</h2>
      <Dropzone onDrop={(files) => console.log(files)}>
        <div className="py-8 text-center text-gray-500">
          Drag & drop files here, or click to upload
        </div>
      </Dropzone>
    </div>
  );
}
