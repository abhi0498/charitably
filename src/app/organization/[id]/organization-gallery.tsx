"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gallery, Organization } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createGallery } from "../actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imageCompression from "browser-image-compression";

interface OrganizationGalleryProps {
  images: Gallery[];
  organizationData: Organization;
}

export function OrganizationGallery({
  images: initialImages,
  organizationData,
}: OrganizationGalleryProps) {
  const [images, setImages] = useState<Gallery[]>(initialImages);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 3;
  const { data: session } = useSession();

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1, // Max file size in MB
      maxWidthOrHeight: 1920, // Max width/height
      useWebWorker: true,
      fileType: "image/jpeg", // Convert all images to JPEG
    };

    try {
      const compressedFile = await imageCompression(file, options);
      // Create a new file with original name but compressed data
      return new File([compressedFile], file.name, {
        type: "image/jpeg",
      });
    } catch (error) {
      console.error("Compression failed:", error);
      return file; // Return original file if compression fails
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageTitle || !newImageFile) return;

    try {
      // Compress image before upload
      const compressedFile = await compressImage(newImageFile);

      // Get presigned URL
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: compressedFile.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { url, key } = await response.json();

      // Upload compressed file to S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: compressedFile,
        headers: {
          "Content-Type": "image/jpeg", // Always JPEG after compression
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to S3");
      }

      // Only create gallery entry after successful S3 upload
      const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${
        process.env.NEXT_PUBLIC_AWS_REGION
      }.amazonaws.com/${encodeURIComponent(key)}`;

      const galleryResponse = await createGallery({
        title: newImageTitle,
        imageUrl,
        organizationId: organizationData.id,
      });

      // Update UI only after everything succeeds
      setImages([...images, galleryResponse]);
      setNewImageTitle("");
      setNewImageFile(null);
      setIsUploadDialogOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error instanceof Error ? error.message : "Failed to upload image");
    }
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Gallery</h3>
        {session?.user?.organization?.id === organizationData.id && (
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>Upload Image</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Image</DialogTitle>
                <DialogDescription>
                  Add a new image to the organization&apos;s gallery.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleImageUpload} className="space-y-4">
                <div>
                  <Label htmlFor="imageTitle">Image Title</Label>
                  <Input
                    id="imageTitle"
                    value={newImageTitle}
                    onChange={(e) => setNewImageTitle(e.target.value)}
                    placeholder="Enter image title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="imageFile">Image File</Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewImageFile(e.target.files?.[0] || null)
                    }
                    required
                  />
                </div>
                <Button type="submit">Upload</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentImages.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  //   onClick={() => setSelectedImage(image)}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{image.title}</DialogTitle>
                <DialogDescription className="relative w-full max-h-[70vh] overflow-hidden">
                  <div className="relative w-full pt-[75%]">
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="absolute top-0 left-0 w-full h-full object-contain"
                      sizes="(max-width: 625px) 100vw, 625px"
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {images.length > imagesPerPage && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
