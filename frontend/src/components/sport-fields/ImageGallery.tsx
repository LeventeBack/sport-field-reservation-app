import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { Image } from "../../types/resources";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useContext, useState } from "react";
import { getImageUrl } from "../../utils/helpers";
import { Button, Col } from "react-bootstrap";
import { ImageManagerContext } from "../../contexts/ImageManagerContext";

type Props = {
  images: Image[];
  targetHeight?: number;
  adminMode?: boolean;
  layoutType?: "rows" | "columns" | "masonry";
};

const ImageGallery = ({
  images,
  targetHeight = 300,
  layoutType = "rows",
  adminMode = false,
}: Props) => {
  const { deleteImage, setAsBanner } = useContext(ImageManagerContext);
  const [index, setIndex] = useState(-1);

  const photos = images.map((image) => ({
    ...image,
    src: getImageUrl(image.src),
    width: 800,
    height: 800,
  }));

  const getColumnCount = () => {
    if (images.length === 1) return 4;
    if (images.length === 2) return 8;
    return 12;
  };

  return (
    <Col md={getColumnCount()}>
      <PhotoAlbum
        layout={layoutType}
        photos={photos}
        targetRowHeight={targetHeight}
        onClick={({ index: current }) => setIndex(current)}
        spacing={30}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <div style={wrapperStyle}>
            {renderDefaultPhoto({ wrapped: true })}
            {adminMode && (
              <div
                className={`pb-2 pt-1 d-flex justify-content-evenly ${
                  photo.isBanner ? "bg-warning" : ""
                }`}
              >
                {!photo.isBanner && (
                  <Button
                    variant="dark"
                    onClick={() => setAsBanner(photo)}
                    size="sm"
                  >
                    Set as banner
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteImage(photo)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}
      />
      <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        controller={{
          closeOnBackdropClick: true,
        }}
      />
    </Col>
  );
};

export default ImageGallery;
