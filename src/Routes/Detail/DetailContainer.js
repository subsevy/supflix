import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      videosPopup: false,
      productionsPopup: false,
      seasonsPopup: false
    };
  }

  toggleVideosPopup = () =>
    this.setState({ videosPopup: !this.state.videosPopup });
  toggleProductionsPopup = () =>
    this.setState({ productionsPopup: !this.state.productionsPopup });
  toggleSeasonsPopup = () =>
    this.setState({ seasonsPopup: !this.state.seasonsPopup });

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const {
      result,
      error,
      loading,
      videosPopup,
      productionsPopup,
      seasonsPopup
    } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        videosPopup={videosPopup}
        productionsPopup={productionsPopup}
        seasonsPopup={seasonsPopup}
        toggleVideosPopup={() => this.toggleVideosPopup()}
        toggleProductionsPopup={() => this.toggleProductionsPopup()}
        toggleSeasonsPopup={() => this.toggleSeasonsPopup()}
      />
    );
  }
}
