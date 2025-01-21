import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const imageUrl = watch("imageUrl");
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // Generate preview URL
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
    onChange(file);
  };
  return (
    <div className="space-y-2">
      <div>
        <h1>
          <FormDescription className="text-lg">Add Image</FormDescription>
        </h1>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  {(imagePreview || imageUrl) && (
                    <AspectRatio ratio={16 / 15}>
                      <img
                        src={imagePreview || imageUrl}
                        alt="Preview"
                        className="rounded-md object-cover h-full w-full"
                      />
                    </AspectRatio>
                  )}
                  <Input
                    className="bg-white"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    ref={filePickerRef}
                    onChange={(event) =>
                      handleImageChange(event, field.onChange)
                    }
                    //   onChange={(event) =>
                    //     field.onChange(
                    //       event.target.files ? event.target.files[0] : null
                    //     )
                    //   }
                  />
                  <Button
                    type="button"
                    onClick={() => filePickerRef.current?.click()}
                  >
                    PICK IMAGE
                  </Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
export default ImageSection;
