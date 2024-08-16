import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { XIcon } from "lucide-react";
import { postUpload } from "@/lib/functions/Posts/route";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserStoryAdding } from "@/lib/functions/user/route";

export default function StoryCreatePage({ CloseStory, userData }: any) {

    const [stories,setStories] = useState([]);
//   const [files, setFiles] = useState<{file: File, type: string}[]>([]);
  const [content, setContent] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

  async function handleFiles(e: any) {
    e.preventDefault();


    const UploadedData = await UserStoryAdding(userData._id);

    if (UploadedData?.status === 200) {
      toast.success('Post Created Successfully');
      CloseStory();
      location.reload()
    } else {
      toast.error('Failed to Create Post');
    }
  }

  function removeFiles(index: any) {
    setStories(stories.filter((_, i) => i !== index));
    console.log('removed');
  }

  function postContent(e: any) {
    setContent(e.target.value);
    console.log('text', content);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files!).map((file: File) => {
      const fileType = file.type.startsWith('image') ? 'image' : 'video';
      return { file, type: fileType };
    });
    // setStories((prevFiles) => [...prevFiles, ...newFiles]);
  }
  
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={true}
        onOpenChange={CloseStory}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent className="border border-gray-400 w-fit bg-slate-200 rounded-md h-fit mt-20">
          {(CloseStory) => (
            <div>
              <ModalHeader className="flex flex-col border border-b-black">Choose Your Story file</ModalHeader>
              <form onSubmit={(e) => handleFiles(e)}>
                <ModalBody className="flex justify-between items-center mt-2 p-10">
                  <svg aria-label="Icon to represent media such as images or videos" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                    <title>Icon to represent media such as images or videos</title>
                    <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                    <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                    <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                  </svg>
                  <label>Select a Story here</label>
                  <input onClick={(e) => e.stopPropagation()} onChange={onChange}
                   type="file" multiple name="PostUpload" id="PostUpload" accept="image/*,video/*" />
                  <div className="flex flex-wrap gap-4">
                    {stories.length > 0 && stories.map((item: any, idx: number) => (
                      <div key={idx} className="relative w-20 h-20 border border-gray-300 rounded overflow-hidden">
                        <XIcon
                          className="absolute top-0 right-0 m-1 text-red-600 cursor-pointer"
                          onClick={() => removeFiles(idx)}
                        />
                        <img
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(item)}
                          alt="images"
                        />
                      </div>
                    ))}
                  </div>
                  {stories.length > 0 && (
                    <textarea
                      className="w-full"
                      placeholder="Add Captions"
                      onChange={postContent}
                      name="PostContent"
                      id="PostContent"
                      required
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-slate-400 rounded-full" variant="light" onPress={CloseStory}>
                    Close
                  </Button>
                  {stories.length > 0 && (
                    <Button
                      className="bg-black rounded-full text-white"
                      type="submit"
                    >
                      Upload
                    </Button>
                  )}
                </ModalFooter>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
