import { Card, Table, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";

/* loader logo */
const override = css`
  display: block;
  margin: 0 auto;
  padding: 20px 0;
`;

const Restaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 10;
  const query = useLocation();
  const urlParams = new URLSearchParams(query.search);
  const borough = urlParams.get("borough");

  const previousPage = () => setPage(page > 1 ? page - 1 : page);
  const nextPage = () => setPage(page + 1);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      //declared the async data fetching function
      const data = await fetch(
        //getting the data from api
        borough
          ? `https://hidden-sands-17089.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`
          : `https://hidden-sands-17089.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
      );
      //convert data to json
      const jsonResult = await data.json();
      setRestaurants(jsonResult);
      setPage(page);
      setLoading(false);
    };

    fetchData().catch((err) => {
      console.log(`Error occured during fetch: ${err}`);
    });
  }, [borough, page]);

  return (
    <>
      {loading ? (
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
              style={{ textAlign: "center", borderRadius: "20px" }}
            >
              Loading Restaurants
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
                marginTop: "20px",
              }}
            >
              <Card.Header
                as="h5"
                style={{
                  textAlign: "center",
                  borderRadius: "20px",
                }}
              >
                Restaurant List
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Full list of restaurants. Optionally sorted by borough
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <br />
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant._id}
                  onClick={() => {
                    navigate(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td> {restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination size="lg" className="justify-content-center">
            <Pagination.Prev
              onClick={() => {
                previousPage();
              }}
            />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                nextPage();
              }}
            />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Restaurants;
