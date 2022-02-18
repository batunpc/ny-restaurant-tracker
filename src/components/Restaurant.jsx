import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  padding: 20px 0;
`;

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});

  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    //async fetch
    const fetchRestaurant = async () => {
      //get data from api
      const data = await fetch(
        `https://hidden-sands-17089.herokuapp.com/api/restaurants/${id}`
      );
      //convert to json
      const jsonResult = await data.json();

      jsonResult.hasOwnProperty("_id")
        ? setRestaurant(jsonResult)
        : setRestaurant(null);
      setLoading(false);
    };
    fetchRestaurant().catch((err) => {
      console.log(`Error occured during fetch: ${err}`);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Card
            style={{
              borderRadius: "20px",
              width: "30rem",
              marginTop: "20px",
            }}
          >
            <Card.Header
              as="h5"
              style={{ textAlign: "center", borderRadius: "20px" }}
            >
              Loading Restaurant
            </Card.Header>
            <ScaleLoader
              color={"#4A4A4A"}
              loading={loading}
              css={override}
              size={20}
            />
          </Card>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <Card
              style={{
                borderRadius: "20px",
                width: "30rem",
                margin: "20px",
              }}
            >
              <Card.Header
                as="h5"
                style={{
                  textAlign: "center",
                  borderRadius: "20px",
                }}
              >
                {restaurant.name}
              </Card.Header>
              <Card.Body style={{}}>
                <Card.Text>
                  {restaurant.address.building} {restaurant.address.street}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>

          <br />

          <CardDeck style={{ margin: "1rem" }}>
            {restaurant.grades.map((grade) => {
              const resDate = new Date(grade.date);
              return (
                <Card key={resDate.toString()}>
                  <Card.Header>Grade: {grade.grade}</Card.Header>
                  <Card.Body>
                    <Card.Text>Date: {resDate.toLocaleDateString()}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
        </>
      )}
    </>
  );
};

export default Restaurant;
