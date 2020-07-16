import { ReactElement, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import { CREATE_SIGNED_REQ_MUTATION } from "../../graphql/user/mutations/createSignedReq";
import { CHANGE_AVATAR_MUTATION } from "../../graphql/user/mutations/changeAvatar";
import formatFilename from "../../utils/formatFilename";
import uploadToAWS from "../../utils/uploadToAWS";
import ButtonPrimary from "../ButtonPrimary";

export default function AvatarForm(): ReactElement {
  const [avatar, setAvatar] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => setAvatar(files[0]),
  });
  const [createSignedRequestToAWS] = useMutation(CREATE_SIGNED_REQ_MUTATION);
  const [changeAvatar] = useMutation(CHANGE_AVATAR_MUTATION);

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          setLoading(true);

          if (avatar) {
            if (avatar.size > 2097152) {
              setError("Max file size is 2mb.");
              setLoading(false);
              return;
            }
            const result = await createSignedRequestToAWS({
              variables: {
                filename: formatFilename((avatar as any).name),
                filetype: (avatar as any).type,
              },
            });
            await uploadToAWS(
              result.data.createSignedRequestToAWS.signedRequest,
              (avatar as any).type,
              avatar
            );
            await changeAvatar({
              variables: {
                avatarUrl: result.data.createSignedRequestToAWS.url,
              },
            });
            setLoading(false);
          }
          if (window) {
            window.location.reload();
          }
        } catch (error) {
          if (error.message) {
            setError(error.message);
          }
        }
      }}
    >
      <label htmlFor="avatar" className="hidden">
        Set profile picture...
      </label>
      {error.length > 0 && <p className="text-red-400">{error}</p>}
      <input id="avatar" {...getInputProps()} />
      <p className="mb-2 text-xl">Change your profile picture. Max size 2mb</p>
      <div
        {...getRootProps()}
        className={`${
          isDragActive && "bg-teal-200"
        } w-32 h-32 p-2 text-lg flex items-center text-center border border-white border-dashed rounded-full cursor-pointer relative`}
      >
        {avatar ? (
          <div className="absolute top-0 left-0 w-full h-full rounded-full">
            <img
              src={URL.createObjectURL(avatar)}
              className="w-full h-full rounded-full "
            />
          </div>
        ) : (
          <p>Drag or click...</p>
        )}
      </div>
      <div>
        <ButtonPrimary text="Submit" disabled={loading} />
      </div>
    </form>
  );
}
