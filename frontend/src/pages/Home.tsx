import { Col, Container } from "react-bootstrap";
import SearchForm from "../components/sport-fields/SearchForm";
import useSportFieldDataContext from "../hooks/useSportFieldDataContext";
import { getFilteredSportFields } from "../utils/filter";
import SportFieldGrid from "../components/sport-fields/SportFieldCardGrid";

const Home = () => {
  const { sportFields, filterForm } = useSportFieldDataContext();

  const filteredSportFields = getFilteredSportFields(
    sportFields,
    filterForm.watch()
  );

  return (
    <section className="container my-5">
      <Container>
        <Col lg={8} className="mx-auto">
          <SearchForm />
        </Col>
      </Container>
      {filteredSportFields.length ? (
        <SportFieldGrid sportFields={filteredSportFields} />
      ) : (
        <p className="text-center my-5">No sport fields found</p>
      )}
    </section>
  );
};

export default Home;
