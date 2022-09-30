import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';




export class Gallery extends Component {
  state = {
    querry: "",
    page: 1,
  }


  componentDidMount() {
    this.getImagesGallery('cat', 1)
  }
  



  handleForm = (value) => {
this.setState({querry: value})
    console.log("Слава Україні!", value);
    


  }

  getImagesGallery = async(querry,page) => {
    const images = await ImageService.getImages(querry,page);
  console.log(images);
  }

  render() {
    return (
      <>
        <SearchForm handleForm={this.handleForm} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
