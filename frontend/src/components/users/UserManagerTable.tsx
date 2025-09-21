import { Container, Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import useUsers from "../../hooks/useUsers";
import { UserStatus } from "../../types/auth";
import UserTable from "./UserTable";

const UserManagementTable = () => {
  const {
    filteredUsers,
    updateUserStatus,
    searchQuery,
    setSearchQuery,
    setFilter,
  } = useUsers();

  return (
    <Container className="my-4">
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <Tabs
        defaultActiveKey="all"
        id="user-status-tabs"
        className="mb-3"
        onSelect={(k) => setFilter(k as UserStatus | "all")}
      >
        <Tab eventKey="all" title="All Users">
          <UserTable
            users={filteredUsers}
            updateUserStatus={updateUserStatus}
          />
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <UserTable
            users={filteredUsers}
            updateUserStatus={updateUserStatus}
          />
        </Tab>
        <Tab eventKey="active" title="Active">
          <UserTable
            users={filteredUsers}
            updateUserStatus={updateUserStatus}
          />
        </Tab>
        <Tab eventKey="blocked" title="Blocked">
          <UserTable
            users={filteredUsers}
            updateUserStatus={updateUserStatus}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserManagementTable;
