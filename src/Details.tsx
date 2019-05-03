import { navigate, RouteComponentProps } from "@reach/router";
import pf, { PetMedia } from "petfinder-client";
import React, {Component, FunctionComponent} from "react";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API keys available, what's wrong with you?");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

interface IProps {
  id: string;
}

class Details extends Component<RouteComponentProps<IProps>> {
  public state = {
    animal: "",
    breed: "",
    description: "",
    loading: true,
    location: "",
    media: {} as PetMedia,
    name: "",
    showModal: false
  };

  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }

    petfinder.pet
      .get({
        id: this.props.id,
        output: "full"
      })
      .then(data => {
        this.setState({
          animal: data.petfinder.pet.animal,
          breed: data.petfinder.pet.breeds.breed,
          description: data.petfinder.pet.description,
          loading: false,
          location: `${data.petfinder.pet.contact.city}, ${
            data.petfinder.pet.contact.state
          }`,
          media: data.petfinder.pet.media,
          name: data.petfinder.pet.name
        });
      });
  }

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public render() {
    if (this.state.loading) {
      return <h1>Loading . . . </h1>;
    }

    const {
      animal,
      breed,
      description,
      location,
      media,
      name,
      showModal
    } = this.state;

    return (
      <React.Fragment>
        <div className="details">
          <Carousel media={media} />
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <ThemeContext.Consumer>
            {theme => (
              <button
                style={{ backgroundColor: theme[0] }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

export default function DetailsWithErrorBoundary(props: RouteComponentProps<IProps>) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
