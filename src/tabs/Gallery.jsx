import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    querry: '',
    page: 1,
    img: [],
    isLoading: false,
    isShow: false,
    isEmphty: false,
  };

  componentDidUpdate(_, prevState) {
    const { querry, page } = this.state;
    if (prevState.querry !== querry || prevState.page !== page) {
      this.getImagesGallery(querry, page);
    }
  }

  handleForm = value => {
    this.setState({
      querry: value,
      page: 1,
      img: [],
      isShow: false,
      isEmphty: false,
    });
  };

  getImagesGallery = async (querry, page) => {
    if (!querry) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    try {
      const images = await ImageService.getImages(querry, page);
      if (images.photos.length === 0) {
        this.setState({ isEmphty: true });
      }
      this.setState(prevState => ({
        img: [...prevState.img, ...images.photos],
        isShow: prevState.page < Math.ceil(images.total_results / 15),
      }));
    } catch (error) {
      console.log({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  getPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <SearchForm handleForm={this.handleForm} />
        <Grid>
          {this.state.img.map(item => (
            <GridItem key={item.id}>
              <CardItem color={item.avg_color}>
                <img src={item.src.large} alt={item.alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.isShow && (
          <Button onClick={this.getPage}>
            {this.state.isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}
        {this.state.isEmphty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
