import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';




export class Gallery extends Component {
  state = {
    querry: "",
    page: 1,
    img : []
  }


  componentDidUpdate(_, prevState) {
    const {querry, page} = this.state
    if (prevState.querry !== querry || prevState.page !== page) {
    this.getImagesGallery(querry, page)
   }
 }
  



  handleForm = (value) => {
this.setState({querry: value})
    console.log("Слава Україні!", value);
    


  }

  getImagesGallery = async(querry,page) => {
    const images = await ImageService.getImages(querry,page);
    console.log(images);
    this.setState({img: images.photos})
  }

  render() {
    return (
      <>
        <SearchForm handleForm={this.handleForm} />
        <Grid>
          {this.state.img.map(item =><GridItem key={item.id}><CardItem color={item.avg_color}><img src={item.src.large} alt={item.alt} /></CardItem></GridItem>)}
        </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
