import React, { useState, useEffect } from "react";
import "./styles.css";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "9390d597ee0949afb21881fafabf1510";

const App = () => {
  const [films, setFilms] = useState([]);
  const [find, setFind] = useState("");
  const [filmId, setFilmId] = useState(null);
  const [film, setFilm] = useState(null);
  const [filmRecommeds, setFilmRecommeds] = useState([]);
  const [url, setUrl] = useState(
    `${baseUrl}trending/movie/day?api_key=${apiKey}`
  );

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    gridList: {
      flexWrap: "nowrap",
      transform: "translateZ(0)"
    },
    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(1)
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    title: {
      color: "white"
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    card: {
      padding: 10
    }
  }));

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setFilms(data.results);
        }
      });
  }, [url]);

  useEffect(() => {
    if (filmId) {
      fetch(`${baseUrl}movie/${filmId}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setFilm(data);
          }
        });
      fetch(`${baseUrl}movie/${filmId}/recommendations?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            setFilmRecommeds(data.results);
          }
        });
    } else {
      setFilm(null);
    }
  }, [filmId]);

  const handleSubmit = e => {
    setFind(e.currentTarget.value);
    if (e.currentTarget.value) {
      setUrl(
        `${baseUrl}search/movie?api_key=${apiKey}&query=${
          e.currentTarget.value
        }`
      );
    } else {
      setUrl(`${baseUrl}trending/movie/day?api_key=${apiKey}`);
    }
  };

  const handleSetMovie = (e, id) => {
    e.preventDefault();
    setFilmId(id);
  };

  const classes = useStyles();

  return (
    <HashRouter>
      <Container fixed>
        <Grid justify="center" container spacing={4}>
          <Grid item xs={8}>
            <Paper style={{ maxWidth: 100 + "%" }} className={classes.paper}>
              <Typography align="center" variant="h6">
                APIKO SPA
              </Typography>
            </Paper>
          </Grid>

          <Grid ustify="center" container item xs={8}>
            <TextField
              fullWidth
              id="search"
              size=""
              label="Search"
              variant="outlined"
              value={find}
              onChange={handleSubmit}
            />
          </Grid>
          <Grid justify="center" alignItems="center" item xs={8}>
            <Paper className={classes.paper}>
              <GridList className={classes.gridList} cols={4}>
                {films.length > 1 ? (
                  films.map((item, i) => (
                    <GridListTile
                      button
                      onClick={e => handleSetMovie(e, item.id)}
                    >
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" + item.poster_path
                        }
                        alt={item.title}
                      />
                      <GridListTileBar
                        title={item.title}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title
                        }}
                        actionIcon={
                          <IconButton aria-label={`star ${item.title}`}>
                            <StarBorderIcon className={classes.title} />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    loading...
                  </Typography>
                )}
              </GridList>
            </Paper>
          </Grid>
          {film !== null && (
            <>
              <Grid item xs={8}>
                <Card>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={"https://image.tmdb.org/t/p/w500" + film.poster_path}
                    title={film.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {film.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {film.overview}
                    </Typography>
                  </CardContent>
                </Card>

                <Card style={{ marginTop: 15 + "px" }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Recommends
                  </Typography>
                  <Paper className={classes.paper}>
                    <GridList className={classes.gridList} cols={4}>
                      {filmRecommeds.length > 1 ? (
                        filmRecommeds.map((item, i) => (
                          <GridListTile
                            button
                            onClick={e => handleSetMovie(e, item.id)}
                          >
                            <img
                              src={
                                "https://image.tmdb.org/t/p/w500" +
                                item.poster_path
                              }
                              alt={item.title}
                            />
                            <GridListTileBar
                              title={item.title}
                              classes={{
                                root: classes.titleBar,
                                title: classes.title
                              }}
                              actionIcon={
                                <IconButton aria-label={`star ${item.title}`}>
                                  <StarBorderIcon className={classes.title} />
                                </IconButton>
                              }
                            />
                          </GridListTile>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Not found...
                        </Typography>
                      )}
                    </GridList>
                  </Paper>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </HashRouter>
  );
};

export default App;
