import { PetMedia, PetPhoto } from "petfinder-client";
import React, { Component } from "react";

interface IProps {
  media: PetMedia;
}

class Carousel extends Component<IProps> {
  public static getDerivedStateFromProps({ media }: { media: PetMedia }) {
    let photos: PetPhoto[] = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  public state = { active: 0, photos: [] as PetPhoto[] };

  public handleIndexClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    if (e.target.dataset.index) {
      this.setState({ active: +e.target.dataset.index });
    }
  };

  public render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active] ? photos[active].value : ""} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              alt="Animal Thumbnail"
              className={index === active ? "active" : ""}
              data-index={index}
              key={photo.value}
              onClick={this.handleIndexClick}
              src={photo.value}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
