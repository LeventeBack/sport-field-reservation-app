import { Badge, Button, Table } from "react-bootstrap";
import { User, UserStatus } from "../../types/auth";

type Props = {
  users: User[];
  updateUserStatus: (id: number, status: UserStatus) => void;
};

const UserTable = ({ users, updateUserStatus }: Props) => {
  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Approved</Badge>;
      case "blocked":
        return <Badge bg="danger">Blocked</Badge>;
      default:
        return <Badge bg="warning">Pending</Badge>;
    }
  };

  if (users.length === 0) {
    return <p className="text-center my-5">No users found</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Register Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td className="text-uppercase">{user.role}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>{getStatusBadge(user.status)}</td>

            <td>
              {user.role !== "admin" && (
                <>
                  <Button
                    variant="success"
                    className="me-2"
                    size="sm"
                    onClick={() => updateUserStatus(user.id, "active")}
                    disabled={user.status === "active"}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => updateUserStatus(user.id, "blocked")}
                    disabled={user.status === "blocked"}
                  >
                    Block
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
