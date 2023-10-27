import Link from "next/link";

const AdminDashBoard = async () => {
  return (
    <div>
      <Link href={"/admin/add"}>Add Project</Link>
    </div>
  );
};

export default AdminDashBoard;
